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



      <DesktopNav user={props.user} handleSignOut={props.handleSignOut} />
      {isClosed && <MobileNav user={props.user} handleSignOut={props.handleSignOut} handleClick={handleClick} />}

    </main>
  );
}
