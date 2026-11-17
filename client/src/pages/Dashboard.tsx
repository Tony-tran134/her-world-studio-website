import { useEffect, useState } from "react";
import {
  BarChart3,
  Briefcase,
  Calendar,
  Eye,
  Gift,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";

const sections = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "services", label: "Services & Prices", icon: Briefcase },
  { id: "loyalty", label: "Loyalty", icon: Gift },
  { id: "settings", label: "Website Settings", icon: Settings },
  { id: "analytics", label: "Analytics", icon: Eye },
] as const;

type DashboardSection = (typeof sections)[number]["id"];
import { LogOut, Menu, X, BarChart3, Calendar, Briefcase, Eye } from "lucide-react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardSection>("overview");

  useEffect(() => {
    let active = true;

    fetch("/api/admin/session", { cache: "no-store" })
      .then(async response => {
        if (!response.ok)
          throw new Error("Unable to verify the admin session.");
        return (await response.json()) as {
          enabled: boolean;
          authenticated: boolean;
        };
      })
      .then(status => {
        if (!active) return;
        if (status.enabled && status.authenticated) setIsAdmin(true);
        else navigate("/admin-login");
      })
      .catch(() => {
        if (active) navigate("/admin-login");
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      if (!response.ok)
        throw new Error("Unable to sign out. Please try again.");
      navigate("/");
    } catch (error) {
      setLogoutError(
        error instanceof Error ? error.message : "Unable to sign out."
      );
      setIsLoggingOut(false);
    }
  };

  const selectSection = (section: DashboardSection) => {
    setActiveTab(section);
    setIsMobileMenuOpen(false);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-red-600 shadow-md">
        <div className="container py-4 flex items-center justify-between">
          <a href="/" className="flex flex-col leading-none text-brand-primary">
            <span className="text-xl font-semibold tracking-wide">
              Her World
            </span>
            <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.32em]">
              Studio H · Owner
            </span>
          </a>
          <div className="hidden md:flex gap-6 items-center">
            <a
              href="/"
              className="text-gray-600 hover:text-red-600 transition font-medium"
            >
              ← Back to Website
            </a>
            <span className="text-gray-400">|</span>
            <span className="text-gray-700 font-medium">Owner Dashboard</span>
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-2 text-gray-800 hover:text-red-600 transition"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t-2 border-red-600 p-4 space-y-3">
            <a
              href="/"
              className="block text-gray-600 hover:text-red-600 transition font-medium py-2"
            >
              ← Back to Website
            </a>
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        )}
      </nav>

      <div
        className="border-b border-red-100 bg-red-50 px-6 py-3 text-sm text-red-900"
        role="note"
      >
        Appointments and business insights are not available here yet. Use
        Bokadirekt to manage appointments.
      </div>

      {logoutError && (
        <p className="bg-red-50 px-6 py-3 text-sm text-red-700" role="alert">
          {logoutError}
        </p>
      )}

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-5 md:block">
          <nav aria-label="Dashboard sections" className="space-y-2">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => selectSection(id)}
                aria-current={activeTab === id ? "page" : undefined}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition ${
                  activeTab === id
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <nav
          aria-label="Dashboard sections"
          className="flex gap-2 overflow-x-auto border-b border-gray-200 bg-white p-2 md:hidden"
        >
          {sections.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => selectSection(id)}
              aria-current={activeTab === id ? "page" : undefined}
              className={`whitespace-nowrap rounded px-3 py-2 text-sm font-medium transition ${
                activeTab === id
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <main className="min-w-0 flex-1 p-5 md:p-8">
          {activeTab === "overview" && (
            <div className="mx-auto max-w-5xl space-y-7">
              <header>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-secondary">
                  Her World Studio · Studio H
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-gray-900 md:text-4xl">
                  Owner overview
                </h1>
                <p className="mt-2 text-gray-600">
                  A clear view of the owner tools currently available for your
                  studio.
                </p>
              </header>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: "Appointments", status: "Manage in Bokadirekt" },
                  { title: "Revenue", status: "Not available" },
                  { title: "Services & prices", status: "View on website" },
                  { title: "Loyalty", status: "Coming soon" },
                ].map(item => (
                  <Card key={item.title} className="border border-gray-200 p-5">
                    <p className="text-sm font-medium text-gray-600">
                      {item.title}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-gray-900">
                      {item.status}
                    </p>
                  </Card>
                ))}
              </div>

              <Card className="border border-red-100 bg-white p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-900">
                  More owner tools coming soon
                </h2>
                <p className="mt-2 max-w-3xl text-gray-600">
                  Service editing, loyalty rewards, and appearance controls are
                  not available yet. No visits or analytics are tracked in this
                  dashboard.
                </p>
              </Card>
            </div>
          )}

          {activeTab === "bookings" && (
            <section className="mx-auto max-w-4xl space-y-5">
              <header>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Bookings
                </h1>
                <p className="mt-2 text-gray-600">
                  Appointments are managed in Bokadirekt and do not appear here.
                </p>
              </header>
              <Card className="border border-gray-200 p-6 md:p-8">
                <h2 className="text-lg font-semibold text-gray-900">
                  Manage appointments in Bokadirekt
                </h2>
                <p className="mt-2 text-gray-600">
                  Continue to use Bokadirekt for your appointments. Booking
                  details are not shown in this dashboard.
                </p>
                <a
                  href="https://www.bokadirekt.se/places/her-world-studio-131326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                >
                  Open Bokadirekt
                </a>
              </Card>
            </section>
          )}

          {activeTab === "services" && (
            <section className="mx-auto max-w-4xl space-y-5">
              <header>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Services &amp; Prices
                </h1>
                <p className="mt-2 text-gray-600">
                  Service and price editing is not available here yet.
                </p>
              </header>
              <Card className="border border-gray-200 p-6 md:p-8">
                <h2 className="text-lg font-semibold text-gray-900">
                  Current treatments and prices
                </h2>
                <p className="mt-2 text-gray-600">
                  View the current service list on the website. For changes,
                  please contact the studio.
                </p>
                <a
                  href="/#services"
                  className="mt-5 inline-flex rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                >
                  View services
                </a>
              </Card>
            </section>
          )}

          {activeTab === "loyalty" && (
            <section className="mx-auto max-w-4xl space-y-5">
              <header>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Loyalty
                </h1>
                <p className="mt-2 text-gray-600">
                  The loyalty program is not active yet.
                </p>
              </header>
              <Card className="border border-gray-200 p-6 md:p-8">
                <p className="text-gray-600">
                  When available, the program will reward customers after a set
                  number of completed visits with a discount on their next
                  visit.
                </p>
                <p className="mt-4 rounded-md bg-gray-50 p-4 text-sm text-gray-700">
                  Completed visits are not tracked here. The dashboard cannot
                  detect visits made through Bokadirekt.
                </p>
              </Card>
            </section>
          )}

          {activeTab === "settings" && (
            <section className="mx-auto max-w-4xl space-y-5">
              <header>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Website Settings
                </h1>
                <p className="mt-2 text-gray-600">
                  Appearance controls are not available in the dashboard yet.
                </p>
              </header>
              <Card className="border border-gray-200 p-6 md:p-8">
                <h2 className="text-lg font-semibold text-gray-900">
                  Current brand look
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { name: "Primary", color: "var(--brand-primary)" },
                    { name: "Secondary", color: "var(--brand-secondary)" },
                    { name: "Accent", color: "var(--brand-accent)" },
                    {
                      name: "Section",
                      color: "var(--brand-section-background)",
                    },
                  ].map(swatch => (
                    <div key={swatch.name}>
                      <div
                        className="h-16 rounded-md border border-black/10"
                        style={{ backgroundColor: swatch.color }}
                        aria-label={`${swatch.name} brand color`}
                      />
                      <p className="mt-2 text-sm text-gray-600">
                        {swatch.name}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="brand-silk mt-6 flex h-24 items-end rounded-lg p-4 text-sm font-medium text-white"
                  role="img"
                  aria-label="Red silk brand texture"
                >
                  Red silk
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  The site currently uses deep red, warm neutral colors, and a
                  red silk accent. These appearance settings cannot be changed
                  here yet.
                </p>
              </Card>
            </section>
          )}

          {activeTab === "analytics" && (
            <section className="mx-auto max-w-4xl space-y-5">
              <header>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Insights
                </h1>
                <p className="mt-2 text-gray-600">
                  Website insights are not available yet.
                </p>
              </header>
              <Card className="border border-gray-200 p-6 md:p-8">
                <p className="text-gray-600">
                  Visitor, booking, revenue, and service figures are not shown
                  here until reliable information is available.
                </p>
              </Card>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
