import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { show, deleteCampsite } from "../../../services/campsiteService";

export default function ShowCampsite(props) {


    //! State
    // const [campsite, setCampsite] = useState({});


    //! Variables
    const { campsiteId } = useParams();
    const navigate = useNavigate();

    const fetchCampsite = async () => {
        try {
            const { data } = await show(campsiteId);
            props.setCampsite(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCampsite();
    }, []);

    const handleDeleteCampsite = async () => {
        try {
            await deleteCampsite(campsiteId);
            navigate("/campsites");
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateCampsite = () => {
        navigate(`/campsites/${campsiteId}/edit`)
    }



    return (
        <main>
            <section>
                <h1>{props.campsite.title}</h1>
                <img src={props.campsite.images} />
                <p>£{props.campsite.cost} pp.pn</p>
                <p>{props.campsite.description}</p>
                <p>{props.campsite.location}</p>
                <h3>Amenities:</h3>
                <p>Fires: {props.campsite.fires === true ? "yes" : "no"}</p>
                <p>Toilets: {props.campsite.toilets === true ? "yes" : "no"}</p>
                <p>Showers: {props.campsite.showers === true ? "yes" : "no"}</p>
                <p>Camper Vans: {props.campsite.camperVans === true ? "yes" : "no"}</p>
            </section>
            <button onClick={handleDeleteCampsite}>Delete {props.campsite.title}</button>
            <button onClick={handleUpdateCampsite}>Edit {props.campsite.title}</button>
        </main>
    );
}

// {campsite.images ?
//     <img src={campsite.images} alt="Image of a campsite"/>
//     :
//      <h5>no image of Campsite</h5>
//      }
