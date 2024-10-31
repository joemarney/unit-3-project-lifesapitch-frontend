import NavLink from "./NavLink";
import styles from './NavBar.module.scss'

const DesktopNav = (props) => {

    return (

        <nav className={styles.desktopNav}>

            <NavLink user={props.user} handleSignOut={props.handleSignOut}/>
        
        </nav>





    )
}


export default DesktopNav