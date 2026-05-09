import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  MapPin,
  Calendar,
  Clock,
  Filter,
  Loader2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Heart,
  Search,
  Users,
  Building2,
  ListPlus,
  CalendarCheck,
  XCircle,
  CheckCircle2,
} from "lucide-react";

// NOTE: Ensure this URL matches your running backend API endpoint
const API_BASE_URL = `${import.meta.env.VITE_API_URL || ""}/api`;

const STATUS_OPTIONS = [
  { value: "all", label: "All Camps" },
  { value: "Upcoming", label: "Upcoming" },
  { value: "Ongoing", label: "Ongoing" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];

const CampCard = ({ camp, donorId, onBookingChange }) => {
  const [bookingLoading, setBookingLoading] = useState(false);

  const isCompleted = camp.status === "Completed";
  const isCancelled = camp.status === "Cancelled";
  const isUpcoming = camp.status === "Upcoming";
  const isOngoing = camp.status === "Ongoing";
  const canBook = isUpcoming || isOngoing;

  const statusColor = isCancelled
    ? "bg-red-100 text-red-600 border-red-200"
    : isCompleted
    ? "bg-gray-100 text-gray-600 border-gray-200"
    : isOngoing
    ? "bg-green-100 text-green-600 border-green-200"
    : "bg-blue-100 text-blue-600 border-blue-200";

  const campDate = new Date(camp.date);
  const dateStr = campDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timeStr = `${camp.time?.start || "N/A"} - ${camp.time?.end || "N/A"}`;

  const expectedDonors = camp.expectedDonors || 0;
  const actualDonors = camp.actualDonors || 0;

  // Count only active (booked) registrations
  const activeBookings = (camp.registeredDonors || []).filter(
    (r) => r.status === "booked"
  ).length;

  const slotsAvailable =
    expectedDonors > 0 ? expectedDonors - activeBookings : null;
  const isFull = slotsAvailable !== null && slotsAvailable <= 0;

  // Check if current donor has booked this camp
  const myBooking = (camp.registeredDonors || []).find(
    (r) => r.donor?.toString() === donorId?.toString() && r.status === "booked"
  );
  const isBooked = !!myBooking;

  const { venue, city, state, pincode } = camp.location || {};
  const locationStr = `${venue}, ${city}, ${state} - ${pincode}`;
  const hospitalName = camp.hospital?.name || "Associated Facility";

  const handleBookSlot = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please log in to book a slot.");

    setBookingLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/donor/camps/${camp._id}/book`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Slot booked successfully! 🎉");
      onBookingChange(); // refresh camps list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to book slot");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please log in.");

    setBookingLoading(true);
    try {
      const res = await axios.delete(
        `${API_BASE_URL}/donor/camps/${camp._id}/cancel`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Booking cancelled.");
      onBookingChange();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl p-6 border-2 overflow-hidden flex flex-col ${
        isCancelled ? "border-red-200 opacity-70" : isBooked ? "border-green-300" : "border-red-100"
      }`}
    >
      {/* Booked Banner */}
      {isBooked && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-3 py-2 mb-4 text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          You have booked a slot for this camp!
        </div>
      )}

      {/* Header with status badge */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
        <h4
          className={`text-xl font-bold leading-tight ${
            isCancelled ? "text-gray-500" : "text-gray-800"
          }`}
        >
          {camp.title}
        </h4>
        <span
          className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${statusColor} self-start sm:self-auto`}
        >
          {camp.status}
        </span>
      </div>

      {/* Hospital/Facility Name */}
      <div className="flex items-center gap-3 text-sm text-gray-700 mb-3 font-semibold">
        <Building2 className="w-4 h-4 text-red-500 flex-shrink-0" />
        <span className="truncate">{hospitalName}</span>
      </div>

      {/* Primary Camp details */}
      <div className="space-y-3 text-sm text-gray-600 mb-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">{locationStr}</span>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span>{dateStr}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span>{timeStr}</span>
        </div>
      </div>

      {/* Donor Metrics Summary */}
      <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-red-500" />
          <span className="font-semibold text-gray-700">Capacity:</span>
          <span className="font-medium text-gray-600">
            {expectedDonors > 0
              ? `${activeBookings} booked / ${expectedDonors} total`
              : `${actualDonors} Achieved`}
          </span>
        </div>

        {canBook && (
          <div className="flex items-center gap-2 text-sm">
            <ListPlus className="w-4 h-4 text-red-500" />
            <span className="font-semibold text-gray-700">Available Slots:</span>
            <span
              className={`font-bold ${
                isFull ? "text-red-600" : "text-green-600"
              }`}
            >
              {isFull
                ? "Full"
                : slotsAvailable !== null
                ? `${slotsAvailable} slots`
                : "Open"}
            </span>
          </div>
        )}

        {/* Description */}
        <div className="pt-3 border-t border-gray-100">
          <h5 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <Droplet className="w-4 h-4" /> Description
          </h5>
          <p className="text-gray-600 text-sm italic whitespace-pre-wrap">
            {camp.description || "No detailed description provided."}
          </p>
        </div>

        {/* Action Button */}
        {canBook && (
          <div className="mt-3">
            {isBooked ? (
              <button
                onClick={handleCancelBooking}
                disabled={bookingLoading}
                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-300 font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {bookingLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                {bookingLoading ? "Processing..." : "Cancel Booking"}
              </button>
            ) : (
              <button
                onClick={handleBookSlot}
                disabled={bookingLoading || isFull}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {bookingLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CalendarCheck className="w-4 h-4" />
                )}
                {bookingLoading
                  ? "Booking..."
                  : isFull
                  ? "Camp Full"
                  : "Book My Slot"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const DonorCampsList = () => {
  const [filter, setFilter] = useState("Upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [donorId, setDonorId] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
    currentPage: 1,
  });

  // Get donor ID from token (decode JWT payload)
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setDonorId(payload.id || payload._id || payload.donorId);
      }
    } catch (_) {
      // token parse failed — booking status check won't work but UI still functions
    }
  }, []);

  const fetchCamps = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required. Please log in to view camps.");
      toast.error("Authentication token missing.");
      setCamps([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const statusParam = filter === "all" ? "" : filter;
      const params = new URLSearchParams({
        ...(statusParam && { status: statusParam }),
        page: pagination.page,
        limit: pagination.limit,
        ...(searchTerm && { q: searchTerm }),
      }).toString();

      const apiUrl = `${API_BASE_URL}/donor/camps?${params}`;
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data: responseData } = response.data;

      if (responseData && responseData.camps) {
        setCamps(responseData.camps);
        setPagination((prev) => ({
          ...prev,
          total: responseData.pagination?.total || responseData.camps.length,
          totalPages: responseData.pagination?.totalPages || 1,
          currentPage: responseData.pagination?.currentPage || 1,
        }));
      } else {
        throw new Error("Invalid response structure received from server.");
      }
    } catch (err) {
      let message =
        err.response?.data?.message || err.message || "Failed to fetch camps.";
      if (err.response?.status === 401 || err.response?.status === 403) {
        message = "Authentication failed. Please log in again.";
      }
      toast.error(message);
      setError(message);
      setCamps([]);
      setPagination((prev) => ({
        ...prev,
        total: 0,
        totalPages: 1,
        currentPage: 1,
      }));
    } finally {
      setLoading(false);
    }
  }, [filter, pagination.page, pagination.limit, searchTerm]);

  useEffect(() => {
    fetchCamps();
  }, [fetchCamps]);

  const displayedCamps = camps;

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const totalPages = useMemo(
    () => pagination.totalPages,
    [pagination.totalPages]
  );
  const currentPage = useMemo(
    () => pagination.currentPage,
    [pagination.currentPage]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-4 sm:p-6 font-sans">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 bg-red-100 rounded-xl">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Blood Donation Camps
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Find local opportunities to donate blood — book your slot today!
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-md border border-red-100 p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search camps, locations, hospital name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2 min-w-[180px]">
                <Filter className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <select
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  disabled={loading}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Refresh */}
            <button
              onClick={() => fetchCamps()}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2.5 rounded-xl transition-all duration-200 border border-red-200 font-medium min-w-[120px]"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Results Summary */}
        {!loading && camps.length > 0 && (
          <div className="mb-4 px-2">
            <p className="text-sm text-gray-600">
              Showing {displayedCamps.length} camps
              {searchTerm && (
                <span>
                  {" "}
                  matching &quot;<span className="font-semibold">{searchTerm}</span>&quot;
                </span>
              )}
              . Total found: {pagination.total}.
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center p-12 bg-white rounded-2xl shadow-lg border border-red-100">
            <Loader2 className="w-8 h-8 text-red-500 mx-auto animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading camps...</p>
            <p className="text-sm text-gray-500 mt-1">
              Finding the best donation opportunities for you
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && camps.length === 0 && (
          <div className="text-center p-8 sm:p-12 bg-red-50 rounded-2xl shadow-lg border border-red-300">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplet className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-red-700 font-semibold mb-2">
              Unable to Load Camps
            </p>
            <p className="text-sm text-red-600 mb-6 max-w-md mx-auto">
              {error}
            </p>
            <button
              onClick={() => fetchCamps()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Camp List */}
        {!loading && displayedCamps.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {displayedCamps.map((camp) => (
                <CampCard
                  key={camp._id}
                  camp={camp}
                  donorId={donorId}
                  onBookingChange={fetchCamps}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 bg-white p-4 rounded-2xl shadow-md border border-red-100">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="p-2.5 border border-red-300 rounded-xl text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <span className="text-gray-700 text-sm font-medium min-w-[100px] text-center">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                  className="p-2.5 border border-red-300 rounded-xl text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <span className="text-sm text-gray-500 text-center sm:text-left">
                {pagination.total} Total Camps • {pagination.limit} per page
              </span>
            </div>
          </>
        )}

        {/* Empty */}
        {!loading && displayedCamps.length === 0 && !error && (
          <div className="text-center p-8 sm:p-12 bg-white rounded-2xl shadow-lg border border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplet className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {searchTerm ? "No Matching Camps Found" : "No Camps Available"}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm
                ? `No camps found matching "${searchTerm}" with the current filter.`
                : "There are no camps matching the current filter. Try adjusting your filter."}
            </p>
            {(searchTerm || filter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                  setPagination((prev) => ({ ...prev, page: 1 }));
                }}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl transition-colors font-medium"
              >
                Show All Camps
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorCampsList;