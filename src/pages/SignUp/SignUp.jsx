import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services/userService";

// ! Images

// ! Styles

export default function SignUp(props) {
  const [formData, setFormData] = useState({
    username: "",
    email: '',
    password: "",
    confirmPassword: "",
    campsiteOwner: false
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
    <main>
      <section>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" placeholder="John Doe" value={formData.username} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input type='email' name='email' placeholder='johndoe@gmail.com' value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          <div>
          <label htmlFor="campsiteOwner">Are you an owner?</label>
          <input type="checkbox" name="campsiteOwner" value={formData.isOwner} onChange={handleChange}></input>
          </div>
          <div>
            <button>Sign Up</button>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
