import { useState } from "react";
import { apiPost } from "../api";

export default function Auth() {
  const [mode, setMode] = useState("login"); // login | register
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async e => {
    e.preventDefault();

    const url = mode === "login" ? "/login" : "/register";

    // Data for register mode
    const body =
      mode === "login"
        ? { email, password }
        : { name, phone, email, password };

    const res = await apiPost(url, body);

    if (mode === "login") {
      if (res.token) {
        localStorage.setItem("token", res.token);
        window.location.href = "/dashboard";
      } else {
        setMsg(res.message);
      }
    } else {
      if (res.message === "User registered successfully") {
        setMsg("Registered successfully! Redirecting to login...");
        setTimeout(() => setMode("login"), 1500);
      } else {
        setMsg(res.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-3">
      <div className="bg-white shadow p-6 rounded w-80">

        {/* Tabs */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => {
              setMode("login");
              setMsg("");
            }}
            className={`px-3 py-1 border-b-2 ${
              mode === "login"
                ? "border-blue-600 font-bold"
                : "border-transparent"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => {
              setMode("register");
              setMsg("");
            }}
            className={`px-3 py-1 border-b-2 ${
              mode === "register"
                ? "border-green-600 font-bold"
                : "border-transparent"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={submit}>

          {/* Name (only register mode) */}
          {mode === "register" && (
            <input
              className="w-full p-2 border rounded mb-3"
              placeholder="Name"
              onChange={e => setName(e.target.value)}
            />
          )}

          {/* Phone (only register mode) */}
          {mode === "register" && (
            <input
              className="w-full p-2 border rounded mb-3"
              placeholder="Phone Number"
              onChange={e => setPhone(e.target.value)}
            />
          )}

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

          <button
            className={`w-full text-white p-2 rounded ${
              mode === "login" ? "bg-blue-500" : "bg-green-600"
            }`}
          >
            {mode === "login" ? "Login" : "Register"}
          </button>

          <p className="mt-3 text-red-600">{msg}</p>
        </form>
      </div>
    </div>
  );
}
