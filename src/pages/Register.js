import { useState } from "react";
import { apiPost } from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async e => {
    e.preventDefault();
    const res = await apiPost("/register", { email, password });
    setMsg(res.message);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={submit} className="bg-white shadow p-6 rounded w-80">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input 
          className="w-full p-2 border rounded mb-3"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password"
          className="w-full p-2 border rounded mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
        <p className="mt-3 text-green-600">{msg}</p>
      </form>
    </div>
  );
}
