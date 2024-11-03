import NavLink from "./NavLink";
import styles from "./NavBar.module.scss";
import Popup from "reactjs-popup";

const MobileNav = (props) => {
  return (
    <nav className={styles.mobileNav}>
      <Popup trigger={<img src="/images/MenuIcon.png" style={{ width: "40px" }} className={styles.hamburger} />} modal nested>
        {(close) => (
          <>
            
            <button className={styles.close} onClick={() => close()}>
              Ｘ
            </button>
            <NavLink user={props.user} handleSignOut={props.handleSignOut} handleClick={props.handleClick} />
          </>
        )}
      </Popup>
    </nav>
  );
};

export default MobileNav;
