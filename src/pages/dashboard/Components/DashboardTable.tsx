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
  total?: number;
  currentPage?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
}

export default function DashboardTable<T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  loading = false,
  emptyMessage = "No data found.",
  total = 0,
  currentPage = 1,
  perPage = 10,
  onPageChange,
}: DashboardTableProps<T>) {
  const totalPages = Math.ceil(total / perPage) || 1;

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
      <div className="bg-white rounded-xl shadow-sm w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className="py-6 px-6 uppercase tracking-wider text-sm font-semibold text-gray-700"
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
                  <td key={col.key as string} className="py-4 px-6 align-middle">
                    {col.render ? (
                      col.render(item)
                    ) : col.key === "image" ? (
                      <img
                        src={
                          (item as any).image
                            ? `${import.meta.env.VITE_IMAGE_BASE_URL}/${(item as any)?.image}`
                            : "https://placehold.co/600x400/png"
                        }
                        alt="img"
                        className="w-12 h-12 object-cover rounded-lg shadow"
                        onError={(e) => ((e.target as HTMLImageElement).src = "https://placehold.co/600x400/png")}
                      />
                    ) : col.key === "actions" ? (
                      <div className="flex justify-center space-x-5 text-[var(--primary-color)]">
                        {onView && (
                          <button onClick={() => onView(item)} className="hover:text-blue-600 transition" title="View">
                            <FaEye size={18} />
                          </button>
                        )}
                        {onEdit && (
                          <button onClick={() => onEdit(item)} className="hover:text-green-600 transition" title="Edit">
                            <FaEdit size={18} />
                          </button>
                        )}
                        {onDelete && (
                          <button onClick={() => onDelete(item)} className="hover:text-red-600 transition" title="Delete">
                            <FaTrash size={18} />
                          </button>
                        )}
                      </div>
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

      {/* Working Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-3 mt-8">
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FaAngleLeft size={18} />
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) pageNum = i + 1;
            else if (currentPage <= 3) pageNum = i + 1;
            else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
            else pageNum = currentPage - 2 + i;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange?.(pageNum)}
                className={`w-10 h-10 rounded-lg font-bold transition ${
                  currentPage === pageNum
                    ? "bg-[var(--primary-color)] text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {pageNum}
              </button>
            );
          }).filter(Boolean)}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="text-gray-500">...</span>
              <button
                onClick={() => onPageChange?.(totalPages)}
                className="w-10 h-10 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FaAngleRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}