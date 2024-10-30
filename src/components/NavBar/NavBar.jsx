import { Link } from "react-router-dom";

// ! Images

// ! Styles

export default function NavBar(props) {
  return (
    <>
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
      )}
    </>
  );
}
