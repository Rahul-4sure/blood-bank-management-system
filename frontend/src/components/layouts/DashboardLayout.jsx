import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  Menu,
  X,
  User,
  BarChart3,
  CheckCircle,
  Droplet,
  ClipboardList,
  History,
  Building,
  Shield,
  Calendar,
  ClipboardPlus,
  Ambulance,
  TestTube,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

const DashboardLayout = ({ userRole = "donor" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const theme = {
    primary: {
      50: "#fef2f2",
      100: "#fee2e2",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
    },
    secondary: {
      500: "#64748b",
    },
  };

  const menuConfig = {
    donor: {
      title: "Blood Donor Portal",
      subtitle: "Be a Hero, Save Lives",
      shortTitle: "Donor",
      icon: User,
      items: [
        { path: "/donor", label: "Dashboard", icon: BarChart3 },
        { path: "/donor/profile", label: "My Profile", icon: User },
        { path: "/donor/history", label: "Donation History", icon: History },
        { path: "/donor/camps", label: "Blood Camps", icon: Calendar },
      ],
    },

    hospital: {
      title: "Hospital Management",
      subtitle: "Blood Request & Inventory",
      shortTitle: "Hospital",
      icon: Building,
      items: [
        { path: "/hospital", label: "Dashboard", icon: BarChart3 },
        {
          path: "/hospital/blood-request-create",
          label: "Blood Requests",
          icon: ClipboardList,
        },
        { path: "/hospital/inventory", label: "Inventory", icon: Droplet },
        { path: "/hospital/donors", label: "Donors", icon: User },
        {
          path: "/hospital/blood-request-history",
          label: "History",
          icon: Ambulance,
        },
      ],
    },

    blood_lab: {
      title: "Blood Lab Center",
      subtitle: "Testing & Quality Control",
      shortTitle: "Lab",
      icon: TestTube,
      items: [
        { path: "/lab", label: "Dashboard", icon: BarChart3 },
        { path: "/lab/inventory", label: "Inventory", icon: Droplet },
        { path: "/lab/donor", label: "Donors", icon: User },
        { path: "/lab/camps", label: "Camps", icon: Calendar },
        { path: "/lab/requests", label: "Requests", icon: ClipboardList },
        { path: "/lab/profile", label: "Profile", icon: CheckCircle },
      ],
    },

    admin: {
      title: "BBMS Admin Panel",
      subtitle: "System Administration",
      shortTitle: "Admin",
      icon: Shield,
      items: [
        { path: "/admin", label: "Overview", icon: BarChart3 },
        {
          path: "/admin/verification",
          label: "Verification",
          icon: Shield,
        },
        { path: "/admin/facilities", label: "Facilities", icon: Building },
        { path: "/admin/donors", label: "Donors", icon: User },
      ],
    },
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const apiUrl = `${
          import.meta.env.VITE_API_URL || ""
        }/api/auth/profile`;

        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          const user = data.user;

          if (!user) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }

          if (
            user?.role?.toLowerCase() !==
            userRole?.toLowerCase()
          ) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }

          setUserData(user);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, userRole]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const normalizedRole = userRole
    ?.toLowerCase()
    .replace("-", "_");

  const config = menuConfig[normalizedRole] || {
    title: "Dashboard",
    subtitle: "Welcome",
    shortTitle: "App",
    icon: BarChart3,
    items: [],
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto" />
          <p className="mt-3 font-semibold text-gray-600">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-red-50">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 bg-white border-b px-4 py-3 flex justify-between items-center ${
          isScrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>

          <div className="flex items-center gap-2">
            <ClipboardPlus className="text-red-600" />
            <div>
              <h1 className="font-bold text-red-700">
                {config.title}
              </h1>
              <p className="text-xs text-gray-500">
                {config.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
            {userData?.name?.charAt(0)?.toUpperCase() ||
              userData?.fullName?.charAt(0)?.toUpperCase() ||
              "U"}
          </div>

          <div className="hidden sm:block text-right">
            <p className="font-medium text-sm">
              {userData?.name ||
                userData?.fullName ||
                "User"}
            </p>
            <p className="text-xs capitalize text-gray-500">
              {userRole.replace("_", " ")}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="text-red-600"
          >
            <LogOut />
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 left-0 h-full bg-white border-r z-40 transition-all duration-300 ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          } ${sidebarCollapsed ? "w-16" : "w-64"}`}
        >
          {/* Top */}
          <div className="p-4 border-b flex justify-between items-center">
            {!sidebarCollapsed && (
              <h2 className="font-bold text-red-700">
                {config.shortTitle}
              </h2>
            )}

            <button
              className="hidden lg:block"
              onClick={() =>
                setSidebarCollapsed(!sidebarCollapsed)
              }
            >
              {sidebarCollapsed ? (
                <ChevronRight />
              ) : (
                <ChevronLeft />
              )}
            </button>
          </div>

          {/* Menu */}
          <nav className="p-3 space-y-2">
            {config.items.map((item) => {
              const Icon = item.icon;
              const active =
                location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    active
                      ? "bg-red-600 text-white"
                      : "hover:bg-red-50 text-gray-700"
                  }`}
                >
                  <Icon size={18} />
                  {!sidebarCollapsed && (
                    <span>{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet context={{ userData, theme }} />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;