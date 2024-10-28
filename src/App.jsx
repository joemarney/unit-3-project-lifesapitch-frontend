import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// ! Components

// ! Pages
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

// ! Utilities
import { getUser, removeToken } from "./utilities/auth";
import NavBar from "./components/NavBar/NavBar";

export default function App() {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const handleSignOut = () => {
    removeToken();
    setUser(null);
    navigate("/signin");
  };

  return (
    <main>
      <NavBar user={user} />
      <h1>Jinn Productions</h1>
      <h2>Does this work</h2>
      <Routes>
        <Route path="/"></Route>
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
      </Routes>
    </main>
  );
}
