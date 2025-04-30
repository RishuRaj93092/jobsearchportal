import React, { useState } from "react";
import { registerUser } from "../../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "APPLICANT", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      console.log(res.data);
      alert("Registration Successful! Now Login.");
    } catch (err) {
      console.error(err);
      alert("Registration Failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
        <input className="w-full p-2 mb-4 border" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="w-full p-2 mb-4 border" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="w-full p-2 mb-4 border" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select className="w-full p-2 mb-4 border" name="role" onChange={handleChange}>
          <option value="APPLICANT">Applicant</option>
          <option value="COMPANY">Company</option>
        </select>
        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
