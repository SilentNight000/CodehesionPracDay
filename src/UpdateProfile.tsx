/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const UpdateProfile = () => {
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

    const handleSubmit = () => {
      console.log("Youve changed it");
    };

    return (
      <div className="updateProfile-container">
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