import { useState } from "react"
import { useNavigate } from "react-router-dom"

// ! Services
import { create } from "../../../services/campsiteService"

// ! Styles

export default function AddCampsite(props) {

    const [images, setImages] = useState('');


    const [formData, setFormData] = useState({
        title: '',
        cost: '',
        location: '',
        fires: false,
        toilets: false,
        showers: false,
        camperVans: false,
        description: '',
        images: ''
    })

    const navigate = useNavigate()

    // const handleFileChange = (e) => {
    //     console.log(e.target.files[0])
    //     setImages(e.target.files[0]);
    // }




    const handleSubmit = async (e) => {
        e.preventDefault()
        await create(formData)
        props.setSites((e) => [...e, formData])

        navigate('/campsites')
    }

    const handleFileChange = async (e) => {
        // console.log(e.target.files);
        // setImages(e.target.files[0])
        // if (e.target.files && e.target.files[0]) {
        //   const file = e.target.files[0];
        //   setImages(URL.createObjectURL(file)); // Set image preview URL
        //   setFormData({ ...formData, images: file }); // Store file itself in formData.images
        try {
            const imageUpload = new FormData()

            imageUpload.append('file', e.target.files[0])

            imageUpload.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

            // TODO service function
            const { data } = await axios.post(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setFormData({...formData, [fieldName]: data.secure_url})

            // pass fieldname down as props (name of field in state)
        } catch (error) {
            console.log(error);
        }

    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    return (
        <>


            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Name of Campsite</label>
                <input type="text" name="title" placeholder="Campsite Name" onChange={handleChange} value={formData.title} />

                <label htmlFor="cost">£ Cost Per Night</label>
                <input type="number" name="cost" placeholder="10" onChange={handleChange} value={formData.cost} />

                <label htmlFor="location">Location of Site</label>
                <input type="text" name="location" placeholder="123, That Street" onChange={handleChange} value={formData.location} />

                <label htmlFor='fires'>Fires</label>
                <input type="checkbox" name="fires" value={formData.fires} />

                <label htmlFor='toilets'>Toilets</label>
                <input type="checkbox" name="toilets" value={formData.toilets} />

                <label htmlFor='showers'>Showers</label>
                <input type="checkbox" name="showers" value={formData.showers} />

                <label htmlFor='camperVans'>Camper Vans</label>
                <input type="checkbox" name="camperVans" value={formData.camperVans} />

                <label htmlFor="description">Description</label>
                <input type="textarea" name="description" placeholder="Description of Campsite" onChange={handleChange} value={formData.description} />

                <input type='file' multiple onChange={handleFileChange} />

                <button type="submit">Add Campsite</button>
            </form>




        </>
    )
}