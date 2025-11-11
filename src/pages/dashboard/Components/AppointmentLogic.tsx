// src/pages/Appointments.tsx
import React, { useEffect, useState, useCallback } from "react";
import { IoSearch, IoNotifications } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import DashboardTable from "./DashboardTable";
import axios from "axios";
import { toast } from "sonner";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface BookingStats {
  total_bookings: number;
  bookings_by_status: {
    pending: number;
    confirmed: number;
    attended: number;
  };
  total_revenue: string;
}

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  notes?: string;
  status: "pending" | "confirmed" | "attended";
  created_at: string;
  updated_at: string;
}

export default function Appointments() {
  const navigate = useNavigate();

  // UI
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  // Data
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
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
      const { data } = await axios.get(`${API_URL}bookings/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(data.data);
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

  // === FETCH BOOKINGS (PAGINATED BY BACKEND) ===
  const fetchBookings = useCallback(
    async (page: number) => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setTableLoading(true);
        const { data } = await axios.get(`${API_URL}bookings`, {
          params: { page, per_page: perPage },
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
    [navigate]
  );

  // === VIEW ===
  const handleView = async (booking: Booking) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await axios.get(`${API_URL}bookings/${booking.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setViewBooking(data.data);
    } catch {
      toast.error("Failed to load details");
    }
  };

  // === EDIT ===
  const handleEdit = (booking: Booking) => setEditBooking({ ...booking });

  const saveEdit = async () => {
    if (!editBooking) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.put(`${API_URL}bookings/${editBooking.id}`, editBooking, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking updated");
      setEditBooking(null);
      fetchBookings(currentPage);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  // === DELETE ===
  const confirmDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`${API_URL}bookings/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking deleted");
      setDeleteId(null);
      fetchBookings(currentPage);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  // === AUTO-REFRESH STATS ===
  useEffect(() => {
    const interval = setInterval(fetchStats, 10_000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  // === TABLE COLUMNS ===
  const columns = [
    { key: "id" as const, header: "ID" },
    { key: "name" as const, header: "Name" },
    { key: "email" as const, header: "Email" },
    { key: "phone" as const, header: "Phone" },
    {
      key: "booking_date" as const,
      header: "Date",
      render: (b: Booking) => format(new Date(b.booking_date), "MMM dd, yyyy"),
    },
    { key: "booking_time" as const, header: "Time" },
    {
      key: "status" as const,
      header: "Status",
      render: (b: Booking) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            b.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : b.status === "confirmed"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
        </span>
      ),
    },
    { key: "actions" as const, header: "Actions" },
  ];

  return (
    <div className="w-full flex flex-col space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h2 className="font-bold text-2xl">Appointments</h2>
        <div className="flex space-x-3">
          <div className="flex gap-2">
            <div className="flex items-center border rounded-full p-2 md:border-[var(--primary-color)]/30 bg-white">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="hidden md:flex flex-1 outline-none px-1 bg-transparent"
              />
              <IoSearch size={20} className="text-gray-500" />
            </div>
            <div className="flex items-center border rounded-full p-2 md:border-[var(--primary-color)]/30 bg-white">
              <input
                type="text"
                placeholder="Filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="hidden md:flex flex-1 outline-none px-1 bg-transparent"
              />
              <MdFilterList size={20} className="text-gray-500" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="p-3 rounded-full bg-[var(--pink-color)]">
              <IoNotifications size={25} className="text-[var(--primary-color)]" />
            </div>
            <div className="p-3 rounded-full bg-[var(--pink-color)]">
              <FaRegUserCircle size={25} className="text-[var(--primary-color)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
        <div className="bg-[var(--primary-color)] text-white p-3 rounded-xl flex flex-col">
          <span className="text-sm">Total Appointments</span>
          <p className="text-2xl font-bold">{statsLoading ? "..." : stats?.total_bookings || 0}</p>
        </div>
        <div className="bg-white p-3 rounded-xl flex flex-col border">
          <span className="text-sm text-gray-500">Pending</span>
          <p className="text-2xl font-bold text-[#00382B]">{statsLoading ? "..." : stats?.bookings_by_status.pending || 0}</p>
        </div>
        <div className="bg-[var(--color-green)] p-3 rounded-xl flex flex-col">
          <span className="text-sm text-black">Confirmed</span>
          <p className="text-2xl font-bold text-black">{statsLoading ? "..." : stats?.bookings_by_status.confirmed || 0}</p>
        </div>
        <div className="bg-[var(--cancelled-color)] p-3 rounded-xl flex flex-col">
          <span className="text-sm text-black">Attended</span>
          <p className="text-2xl font-bold text-black">{statsLoading ? "..." : stats?.bookings_by_status.attended || 0}</p>
        </div>
      </div>

      {/* Table with Backend Pagination */}
      <div>
        <DashboardTable
          data={bookings}
          columns={columns}
          loading={tableLoading}
          total={total}
          currentPage={currentPage}
          perPage={perPage}
          onPageChange={fetchBookings} // <-- Backend handles page change
          onView={handleView}
          onEdit={handleEdit}
          onDelete={(b) => setDeleteId(b.id)}
        />
      </div>

      {/* VIEW MODAL */}
      {viewBooking && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Booking Details</h3>
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
              className="mt-6 w-full bg-[var(--primary-color)] text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Edit Booking</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={editBooking.name}
                onChange={(e) => setEditBooking({ ...editBooking, name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Name"
              />
              <select
                value={editBooking.status}
                onChange={(e) => setEditBooking({ ...editBooking, status: e.target.value as any })}
                className="w-full p-2 border rounded"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="attended">Attended</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={saveEdit} className="flex-1 bg-[var(--primary-color)] text-white py-2 rounded-lg">
                Save
              </button>
              <button onClick={() => setEditBooking(null)} className="flex-1 border py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-3">Delete Booking?</h3>
            <p className="text-sm text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={confirmDelete} className="flex-1 bg-red-600 text-white py-2 rounded-lg">
                Delete
              </button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}