import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { show, deleteCampsite } from "../../../services/campsiteService";
import mapboxgl from "mapbox-gl";

// ! Components
import Loading from "../../../components/Loading/Loading";

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
    <main>
      <section>
        <h1>{campsite.title}</h1>
        <img src={campsite.images} />
        <p>£{campsite.cost} pp.pn</p>
        <p>{campsite.location}</p>
        <div id="map-container" ref={mapContainerRef} />
        <p>{campsite.description}</p>
        <h3>Amenities:</h3>
        <p>Fires: {campsite.fires === true ? "yes" : "no"}</p>
        <p>Toilets: {campsite.toilets === true ? "yes" : "no"}</p>
        <p>Showers: {campsite.showers === true ? "yes" : "no"}</p>
        <p>Camper Vans: {campsite.camperVans === true ? "yes" : "no"}</p>
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
