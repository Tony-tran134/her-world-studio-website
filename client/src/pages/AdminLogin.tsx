import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(true);
  const [adminEnabled, setAdminEnabled] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/admin/session", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Admin sign-in is unavailable.");
        return (await response.json()) as {
          enabled: boolean;
          authenticated: boolean;
        };
      })
      .then((status) => {
        if (!active) return;
        setAdminEnabled(status.enabled);
        if (status.authenticated) navigate("/dashboard");
      })
      .catch(() => {
        if (active) setAvailabilityMessage("Admin sign-in is temporarily unavailable.");
      })
      .finally(() => {
        if (active) setIsCheckingAvailability(false);
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Unable to sign in.");
      }

      navigate("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to sign in.");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
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
                required
                disabled={isCheckingAvailability || !adminEnabled}
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
              disabled={isLoading || isCheckingAvailability || !adminEnabled}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {isCheckingAvailability
                ? "Checking sign-in..."
                : isLoading
                  ? "Logging in..."
                  : "Login to Dashboard"}
            </Button>
          </form>

          {!isCheckingAvailability && !adminEnabled && (
            <p className="mt-4 text-sm text-red-700" role="status">
              {availabilityMessage ||
                "Admin sign-in is not configured on this site. Please contact the site owner."}
            </p>
          )}

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

      </div>
    </div>
  );
}
