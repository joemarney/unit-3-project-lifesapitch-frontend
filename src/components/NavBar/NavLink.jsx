import { Link } from "react-router-dom";
import styles from './NavBar.module.scss'

export default function NavLink(props) {
    return (
        <main className={styles.container} onClick={props.handleClick}>
            {props.user ? (
                <ul>
                    <h2 className={styles.titleDesk}>Lifes a Pitch</h2>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/">Campsites</Link></li>
                    <li><Link to="/checklist">Checklist</Link></li>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="" onClick={props.handleSignOut}>Sign Out</Link></li>
                    <li><Link to="/secret">Secret</Link></li>
                </ul>
            ) : (
                <ul>
                    <h1>Lifes a Pitch</h1>
                    <li><Link to="/">Campsites</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/secret">Secret</Link></li>
                </ul>
            )}
        </main>
    );
}
