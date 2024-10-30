import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ! Services
import { index } from "../../../services/campsiteService";

// ! Pages
import AddCampsite from "../AddCampsite/AddCampsite";

// ! Styles
import styles from "./ListCampsite.module.scss";

export default function ListCampsite({ user }) {
  const [sites, setSites] = useState([]);

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

  return (
    <>
      <h1>Welcome to the Campsites</h1>

      {user ? user.campsiteOwner ? <AddCampsite setSites={setSites} /> : <h5>You need to be a campsite Owner to add new campsites</h5> : null}

      <h3>Here you will find all of the campsites around the UK!</h3>

      <main className={styles.container}>
        {sites.map((site) => {
          return (
            <Link key={site._id} to={`/${site._id}`}>
              <article>
                <header>
                  <h2>{site.title}</h2>
                </header>
                <p>{site.cost} pp.pn</p>
                <p>{site.location}</p>
              </article>
            </Link>
          );
        })}
      </main>
    </>
  );
}
