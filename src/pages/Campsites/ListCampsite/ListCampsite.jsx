import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { index } from '../../../services/campsiteService';

// ! Styles

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
        <main>
        <h1>Welcome to the Campsites</h1>
        <h3>Here you will find all of the campsites around the UK!</h3>
        { sites.map((site) => {
            return (
                <Link key={site._id} to={`/campsites/${site._id}`}>
                    <h2>{site.title}</h2>
                </Link>
            )
        })
    }
        </main>
    )
    }