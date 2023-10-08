/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getCurrentUser } from "./services/getCurrentUser";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<{id: string; email: string; name: string; lastName: string; roles: {id: string; name: string }[];} | null>(null);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await getCurrentUser();
          const data = response.data;

          setUser(data);
        } catch (error) {
          console.error("Error fetching words:", error);
        }
      }

      fetchData();
    }, []);

    if (user === null) {
      return <h1>Loading...</h1>;
    }

    const userName = user.name;
    const userSurname = user.lastName;
    const userEmail = user.email;

    const handleUpdateClick = () => {
      navigate("/profile/updateProfile");
    }

    const handleGoBack = () => {
      navigate("/home");
    };


    return (
      <>
        <div className="profile-container">
          <button className="back-button" onClick={handleGoBack}>
            &#8592; Back
          </button>
          <h1>Profile Page:</h1>
          <h2>Current Details:</h2>
          <label>Name: {userName}</label>
          <br></br>
          <label>Surname: {userSurname}</label> <br></br>
          <label>Email: {userEmail}</label>
          <br></br>
          <button onClick={handleUpdateClick}>Update Profile</button>
        </div>
      </>
    );
}

export default Profile;