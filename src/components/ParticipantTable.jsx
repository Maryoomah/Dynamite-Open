import { useState } from "react";
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ParticipantTable({ participants, isAdmin, onEdit, onDelete, onUpdateStatus, isLoading }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // SKELETON ROW COMPONENT
  const SkeletonRow = () => (
    <tr className="animate-pulse">
        <td className="px-6 py-5">
            <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-gray-100 rounded-full" />
                <div className="h-3 w-48 bg-gray-50 rounded-full" />
            </div>
        </td>
        <td className="px-6 py-5">
            <div className="flex flex-col gap-2">
                <div className="h-4 w-24 bg-gray-100 rounded-full" />
                <div className="h-3 w-16 bg-gray-50 rounded-full" />
            </div>
        </td>
        <td className="px-6 py-5">
            <div className="h-4 w-20 bg-gray-100 rounded-full" />
        </td>
        <td className="px-6 py-5">
            <div className="h-6 w-16 bg-gray-100 rounded-full" />
        </td>
        {isAdmin && <td className="px-6 py-5 text-right"><div className="h-8 w-24 bg-gray-100 rounded-xl ml-auto" /></td>}
    </tr>
  );

  // Filtering Logic
  const filtered = participants.filter((p) => {
    const matchesSearch = 
      (p.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.schoolName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.phone || "").includes(searchTerm);
    
    const matchesStatus = statusFilter === "All" || p.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const StatusPill = ({ status }) => {
    const colors = {
      "Paid": "bg-green-100 text-green-700 border-green-200",
      "Pending": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Cancelled": "bg-red-100 text-red-700 border-red-200"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${colors[status] || "bg-gray-100"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative w-full lg:max-w-sm">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search registrations..."
            value={searchTerm}
            disabled={isLoading}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-600/10 focus:bg-white transition-all text-sm font-medium disabled:opacity-50"
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <select
            value={statusFilter}
            disabled={isLoading}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 lg:flex-none pl-4 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-4xl border border-gray-100 shadow-xl overflow-hidden overflow-x-auto ring-1 ring-gray-50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-5 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">
                {participants[0]?.category === "School Registration" ? "Institution" : "Participant"}
              </th>
              <th className="px-6 py-5 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">
                {participants[0]?.category === "School Registration" ? "Contact/Location" : "Category"}
              </th>
              {participants[0]?.category !== "School Registration" && (
                <th className="px-6 py-5 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Rating</th>
              )}
              {isAdmin && <th className="px-6 py-5 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Amount</th>}
              <th className="px-6 py-5 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Status</th>
              {isAdmin && <th className="px-6 py-5 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : paginatedData.length > 0 ? (
              paginatedData.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-green-950 text-base">
                        {p.category === "School Registration" ? p.schoolName : `${p.surname || ''} ${p.fullName}`}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {p.email} • {p.phone}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                   <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-700">
                        {p.category === "School Registration" ? (p.contactPerson || "N/A") : p.category}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                        {p.category === "School Registration" ? (p.schoolAddress || "N/A") : p.subCategory}
                      </span>
                    </div>
                  </td>
                  {p.category !== "School Registration" && (
                    <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-black ring-1 ring-green-100">
                        {p.rating || 0}
                        </span>
                    </td>
                  )}
                  {isAdmin && (
                    <td className="px-6 py-5">
                      <span className="text-sm font-black text-green-950">
                        ₦{(p.amount || 0).toLocaleString()}
                      </span>
                    </td>
                  )}
                  <td className="px-6 py-5">
                    <StatusPill status={p.paymentStatus} />
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onUpdateStatus(p.id, p.paymentStatus === 'Paid' ? 'Pending' : 'Paid')}
                          className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all cursor-pointer"
                          title="Toggle Status"
                        >
                          <svg size={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </button>
                        <button 
                          onClick={() => onEdit(p)}
                          className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                        >
                          <svg size={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button 
                          onClick={() => onDelete(p.id)}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all cursor-pointer"
                        >
                          <svg size={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-4 text-gray-400">
                    <div className="p-4 bg-gray-50 rounded-full">
                      <FaSearch size={32} />
                    </div>
                    <p className="font-black uppercase tracking-[0.2em] text-xs">No participants found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-3 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 disabled:opacity-30 transition-all cursor-pointer shadow-sm"
            >
              <FaChevronLeft size={14} className="text-green-900" />
            </button>
            <div className="flex items-center px-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <span className="text-xs font-black text-green-950">{currentPage} / {totalPages}</span>
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-3 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 disabled:opacity-30 transition-all cursor-pointer shadow-sm"
            >
              <FaChevronRight size={14} className="text-green-900" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
