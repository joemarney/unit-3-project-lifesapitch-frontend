import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";


// ! Services
import { create } from "../../../services/campsiteService";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";

// ! Styles
import styles from "./AddCampsite.module.scss";




export default function AddCampsite(props) {
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
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await create(formData);
    props.setSites((e) => [...e, data]);
    navigate("/");
  };

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  }


  return (
    <>
      <Popup trigger={<button> Click to Add Campsite </button>} modal nested>
        {close => (
          <div>
            <div className={styles.container}>

              <div className={styles.Add}>
                <button className={styles.close} onClick={() => close()}>X</button>

                <h2> Provide Your Campsite Details</h2>
                <form onSubmit={handleSubmit}>
                  <label className={styles.title} htmlFor="title" >Name of Campsite</label>
                  <input className={styles.title} type="text" name="title" placeholder="Campsite Name" onChange={handleChange} value={formData.title} />

                  <label className={styles.cost} htmlFor="cost">£ Cost Per Night</label>
                  <input className={styles.cost} type="number" name="cost" placeholder="10" onChange={handleChange} value={formData.cost} />

                  <label className={styles.location} htmlFor="location">Location of Site</label>
                  <input className={styles.location} type="text" name="location" placeholder="123, That Street" onChange={handleChange} value={formData.location} />

                  {/* //? ================================= Checkboxes =================================  //? */}
                  <div className={styles.checkbox} >
                    <label htmlFor="fires">Fires</label>
                    <input type="checkbox" name="fires" checked={formData.fires} onChange={handleChange} />

                    <label htmlFor="toilets">Toilets</label>
                    <input type="checkbox" name="toilets" checked={formData.toilets} onChange={handleChange} />

                    <label htmlFor="showers">Showers</label>
                    <input type="checkbox" name="showers" checked={formData.showers} onChange={handleChange} />

                    <label htmlFor="camperVans">Camper Vans</label>
                    <input type="checkbox" name="camperVans" checked={formData.camperVans} onChange={handleChange} />
                  </div>
                  {/* //? ================================= Checkboxes =================================  //? */}

                  <label className={styles.description} htmlFor="description">Description</label>
                  <textarea className={styles.descriptionBox} type="textarea" name="description" placeholder="Description of Campsite" onChange={handleChange} value={formData.description} />

                  <label htmlFor="images">Images:</label>
                  <ImageUpload setFormData={setFormData} formData={formData} setImageUp={setImageUp} fieldName="images" />

                  <button className={styles.submit} type="submit" disabled={imageUp}>
                    Add Campsite
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
