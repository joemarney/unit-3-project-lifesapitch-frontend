//! Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import { SearchBox } from "@mapbox/search-js-react";

// ! Services
import { update } from "../../../services/campsiteService";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { show } from "../../../services/campsiteService";

// ! Styles
import styles from "./UpdateCampsite.module.scss";

export default function UpdateCampsite() {
  const { campsiteId } = useParams();

  const [imageUp, setImageUp] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    cost: "",
    location: "",
    fires: false,
    toilets: false,
    showers: false,
    camperVans: false,
    description: "",
    images: [],
    coords: [],
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampsite = async () => {
      try {
        const { data } = await show(campsiteId);
        setFormData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (campsiteId) fetchCampsite();
  }, [campsiteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await update(campsiteId, formData);
      navigate(`/${data._id}`);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  }

  function handleRetrieve(location) {
    const { geometry, properties } = location.features[0];

    setFormData({
      ...formData,
      title: properties.name,
      location: properties.full_address,
      coords: geometry.coordinates,
    });
  }

  return (
    <>
      <Popup trigger={<button> Edit </button>} modal nested>
        {(close) => (
          <div>
            <div className={styles.container}>
              <div className={styles.Add}>
                <button className={styles.close} onClick={() => close()}>
                  X
                </button>

                <form onSubmit={handleSubmit}>
                  <label className={styles.location} htmlFor="location">
                    Address
                  </label>
                  <SearchBox
                    accessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                    options={{
                      language: "en",
                      country: "GB",
                    }}
                    onRetrieve={handleRetrieve}
                  />
                  <label className={styles.title} htmlFor="title">
                    Name of Campsite
                  </label>
                  <input className={styles.title} type="text" name="title" placeholder="Campsite Name" onChange={handleChange} value={formData.title} />

                  <label className={styles.cost} htmlFor="cost">
                    £ Cost Per Night
                  </label>
                  <input className={styles.cost} type="number" name="cost" placeholder="10" onChange={handleChange} value={formData.cost} />

                  <div className={styles.checkbox}>
                    <div className={styles.fires}>
                      <label htmlFor="fires">Fires</label>
                      <input type="checkbox" name="fires" checked={formData.fires} onChange={handleChange} />
                    </div>
                    <div className={styles.toilets}>
                      <label htmlFor="toilets">Toilets</label>
                      <input type="checkbox" name="toilets" checked={formData.toilets} onChange={handleChange} />
                    </div>
                    <div className={styles.showers}>
                      <label htmlFor="showers">Showers</label>
                      <input type="checkbox" name="showers" checked={formData.showers} onChange={handleChange} />
                    </div>
                    <div className={styles.campers}>
                      <label htmlFor="camperVans">Camper Vans</label>
                      <input type="checkbox" name="camperVans" checked={formData.camperVans} onChange={handleChange} />
                    </div>
                  </div>

                  <label className={styles.description} htmlFor="description">
                    Description
                  </label>
                  <textarea className={styles.descriptionBox} type="textarea" name="description" placeholder="Description of Campsite" onChange={handleChange} value={formData.description} />

                  <label htmlFor="images">Images:</label>
                  <ImageUpload setFormData={setFormData} formData={formData} setImageUp={setImageUp} fieldName="images" />

                  <button type="submit" disabled={imageUp || formData.coords.length === 0}>
                    Confirm Edit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}
