import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <input className="block mb-2 p-2 border" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="block mb-4 p-2 border" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

