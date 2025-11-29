import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-xl font-bold">Task Manager</h1>

      <div className="space-x-4">

        
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>

        <Link to="/profile" className="mr-4">Profile</Link>

      </div>
    </nav>
  );
}
