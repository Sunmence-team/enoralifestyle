// src/pages/Appointments.tsx
import React, { useEffect, useState, useCallback } from "react";
import { IoNotifications } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import DashboardTable from "./DashboardTable";
import axios from "axios";
import { toast } from "sonner";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  notes?: string;
  status: "pending" | "confirmed" | "attended" | "cancelled";
  created_at: string;
  updated_at: string;
}

const Appointments: React.FC = () => {
  const navigate = useNavigate();

  // Filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const hasActiveFilters = search || statusFilter || fromDate || toDate;

  // Stats
  const [totalAppointment, setTotalAppointment] = useState("0");
  const [pending, setPending] = useState("0");
  const [completed, setCompleted] = useState("0");
  const [cancelled, setCancelled] = useState("0");
  const [statsLoading, setStatsLoading] = useState(true);

  // Table
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  // Modals
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // === AUTH & INITIAL FETCH ===
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }
    fetchStats();
    fetchBookings(1);
  }, [navigate]);

  // === FETCH STATS ===
  const fetchStats = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setStatsLoading(true);
      const { data } = await axios.get(`${API_URL}/bookings/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const statsData = data.data;

      setTotalAppointment(String(statsData.total_bookings || 0) ?? "0");
      setPending(String(statsData.bookings_by_status.pending || 0) ?? "0");
      setCompleted(String(statsData.bookings_by_status.confirmed || 0) ?? "0");
      setCancelled(String(statsData.bookings_by_status.attended || 0) ?? "0");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load stats");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setStatsLoading(false);
    }
  }, [navigate]);

  // === FETCH BOOKINGS WITH FILTERS ===
  const fetchBookings = useCallback(
    async (page: number) => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setTableLoading(true);

        const params: any = { page, per_page: perPage };
        if (search.trim()) params.search = search.trim();
        if (statusFilter) params.status = statusFilter;
        if (fromDate) params.from_date = fromDate;
        if (toDate) params.to_date = toDate;

        const { data } = await axios.get(`${API_URL}/bookings`, {
          params,
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(data.data?.data || []);
        setTotal(data.data?.total || 0);
        setCurrentPage(page);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load bookings");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setTableLoading(false);
      }
    },
    [navigate, search, statusFilter, fromDate, toDate]
  );

  const handleApplyFilters = () => fetchBookings(1);
  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
    fetchBookings(1);
  };

  // === MODAL HANDLERS ===
  const handleView = async (booking: Booking) => {
    setViewBooking(booking);
    // const token = localStorage.getItem("token");
    // if (!token) return;
    // try {
    //   const { data } = await axios.get(`${API_URL}/bookings/${booking.id}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    // } catch {
    //   toast.error("Failed to load details");
    // }
  };

  const handleEdit = (booking: Booking) => setEditBooking({ ...booking });

  const saveEdit = async () => {
    if (!editBooking) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.put(`${API_URL}/bookings/${editBooking.id}`, editBooking, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking updated");
      setEditBooking(null);
      fetchBookings(currentPage);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`${API_URL}/bookings/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking deleted");
      setDeleteId(null);
      fetchBookings(currentPage);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  // === TABLE COLUMNS ===
  const columns = [
    // { 
    //   key: "1" as const, 
    //   header: "S/N",
    //   render: () => (
    //     <span className="font-medium! font-[Raleway]! whitespace-nowrap" style={{ color: "var(--primary-color)" }}>
    //       {String(x+=1).padStart(3, "0")}
    //     </span>
    //   ),
    // },
    { key: "name" as const, header: "Name" },
    { key: "email" as const, header: "Email" },
    { key: "phone" as const, header: "Phone" },
    {
      key: "booking_date" as const,
      header: "Date",
      render: (b: Booking) => (
        <span className="font-medium! font-[Raleway]! whitespace-nowrap" style={{ color: "var(--primary-color)" }}>
          {format(new Date(b.booking_date), "MMM dd, yyyy")}
        </span>
      ),
    },
    { key: "booking_time" as const, header: "Time" },
    {
      key: "status" as const,
      header: "Status",
      render: (b: Booking) => (
        <span
          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-(--accent-color)/20 mx-auto"
          style={{
            backgroundColor:
              b.status === "pending"
                ? "var(--pending-bg)"
                : b.status === "confirmed"
                  ? "var(--another-green)"
                  : b.status === "attended"
                    ? "#dbeafe"
                    : b.status === "cancelled"
                      ? "var(--transparent-red)"
                      : "#f3f4f6",
            color:
              b.status === "pending"
                ? "var(--pending-color)"
                : b.status === "confirmed"
                  ? "var(--completed-color)"
                  : b.status === "attended"
                    ? "#1e40af"
                    : b.status === "cancelled"
                      ? "var(--cancelled-color)"
                      : "#4b5563",
            borderColor:
              b.status === "pending"
                ? "#d9d9d9"
                : b.status === "confirmed"
                  ? "#2f5318/50"
                  : b.status === "attended"
                    ? "#3b82f6/50"
                    : b.status === "cancelled"
                      ? "#dc2626/50"
                      : "#d1d5db/50",

          }}
        >
          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
        </span>
      ),
    },
    { key: "actions" as const, header: "Actions" },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--accent-color)" }}>
          Appointments
        </h1>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full transition hover:scale-105" style={{ backgroundColor: "var(--pink-color)" }}>
            <IoNotifications size={22} style={{ color: "var(--primary-color)" }} />
          </div>
          <div className="p-2.5 rounded-full transition hover:scale-105" style={{ backgroundColor: "var(--pink-color)" }}>
            <FaRegUserCircle size={22} style={{ color: "var(--primary-color)" }} />
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div
        className="rounded-2xl p-5 shadow-sm border"
        style={{
          backgroundColor: "var(--secondary-color)",
          borderColor: "var(--pink-color)",
        }}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-5 py-3.5 text-base rounded-xl focus:outline-none focus:ring-2 transition"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--pink-color)",
              color: "var(--accent-color)",
            }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-5 py-3.5 text-base rounded-xl focus:outline-none focus:ring-2 transition"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--pink-color)",
              color: "var(--accent-color)",
            }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="attended">Attended</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="flex gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-4 py-3.5 text-sm rounded-xl focus:outline-none focus:ring-2 transition"
              style={{
                backgroundColor: "white",
                border: "1px solid var(--pink-color)",
                color: "var(--accent-color)",
              }}
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-4 py-3.5 text-sm rounded-xl focus:outline-none focus:ring-2 transition"
              style={{
                backgroundColor: "white",
                border: "1px solid var(--pink-color)",
                color: "var(--accent-color)",
              }}
            />
          </div>

          <div className="flex gap-3 lg:ml-auto">
            <button
              onClick={handleApplyFilters}
              className="px-6 py-3.5 font-medium rounded-xl text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              Apply Filters
            </button>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-6 py-3.5 font-medium rounded-xl border transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  borderColor: "var(--pink-color)",
                  color: "var(--primary-color)",
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total", value: totalAppointment ?? 0, bg: "var(--primary-color)", text: "white" },
          { label: "Pending", value: pending ?? 0, bg: "white", text: "#00382B", border: true },
          { label: "Completed", value: completed ?? 0, bg: "var(--color-green)", text: "black" },
          { label: "Cancelled", value: cancelled ? cancelled : 0, bg: "var(--cancelled-color)", text: "black" },
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl flex flex-col justify-center shadow-sm transition hover:shadow-md ${stat.border ? "border" : ""
              }`}
            style={{
              backgroundColor: stat.bg,
              color: stat.text,
              borderColor: stat.border ? "var(--pink-color)" : undefined,
            }}
          >
            <span className="text-sm opacity-90">{stat.label}</span>
            <p className="text-3xl font-bold! font-[Raleway]! mt-1">
              {statsLoading ? "..." : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border" style={{ borderColor: "var(--pink-color)" }}>
        <DashboardTable
          data={bookings}
          columns={columns}
          loading={tableLoading}
          total={total}
          currentPage={currentPage}
          perPage={perPage}
          onPageChange={fetchBookings}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={(b) => setDeleteId(b.id)}
        />
      </div>

      {/* === MODALS (Professional & Branded) === */}
      {viewBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4" style={{ color: "var(--accent-color)" }}>
              Booking Details
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Name:</strong> {viewBooking.name}</p>
              <p><strong>Email:</strong> {viewBooking.email}</p>
              <p><strong>Phone:</strong> {viewBooking.phone}</p>
              <p><strong>Date:</strong> {format(new Date(viewBooking.booking_date), "PPP")}</p>
              <p><strong>Time:</strong> {viewBooking.booking_time}</p>
              <p><strong>Status:</strong> <span className="capitalize">{viewBooking.status}</span></p>
              {viewBooking.notes && <p><strong>Notes:</strong> {viewBooking.notes}</p>}
            </div>
            <button
              onClick={() => setViewBooking(null)}
              className="mt-6 w-full py-3 rounded-xl text-white font-medium transition hover:opacity-90"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {editBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4" style={{ color: "var(--accent-color)" }}>
              Edit Booking
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={editBooking.name}
                onChange={(e) => setEditBooking({ ...editBooking, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2"
                style={{
                  borderColor: "var(--pink-color)",
                }}
                placeholder="Name"
              />
              <select
                value={editBooking.status}
                onChange={(e) => setEditBooking({ ...editBooking, status: e.target.value as any })}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2"
                style={{
                  borderColor: "var(--pink-color)",
                }}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="attended">Attended</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={saveEdit}
                className="flex-1 py-3 rounded-xl text-white font-medium transition hover:opacity-90"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                Save
              </button>
              <button
                onClick={() => setEditBooking(null)}
                className="flex-1 py-3 rounded-xl border font-medium transition hover:bg-gray-50"
                style={{
                  borderColor: "var(--pink-color)",
                  color: "var(--primary-color)",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--accent-color)" }}>
              Delete Booking?
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--accent-color)" }}>
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-medium transition hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 rounded-xl border font-medium transition hover:bg-gray-50"
                style={{
                  borderColor: "var(--pink-color)",
                  color: "var(--primary-color)",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;