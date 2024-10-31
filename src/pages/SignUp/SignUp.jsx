import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services/userService";

// ! Images

// ! Components

// ! Styles
import styles from "../SignUp/SignUp.module.scss";

export default function SignUp(props) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    campsiteOwner: false,
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const { user } = await signup(formData);
      props.setUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className={styles.container}>
      <section>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div>
            <label htmlFor="username">Username:</label>
            <br></br>
            <input type="text" name="username" placeholder="John Doe" value={formData.username} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <br></br>
            <input type="email" name="email" placeholder="johndoe@gmail.com" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <br></br>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <br></br>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="campsiteOwner">Are you an owner?</label>
            <br></br>
            <input type="checkbox" name="campsiteOwner" checked={formData.campsiteOwner} onChange={handleChange}></input>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit">Sign Up</button>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
