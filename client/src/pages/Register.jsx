import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg">
        <h2 className="text-2xl mb-4">Register</h2>
        <input className="block mb-2 p-2 border" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="block mb-2 p-2 border" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="block mb-4 p-2 border" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white px-4 py-2" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
