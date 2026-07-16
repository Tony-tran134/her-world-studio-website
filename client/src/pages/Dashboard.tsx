import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Menu, X, BarChart3, Calendar, Briefcase, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState([
    { id: 1, client: "Emma", service: "Gel Nails", date: "2025-01-18", time: "14:00", status: "Confirmed" },
    { id: 2, client: "Sofia", service: "Lash Extensions", date: "2025-01-19", time: "10:00", status: "Pending" },
    { id: 3, client: "Lisa", service: "Pedicure", date: "2025-01-20", time: "16:00", status: "Confirmed" },
  ]);
  const [services] = useState([
    { id: 1, name: "Gel Nails", price: "400 kr", duration: "60 min", category: "Nails" },
    { id: 2, name: "Acrylic Nails", price: "450 kr", duration: "60 min", category: "Nails" },
    { id: 3, name: "Lash Extensions", price: "550 kr", duration: "75 min", category: "Lashes" },
    { id: 4, name: "Pedicure", price: "400 kr", duration: "50 min", category: "Feet" },
  ]);

  useEffect(() => {
    // Check if admin is logged in
    const adminAuth = localStorage.getItem("adminAuth");
    if (!adminAuth) {
      navigate("/admin-login");
    } else {
      setIsAdmin(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/");
  };

  const stats = {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === "Confirmed").length,
    totalServices: services.length,
    monthlyRevenue: "12,400 kr",
    websiteViews: "2,847",
  };

  if (!isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-red-600 shadow-md">
        <div className="container py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-red-600">Her World Studio</div>
          <div className="hidden md:flex gap-6 items-center">
            <a href="/" className="text-gray-600 hover:text-red-600 transition font-medium">
              ← Back to Website
            </a>
            <span className="text-gray-400">|</span>
            <span className="text-gray-700 font-medium">Admin Dashboard</span>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-800 hover:text-red-600 transition"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t-2 border-red-600 p-4 space-y-3">
            <a href="/" className="block text-gray-600 hover:text-red-600 transition font-medium py-2">
              ← Back to Website
            </a>
            <Button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        )}
      </nav>

      {/* Main Dashboard Content */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <div className="hidden md:block w-64 bg-white border-r border-gray-200 p-6">
          <div className="space-y-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition flex items-center gap-3 ${
                activeTab === "overview"
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition flex items-center gap-3 ${
                activeTab === "bookings"
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Calendar className="w-5 h-5" />
              Bookings
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition flex items-center gap-3 ${
                activeTab === "services"
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Briefcase className="w-5 h-5" />
              Services
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition flex items-center gap-3 ${
                activeTab === "analytics"
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Eye className="w-5 h-5" />
              Analytics
            </button>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="md:hidden w-full border-b border-gray-200 bg-white p-2 flex gap-2 overflow-x-auto">
          {["overview", "bookings", "services", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded font-medium whitespace-nowrap transition ${
                activeTab === tab
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <h1 className="text-4xl font-bold text-gray-900">Dashboard Overview</h1>
              
              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="p-6 border-2 border-gray-200 hover:border-red-600 transition">
                  <div className="text-gray-600 text-sm font-medium mb-2">Total Bookings</div>
                  <div className="text-3xl font-bold text-red-600">{stats.totalBookings}</div>
                  <div className="text-xs text-gray-500 mt-2">This month</div>
                </Card>
                <Card className="p-6 border-2 border-gray-200 hover:border-red-600 transition">
                  <div className="text-gray-600 text-sm font-medium mb-2">Confirmed</div>
                  <div className="text-3xl font-bold text-green-600">{stats.confirmedBookings}</div>
                  <div className="text-xs text-gray-500 mt-2">Ready to go</div>
                </Card>
                <Card className="p-6 border-2 border-gray-200 hover:border-red-600 transition">
                  <div className="text-gray-600 text-sm font-medium mb-2">Total Services</div>
                  <div className="text-3xl font-bold text-blue-600">{stats.totalServices}</div>
                  <div className="text-xs text-gray-500 mt-2">Available</div>
                </Card>
                <Card className="p-6 border-2 border-gray-200 hover:border-red-600 transition">
                  <div className="text-gray-600 text-sm font-medium mb-2">Monthly Revenue</div>
                  <div className="text-3xl font-bold text-purple-600">{stats.monthlyRevenue}</div>
                  <div className="text-xs text-gray-500 mt-2">Est. income</div>
                </Card>
                <Card className="p-6 border-2 border-gray-200 hover:border-red-600 transition">
                  <div className="text-gray-600 text-sm font-medium mb-2">Website Views</div>
                  <div className="text-3xl font-bold text-orange-600">{stats.websiteViews}</div>
                  <div className="text-xs text-gray-500 mt-2">This week</div>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3">
                    + New Booking
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3">
                    + Add Service
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3">
                    📅 View Calendar
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3">
                    📊 Export Report
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* BOOKINGS TAB */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-gray-900">Bookings Management</h1>
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
                  + New Booking
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left p-4 font-bold text-gray-700">Client</th>
                      <th className="text-left p-4 font-bold text-gray-700">Service</th>
                      <th className="text-left p-4 font-bold text-gray-700">Date</th>
                      <th className="text-left p-4 font-bold text-gray-700">Time</th>
                      <th className="text-left p-4 font-bold text-gray-700">Status</th>
                      <th className="text-left p-4 font-bold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-4 text-gray-900 font-medium">{booking.client}</td>
                        <td className="p-4 text-gray-600">{booking.service}</td>
                        <td className="p-4 text-gray-600">{booking.date}</td>
                        <td className="p-4 text-gray-600">{booking.time}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="p-4 space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                          <button className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-gray-900">Services Management</h1>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                  + Add Service
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Card key={service.id} className="p-6 border-2 border-gray-200 hover:border-red-600 transition">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.category}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-red-600">{service.price}</p>
                          <p className="text-sm text-gray-600">{service.duration}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition">
                          Edit
                        </button>
                        <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition">
                          Delete
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">Website Analytics</h1>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Views</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">January 2025</span>
                      <span className="text-2xl font-bold text-blue-600">2,847</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: '72%' }} />
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Service Popularity</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Gel Nails", count: 45, percent: 65 },
                      { name: "Lash Extensions", count: 28, percent: 40 },
                      { name: "Pedicure", count: 20, percent: 28 },
                    ].map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{item.name}</span>
                          <span className="font-bold text-gray-900">{item.count}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-red-600" style={{ width: `${item.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
