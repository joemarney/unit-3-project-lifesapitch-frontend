import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


// ! Services
import { index } from '../../../services/campsiteService';

// ! Pages
import AddCampsite from '../AddCampsite/AddCampsite';

// ! Styles
import styles from './ListCampsite.module.scss'

export default function ListCampsite() {

    const [sites, setSites] = useState([])

    useEffect(() => {
        const fetchSites = async () => {
            try {
                const { data } = await index()
                setSites(data)
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchSites()
    }, [setSites])

    return (
        <main className={styles.container}>
            <h1>Welcome to the Campsites</h1>

            <AddCampsite setSites={setSites} />


            <h3>Here you will find all of the campsites around the UK!</h3>
            <ul>

                {sites.map((site) => {
                    return (
                        <li key={site._id} >
                            <Link to={`/campsites/${site._id}`}>
                                <article>
                                    <header>
                                        <h2>{site.title}</h2>
                                    </header>
                                    <p>{site.cost} pp.pn</p>
                                    <p>{site.location}</p>
                                </article>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}