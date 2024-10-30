//! Imports
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";

// ! Services
import { update } from "../../../services/campsiteService"
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { show } from "../../../services/campsiteService";



export default function UpdateCampsite() {


const {campsiteId} = useParams()

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
    if(campsiteId) fetchCampsite()
    }, [campsiteId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await update(campsiteId, formData)
        navigate(`/campsites/${data._id}`)
        } catch (error) {
            console.log(error);
            setErrors(error.response.data)
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

                <label htmlFor="images">Images:</label>
                <ImageUpload setFormData={setFormData} formData={formData} setImageUp={setImageUp} fieldName='images' />

                {errors.errorMessage && <p className="error">{errors.errorMessage}</p>}

                <button type="submit" disabled={imageUp}>Edit Campsite</button>
            </form>




        </>
    )
}