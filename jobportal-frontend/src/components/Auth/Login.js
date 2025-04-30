import React, { useState } from "react";
import { loginUser } from "../../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      console.log(res.data);
      alert(`Login Successful! Welcome ${res.data.name}`);
      localStorage.setItem("user", JSON.stringify(res.data)); // Save user to local storage
    } catch (err) {
      console.error(err);
      alert("Login Failed. Invalid credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
        <input className="w-full p-2 mb-4 border" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="w-full p-2 mb-4 border" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="w-full bg-green-500 text-white p-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
