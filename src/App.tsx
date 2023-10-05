/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { loginUser } from './services/login'
import './App.css'

function App() {
  // const [accessToken] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Add your login logic here, e.g., send a request to your server
    const response = await loginUser(formData.username, formData.password);
    console.log("Submitted data:", response);
  };

  return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
  )
}

export default App
