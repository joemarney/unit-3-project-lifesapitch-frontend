import { Link } from "react-router-dom";

// ! Images

// ! Styles

export default function NavBar(props) {
  return (
    <>
      {props.user ? (
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
            <Link to="/">Campsites</Link>
            <Link to="/checklist">Checklist</Link>
            <Link to="/aboutus">About Us</Link>
            <Link to="/signout">Sign Out</Link>
            <Link to="/secret">Secret</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/aboutus">About Us</Link>
            <Link to="/secret">Secret</Link>
          </li>
        </ul>
      )}
    </>
  );
}
