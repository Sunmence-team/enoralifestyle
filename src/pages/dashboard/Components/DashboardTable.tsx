// src/components/DashboardTable.tsx
import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface Column<T> {
  key: keyof T | "image" | "actions" | "status";
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DashboardTableProps<T extends { id: number }> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export default function DashboardTable<T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  loading = false,
  emptyMessage = "No data found.",
}: DashboardTableProps<T>) {
  if (loading) {
    return (
      <div className="p-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return <p className="text-center py-20 text-gray-500 text-lg">{emptyMessage}</p>;
  }

  return (
    <div className="w-full flex flex-col items-center py-4">
      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className="py-3 px-6 uppercase tracking-wider text-sm font-semibold text-gray-700"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b hover:bg-gray-50 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-[var(--light-primary)]"
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key as string} className="py-4 px-6">
                    {col.render ? (
                      col.render(item)
                    ) : col.key === "image" ? (
                      <img
                        src={
                          (item as any).image
                            ? `${import.meta.env.VITE_API_IMAGE_URL}${(item as any).image.replace(/^public\//, "")}`
                            : "/placeholder.jpg"
                        }
                        alt="img"
                        className="w-8 h-8 object-cover rounded-lg shadow"
                        onError={(e) => ((e.target as HTMLImageElement).src = "/placeholder.jpg")}
                      />
                    ) : col.key === "actions" ? (
                      <div className="flex justify-center space-x-5 text-[var(--primary-color)]">
                        {onView && (
                          <button
                            onClick={() => onView(item)}
                            className="cursor-pointer hover:text-blue-600 transition"
                            title="View"
                          >
                            <FaEye size={18} />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="cursor-pointer hover:text-green-600 transition"
                            title="Edit"
                          >
                            <FaEdit size={18} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="cursor-pointer hover:text-red-600 transition"
                            title="Delete"
                          >
                            <FaTrash size={18} />
                          </button>
                        )}
                      </div>
                    ) : col.key === "status" ? (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          String((item as any)[col.key]) === "Completed"
                            ? "bg-green-100 text-green-800"
                            : String((item as any)[col.key]) === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : String((item as any)[col.key]) === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {String((item as any)[col.key])}
                      </span>
                    ) : (
                      String((item as any)[col.key])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination - Your exact design */}
      <div className="flex items-center justify-center space-x-4 mt-6">
        <button className="p-2 text-gray-600 hover:text-black disabled:opacity-50" disabled>
          <FaAngleLeft />
        </button>
        <button className="w-8 h-8 flex items-center justify-center font-bold bg-[var(--primary-color)] text-white rounded-lg">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-200 rounded-lg">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-200 rounded-lg">
          3
        </button>
        <span className="text-gray-500">...</span>
        <button className="p-2 text-gray-600 hover:text-black">
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}