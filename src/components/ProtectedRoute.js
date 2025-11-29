import { Navigate, Link } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If user is logged in → allow access
  if (token) return children;

  // If user NOT logged in → show message + buttons at bottom
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">

      <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
      <p className="text-gray-700 mb-8">Please log in or register to continue.</p>

      {/* Bottom fixed buttons */}
      <div className="absolute bottom-8 flex space-x-4">
        <Link
          to="/login"
          className="px-5 py-2 bg-blue-600 text-white rounded shadow"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-5 py-2 bg-green-600 text-white rounded shadow"
        >
          Register
        </Link>
        
        
      </div>
    </div>
  );
}
