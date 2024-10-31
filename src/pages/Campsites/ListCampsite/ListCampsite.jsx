import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


// ! Services
import { index } from "../../../services/campsiteService";
import Popup from "reactjs-popup"

// ! Pages
import AddCampsite from "../AddCampsite/AddCampsite";

// ! Styles
import styles from "./ListCampsite.module.scss";

export default function ListCampsite({ user }) {
  const [sites, setSites] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const { data } = await index();
        setSites(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSites();
  }, [setSites]);



  const openLoginPopup = () => {
    setIsOpen(true)
    
    }
  const closeLoginPopup = () => setIsOpen(false);



  return (
    <>
      <h1>Life's a Pitch</h1>

      {/* {user ? user.campsiteOwner ? <AddCampsite setSites={setSites} /> : <h5>You need to be a campsite Owner to add new campsites</h5> : null} */}
      
      <AddCampsite setSites={setSites}/>
      
            
      <main className={styles.container}>
        {sites.map((site) => {
          return (
            <Link key={site._id} to={`/${site._id}`}>
              <article>
                <header>
                  <h2>{site.title}</h2>
                </header>
                <p className={styles.cost}>{site.cost} pp.pn</p>
                <p>{site.location}</p>
              </article>
            </Link>
          );
        })}
      </main>
    </>
  )
}
