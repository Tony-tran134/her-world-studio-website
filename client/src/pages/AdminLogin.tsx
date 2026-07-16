import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Demo password - CHANGE THIS TO A SECURE PASSWORD
  const ADMIN_PASSWORD = "HerWorld123!";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem("adminAuth", "true");
        navigate("/dashboard");
      } else {
        setError("Invalid password. Try: HerWorld123!");
        setPassword("");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: "#640606" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Her World Studio</h1>
          <p className="text-red-100 text-lg">Admin Login</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 border-4 border-white bg-white">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition font-medium"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-100 border-2 border-red-600 rounded-lg text-red-700 font-medium text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login to Dashboard"}
            </Button>
          </form>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800 font-medium mb-2">🔐 Demo Credentials:</p>
            <p className="text-xs text-yellow-700">
              <strong>Password:</strong> HerWorld123!
            </p>
            <p className="text-xs text-yellow-600 mt-2 italic">
              ⚠️ Change this password in production!
            </p>
          </div>

          {/* Back Link */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-red-600 hover:text-red-700 font-medium text-sm transition"
            >
              ← Back to Website
            </a>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-lg text-white text-center text-sm">
          <p>🔒 This is a secure admin area. Only authorized personnel should access.</p>
        </div>
      </div>
    </div>
  );
}
