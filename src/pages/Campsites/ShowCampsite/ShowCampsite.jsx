import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { show, deleteCampsite } from "../../../services/campsiteService";
import mapboxgl from "mapbox-gl";

// ! Styles
import styles from './ShowCampsite.module.scss'

// ! Components
import Loading from "../../../components/Loading/Loading";
import Carousel from "../../../components/Carousel/Carousel";

export default function ShowCampsite(props) {
  //! State
  const [campsite, setCampsite] = useState(null);

  //! Variables
  const { campsiteId } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef();
  const mapContainerRef = useRef();

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
    navigate(`/${campsiteId}/edit`);
  };

  if (!campsite) return <Loading />;
  return (
    <main className={styles.container}>
      <section>
        <h1>{campsite.title}</h1>
        <Carousel images={campsite.images} />
        <p>{campsite.description}</p>
        <p>£{campsite.cost} pp.pn</p>
        <h3>Amenities:</h3>
        <div className={styles.amenities}>
        <p>Fires: {campsite.fires === true ? "yes" : "no"}</p>
        <p>Toilets: {campsite.toilets === true ? "yes" : "no"}</p>
        <p>Showers: {campsite.showers === true ? "yes" : "no"}</p>
        <p>Camper Vans: {campsite.camperVans === true ? "yes" : "no"}</p>
        </div>
        <p>{campsite.location}</p>
        <div id="map-container" ref={mapContainerRef} />
      </section>
      {props.user ? (
        props.user._id === campsite.campsiteOwner ? (
          <>
            <button onClick={handleDeleteCampsite}>Delete {campsite.title}</button>
            <button onClick={handleUpdateCampsite}>Edit {campsite.title}</button>
          </>
        ) : null
      ) : null}
    </main>
  );
}
