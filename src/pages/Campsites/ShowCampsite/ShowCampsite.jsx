import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { show, deleteCampsite } from "../../../services/campsiteService";
import mapboxgl from "mapbox-gl";

export default function ShowCampsite(props) {
  //! State
  const [campsite, setCampsite] = useState(null);

  //! Variables
  const { campsiteId } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef();
  const mapContainerRef = useRef();

  // if !campsite return loaagin
  useEffect(() => {
    if (campsite) {
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: campsite.coords,
        zoom: 9,
      });

      return () => {
        mapRef.current.remove();
      };
    }
  }, [campsite]);


  useEffect(() => {
    if (campsite) {
      new mapboxgl.Marker().setLngLat(campsite.coords).addTo(mapRef.current);
    }
  }, [campsite]);

  const fetchCampsite = async () => {
    try {
      const { data } = await show(campsiteId);
      setCampsite(data);
    } catch (error) {
      console.log(error);

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
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateCampsite = () => {
        navigate(`/${campsiteId}/edit`)
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
    navigate(`/campsites/${campsiteId}/edit`);
  };
  if (!campsite) return <p>loading...</p>;
    return (
        <main>
            <section>
                <h1>{props.campsite.title}</h1>
                <img src={props.campsite.images} />
                <p>£{props.campsite.cost} pp.pn</p>
                <p>{props.campsite.location}</p>
                <p>{props.campsite.description}</p>
                <h3>Amenities:</h3>
                <p>Fires: {props.campsite.fires === true ? "yes" : "no"}</p>
                <p>Toilets: {props.campsite.toilets === true ? "yes" : "no"}</p>
                <p>Showers: {props.campsite.showers === true ? "yes" : "no"}</p>
                <p>Camper Vans: {props.campsite.camperVans === true ? "yes" : "no"}</p>
            </section>
            {props.user ?
                (props.user._id === props.campsite.campsiteOwner ?
                    <>
                        <button onClick={handleDeleteCampsite}>Delete {props.campsite.title}</button>
                        <button onClick={handleUpdateCampsite}>Edit {props.campsite.title}</button>
                    </>
                    :
                    (null))
                : (null)
            }
        </main>
    );
}

