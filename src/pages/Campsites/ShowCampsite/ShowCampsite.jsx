import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { show } from "../../../services/campsiteService"

export default function ShowCampsite() {

    const [campsite, setCampsite] = useState({})

    const { campsiteId } = useParams()

    const fetchCampsite = async () => {
        try {
            const { data } = await show(campsiteId)
            setCampsite(data)
        } catch (error) {
            console.log(error);
            
        }
    }
    
    console.log(campsite.images);

    useEffect(() => {
        fetchCampsite()
    }, [])

    //TODO handleDeleteCampsite function

    return (
        <main>
            <section>
                <h1>{campsite.title}</h1>
                <img src={campsite.images}/>
                <p>£{campsite.cost} pp.pn</p>
                <p>{campsite.description}</p>
                <p>{campsite.location}</p>
                <h3>Amenities:</h3>
                <p>Fires: {campsite.fires === true ? 'yes' : 'no'}</p>
                <p>Toilets: {campsite.toilets === true ? 'yes' : 'no'}</p>
                <p>Showers: {campsite.showers === true ? 'yes' : 'no'}</p>
                <p>Camper Vans: {campsite.camperVans === true ? 'yes' : 'no'}</p>
            </section>
        </main>
    )
}




// {campsite.images ? 
//     <img src={campsite.images} alt="Image of a campsite"/>
//     :
//      <h5>no image of Campsite</h5>
//      }