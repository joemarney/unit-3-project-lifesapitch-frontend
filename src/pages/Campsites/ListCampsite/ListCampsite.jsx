import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';

import { index } from '../../../services/campsiteService';

// ! Pages

import AddCampsite from '../AddCampsite/AddCampsite';
import ShowCampsite from '../ShowCampsite/ShowCampsite';


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
    }, [])

    return (
        <main className={styles.container}>
            <h1>Welcome to the Campsites</h1>

            <AddCampsite setSites={setSites} />


            <h3>Here you will find all of the campsites around the UK!</h3>

            {sites.map((site) => {
                return (
                    <Link key={site._id} to={`/campsites/${site._id}`}>
                        <article>
                            <header>
                                <h2>{site.title}</h2>
                            </header>
                            <p>{site.cost} pp.pn</p>
                            <p>{site.location}</p>
                        </article>
                    </Link>
                    )
                })}
        </main>
    )
}