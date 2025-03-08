import { useState } from "react";
import { login, register } from "../firebase";

interface Props {
    onSignInSuccess: () => void;
}

export default function LoginForm({ onSignInSuccess }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    const token = await login(email, password);
    if (token) {
      localStorage.setItem("token", token);
      onSignInSuccess();
    } else {
      setError("Failed to log in. Check your credentials.");
    }
  };

  const handleRegister = async () => {
    setError(null);
    const token = await register(email, password);
    if (token) {
      localStorage.setItem("token", token);
      onSignInSuccess();
    } else {
      setError("Failed to register. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login or Register</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-6 space-y-4">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
