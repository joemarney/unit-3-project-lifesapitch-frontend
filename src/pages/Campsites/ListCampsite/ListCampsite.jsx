import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ! Services
import { index } from "../../../services/campsiteService";
import Popup from "reactjs-popup";

// ! Pages
import AddCampsite from "../AddCampsite/AddCampsite";

// ! Components
import Loading from "../../../components/Loading/Loading";

// ! Styles
import styles from "./ListCampsite.module.scss";

export default function ListCampsite({ user }) {
  const [sites, setSites] = useState([]);
  const [isClosed, setIsClosed] = useState(true);

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

  const handleClick = async () => {
    await setIsClosed(false);
    setIsClosed(true);
  };

  if (!sites) return <Loading />;

  return (
    <>
      <div className={styles.headers}>
        <h1>Campsites</h1>
        {user ? user.campsiteOwner ? <AddCampsite setSites={setSites} handleClick={handleClick} /> : null : null}
      </div>

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
  );
}
