import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FileText } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
            <FileText className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-slate-800">
          Document Scanner Pro
        </h1>
        <p className="text-center text-sm text-slate-500 mt-1">
          Sign in to continue
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-slate-600 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
