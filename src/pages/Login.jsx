import React from 'react'
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { baseURL } from "../App";
import { useState } from 'react';

const Login = ({setUser}) => {
    const [form, setForm] = useState({ email: "", password: "" });
  const navigate=useNavigate();



   const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dummy auth logic
    if (!form.email || !form.password) {
      return toast.error("All fields are required");
    }
    try {
      const results = await axios.post(`${baseURL}/auth/login`, {
        email: form.email,
        password: form.password,
      });
      toast.success(results.data.message);
      if (results?.data?.user.role === "employee") {
        navigate("/employee");
        setUser(results?.data?.user);
        localStorage.setItem("user", JSON.stringify(results?.data?.user));
        localStorage.setItem("token", results?.data?.token);
      } else if (results?.data?.user.role === "manager") {
        navigate("/manager");
        setUser(results?.data?.user);
        localStorage.setItem("user", JSON.stringify(results?.data?.user));
        localStorage.setItem("token", results?.data?.token);
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-3 text-sm text-gray-500">
          No account?{" "}
          <a href="/signup" className="text-blue-500">
            Signup
          </a>
        </p>
      </form>
    </div>
  )
}

export default Login
