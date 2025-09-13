import React, { useState } from 'react'
import { baseURL } from '../App'
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const signup = () => {
   const [form, setForm] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
  });

   const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.name || !form.password) {
      return toast.error("All fields are required");
    }
    try {
      const result = await axios.post(`${baseURL}/auth/signup`, {
        name: form.name,
        email: form.email,
        username: form.username,
        password: form.password,
      });
      // console.log(result);
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
        >
          Signup
        </button>
        <p className="mt-3 text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </form>
    </div>
  )
}

export default signup

