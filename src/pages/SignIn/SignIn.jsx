import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signin } from "../../services/userService";

// ! Styles
import styles from "../SignIn/SignIn.module.scss";

export default function SignIn(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signin(formData);
      props.setUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className={styles.container}>
      <section>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" placeholder="John Doe" onChange={handleChange} value={formData.username}></input>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} value={formData.password}></input>
          </div>

          <button>Sign In</button>
        </form>
      </section>
    </main>
  );
}
