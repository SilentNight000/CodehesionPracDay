import { useEffect, useState } from "react";
import { getCategories } from "./services/getCategories";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState<{id:number,name:string}[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCategories();
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchData();
  }, []);

  const handleRegistrationClick = () => {
    console.log("Registering navigation...");
    navigate("/register");
  }

  const handleCategoryClick = (id: number) => {
    navigate(`/words/${id}`);
  }

  return (
    <>
      <div className="home-container">
        <h1>Home Page</h1>
        <h2>Register User:</h2>
        <button onClick={handleRegistrationClick}>Register User</button>
        <h2>Categories:</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category.id)}>{category.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
