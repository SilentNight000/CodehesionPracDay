import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from './Home';
import Register from "./Register";
import Words from "./Words";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/words/:id" element={<Words />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/updateProfile" element={<UpdateProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
