/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { updateCurrentUser } from "./services/updateCurrentUser";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      name: "",
      lastName: "",
      email: "",
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
        const response = await updateCurrentUser(formData.name, formData.lastName, formData.email);
        console.log("Submitted data:", response);

          alert("Update Success");
          navigate("/profile");
      } catch (error) {
        console.log("Update failed", error);
        alert("Update failed");
      }
    };

    const handleGoBack = () => {
      navigate("/profile");
    };

    return (
      <div className="updateProfile-container">
        <button className="back-button" onClick={handleGoBack}>
          &#8592; Back
        </button>
        <h1>Profile Update</h1>
        <h2>Change Details:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Surname: </label>
            <input
              type="lastName"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Details</button>
        </form>
      </div>
    );
}

export default UpdateProfile;