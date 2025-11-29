import { useEffect, useState } from "react";
import { apiGet, apiPut } from "../api";

export default function Profile() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth"; // redirect if not logged in
      return;
    }
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await apiGet("/profile");
      if (res.user) {
        setName(res.user.name);
        setPhone(res.user.phone);
        setEmail(res.user.email);
      }
    } catch (err) {
      console.error(err);
      window.location.href = "/auth"; // redirect if unauthorized
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const body = {
      name,
      phone,
      ...(password ? { password } : {})
    };

    try {
      const res = await apiPut("/profile", body);
      setMsg(res.message || "Updated successfully!");
    } catch (err) {
      console.error(err);
      setMsg("Failed to update profile");
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // clear token
    window.location.href = "/auth"; // redirect to login page
  };

  const goBack = () => {
    window.location.href = "/dashboard"; // redirect to first/main page
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => window.location.href = "/profile"}>
          MyApp
        </h1>

        <div className="flex space-x-4">
          <button
            className="hover:text-blue-600"
            onClick={() => window.location.href = "/tasks"}
          >
            Tasks
          </button>

          <button
            className="hover:text-blue-600 font-semibold border-b-2 border-blue-600"
            onClick={() => window.location.href = "/profile"}
          >
            Profile
          </button>

          <button
            className="text-red-600 font-semibold"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* PROFILE CARD */}
      <div className="flex justify-center items-center px-3 py-10">
        <div className="bg-white shadow p-6 rounded w-96">

          <h2 className="text-xl font-bold text-center mb-4">Profile</h2>

          <form onSubmit={updateProfile}>

            <input
              className="w-full p-2 border rounded mb-3"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full p-2 border rounded mb-3"
              value={phone}
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              className="w-full p-2 border rounded mb-3 bg-gray-200"
              value={email}
              readOnly
            />

            <input
              type="password"
              className="w-full p-2 border rounded mb-3"
              placeholder="New Password (optional)"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-blue-600 text-white p-2 rounded">
              Update Profile
            </button>

            <p className="mt-3 text-green-600">{msg}</p>
          </form>

          {/* Back Button */}
          <div className="mt-6 flex justify-center">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              onClick={goBack}
            >
              Back
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
