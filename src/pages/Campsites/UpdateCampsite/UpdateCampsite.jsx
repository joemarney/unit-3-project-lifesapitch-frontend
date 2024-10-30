//! Imports
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";

// ! Services
import { update } from "../../../services/campsiteService"
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { show } from "../../../services/campsiteService";



export default function UpdateCampsite() {


    const { campsiteId } = useParams()

    const [imageUp, setImageUp] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        cost: '',
        location: '',
        fires: false,
        toilets: false,
        showers: false,
        camperVans: false,
        description: '',
        images: []
    })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()
    useEffect(() => {
        const fetchCampsite = async () => {
            try {
                const { data } = await show(campsiteId);
                setFormData(data)
            } catch (error) {
                console.log(error);
            }
        }
        if (campsiteId) fetchCampsite()
    }, [campsiteId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await update(campsiteId, formData)
            navigate(`/${data._id}`)
        } catch (error) {
            console.log(error);
            setErrors(error.response.data)
        }

    }

    function handleChange(event) {
        const { name, type, checked, value } = event.target
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
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

                {/* //? ================================= Checkboxes =================================  //? */}

                <label htmlFor='fires'>Fires</label>
                <input type="checkbox" name="fires" checked={formData.fires} onChange={handleChange} />

                <label htmlFor='toilets'>Toilets</label>
                <input type="checkbox" name="toilets" checked={formData.toilets} onChange={handleChange} />

                <label htmlFor='showers'>Showers</label>
                <input type="checkbox" name="showers" checked={formData.showers} onChange={handleChange} />

                <label htmlFor='camperVans'>Camper Vans</label>
                <input type="checkbox" name="camperVans" checked={formData.camperVans} onChange={handleChange} />


                {/* //? ================================= Checkboxes =================================  //? */}

                <label htmlFor="description">Description</label>
                <input type="textarea" name="description" placeholder="Description of Campsite" onChange={handleChange} value={formData.description} />

                <label htmlFor="images">Images:</label>
                <ImageUpload setFormData={setFormData} formData={formData} setImageUp={setImageUp} fieldName='images' />

                <button type="submit" disabled={imageUp}>Confirm Edit</button>
            </form>




        </>
    )
}