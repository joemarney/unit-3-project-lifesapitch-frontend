import { useState } from "react"
import { useNavigate } from "react-router-dom"


// ! Services
import { create } from "../../../services/campsiteService"

// ! Styles

export default function AddCampsite(props) {

    const [images, setImages] = useState(null);


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


const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
        setImages(URL.createObjectURL(img))
        setFormData({...formData, images})
}
};




const handleSubmit = async (e) => {
e.preventDefault()
await create(formData)
props.setSites((e) => [...e,formData])
navigate('/campsites')
console.log(formData)
}

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value })
}


    return (
    <>
    

    <form onSubmit={handleSubmit}>
        <label htmlFor="title">Name of Campsite</label>
        <input type="text" name="title" placeholder="Campsite Name" onChange={handleChange} value={formData.title}/>

        <label htmlFor="cost">£ Cost Per Night</label>
        <input type="number" name="cost" placeholder="10" onChange={handleChange} value={formData.cost}/>

        <label htmlFor="location">Location of Site</label>
        <input type="text" name="location" placeholder="123, That Street" onChange={handleChange} value={formData.location}/>

        <label htmlFor='fires'>Fires</label>
        <input type="checkbox" name="fires" value={formData.fires}/>
        
        <label htmlFor='toilets'>Toilets</label>
        <input type="checkbox" name="toilets" value={formData.toilets}/>

        <label htmlFor='showers'>Showers</label>
        <input type="checkbox" name="showers" value={formData.showers}/>

        <label htmlFor='camperVans'>Camper Vans</label>
        <input type="checkbox" name="camperVans" value={formData.camperVans}/>

        <label htmlFor="description">Description</label>
        <input type="textarea" name="description" placeholder="Description of Campsite" onChange={handleChange} value={formData.description}/>

        <label htmlFor="images">Description</label>
        <input type="file" name="images" onChange={handleFileChange}/>
        <img src={images} />
        <button onClick={() => setImages(null)}>Remove</button>

        <button type="submit">Add Campsite</button>
    </form>
    
    


    </>
    )}