import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ! Components
import NavBar from "./components/NavBar/NavBar";

// ! Pages
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Campsites from "./pages/Campsites/ListCampsite/ListCampsite";
import AboutUs from "./pages/AboutUs/AboutUs";
import Checklist from "./pages/CheckList/Checklist";
import ShowCampsite from "./pages/Campsites/ShowCampsite/ShowCampsite";
import AddCampsite from "./pages/Campsites/AddCampsite/AddCampsite";
import ProfilePage from "./pages/Profile/Profile";

// ! Utilities
import { getUser, removeToken } from "./utilities/auth";

export default function App() {
  const [user, setUser] = useState(getUser());

  const navigate = useNavigate();

  const handleSignOut = () => {
    removeToken();
    setUser(null);
    navigate("/signin");
  };

  return (
    <main>
      <NavBar user={user} handleSignOut={handleSignOut} />
      {user ? (
        <>
          <h1>You are signed In</h1>
          <h2>Jinn Productions</h2>
        </>
      ) : (
        <>
          <h1>You are not signed in</h1>
          <h2>Jinn Productions</h2>
        </>
      )}
      <Routes>
        <Route path="/campsites" element={<Campsites user={user} />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/campsites/:campsiteId" element={<ShowCampsite />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
      </Routes>
    </main>
  );
}
