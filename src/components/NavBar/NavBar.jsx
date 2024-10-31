import { useState } from "react";
// ! Images

// ! Styles
import styles from '../NavBar/NavBar.module.scss'
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";



export default function NavBar(props) {

const [isClosed, setIsClosed] = useState(true)

const handleClick = async () => {
  await setIsClosed(false)
  setIsClosed(true)
}

  return (
    <main className={styles.container}>

        

<DesktopNav user={props.user} handleSignOut={props.handleSignOut}/>
{isClosed && <MobileNav user={props.user} handleSignOut={props.handleSignOut} handleClick={handleClick}/>}




{/* 
      {props.user ? (
        <ul>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/">Campsites</Link></li>
            <li><Link to="/checklist">Checklist</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="" onClick={props.handleSignOut}>Sign Out</Link></li>
            <li><Link to="/secret">Secret</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to="/">Campsites</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/secret">Secret</Link></li>
        </ul>
      )} */}
    </main>
  );
}
