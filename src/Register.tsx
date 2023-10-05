/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerUser } from "./services/register";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      name: "",
      surname: "",
      email: "",
      role: "",
    });

    const handleChange = (e: { target: { name: any; value: any } }) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      try {
        const response = await registerUser(formData.name, formData.surname, formData.email, formData.role);
        console.log("Submitted data:", response);

        if (response && response.data.access_token) {
          console.log("navigating...");
          navigate("/home");
        }
      } catch (error) {
        console.log("Login failed", error);
      }
    };

  return (
    <>
      <div className="register-container">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input
              type="surname"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="role"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Register;
