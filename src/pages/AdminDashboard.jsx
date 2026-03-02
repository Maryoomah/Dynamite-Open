import { useState, useEffect } from "react";
import ParticipantTable from "../components/ParticipantTable";
import CodeVerificationModal from "../components/CodeVerificationModal";
import { participantService } from "../services/participantService";
import Footer from "../components/footer";
import SEO from "../components/SEO";
import { FaPlus, FaTrophy, FaUserShield } from "react-icons/fa";

import AdminParticipantModal from "../components/AdminParticipantModal";

export default function AdminDashboard() {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  const [activeTab, setActiveTab] = useState("Main Event");

  const loadData = async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    else setIsRefreshing(true);

    try {
        const data = await participantService.getParticipants();
        setParticipants(data);
    } catch (error) {
        console.error("Failed to load participants:", error);
    } finally {
        setIsLoading(false);
        setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // Small delay to avoid synchronous setState in effect warning
    const timer = setTimeout(() => {
        loadData(true);
    }, 0);
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(() => {
        loadData(false);
    }, 5000);

    return () => {
        clearTimeout(timer);
        clearInterval(interval);
    };
  }, []);

  const refreshData = () => {
    loadData(false);
  };

  const handleActionClick = (type, data) => {
    setPendingAction({ type, data });
    setIsVerifyModalOpen(true);
  };

  const handleVerify = async (code) => {
    if (participantService.verifyAdminCode(code)) {
      const { type, data } = pendingAction;
      
      try {
        if (type === "DELETE") {
          await participantService.deleteParticipant(data);
          refreshData();
          setIsVerifyModalOpen(false);
          setPendingAction(null);
        } else if (type === "UPDATE_STATUS") {
          await participantService.updateParticipant(data.id, { paymentStatus: data.status });
          refreshData();
          setIsVerifyModalOpen(false);
          setPendingAction(null);
        } else if (type === "ADD") {
          setIsVerifyModalOpen(false);
          setSelectedParticipant(null);
          setIsParticipantModalOpen(true);
        } else if (type === "EDIT") {
          setIsVerifyModalOpen(false);
          setSelectedParticipant(data);
          setIsParticipantModalOpen(true);
        }
      } catch (error) {
          console.error("Action failed", error);
      }
      return true;
    }
    return false;
  };

  const handleSaveParticipant = async (formData) => {
    try {
      if (selectedParticipant) {
        await participantService.updateParticipant(selectedParticipant.id, formData);
      } else {
        await participantService.addParticipant(formData);
      }
      setIsParticipantModalOpen(false);
      setPendingAction(null);
      refreshData();
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  const filteredParticipants = participants.filter(p => p.category === activeTab);

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      <SEO title="Admin Dashboard" description="Manage event participants and payment statuses." />

      {/* ADMIN HERO */}
      <section className="relative py-16 sm:py-24 bg-green-950 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-900/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/50 rounded-full border border-green-800/50 mb-6">
                <FaUserShield className="text-yellow-500" />
                <span className="text-yellow-500 font-black text-[10px] uppercase tracking-widest mt-0.5">Admin Control Panel</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                ControlCenter
              </h1>
            </div>
            
            <button
              onClick={() => handleActionClick("ADD", {})}
              className="px-8 py-5 bg-yellow-500 text-green-950 font-black rounded-2xl shadow-xl shadow-yellow-500/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs flex items-center gap-3 cursor-pointer"
            >
              <FaPlus />
              New Entry
            </button>
          </div>
        </div>
      </section>

      {/* DASHBOARD CONTENT */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {[
                    { label: "Revenue Est.", value: `₦${(participants.reduce((acc, p) => acc + (p.paymentStatus === 'Paid' ? (p.amount || 0) : 0), 0)).toLocaleString()}`, icon: <FaTrophy className="text-xl" />, color: "bg-blue-50 text-blue-600" },
                    { label: "Active Users", value: participants.length, icon: <div className="h-2 w-2 rounded-full bg-current animate-pulse" />, color: "bg-green-50 text-green-700" },
                    { label: "Needs Payment", value: participants.filter(p => p.paymentStatus === 'Pending').length, icon: "!", color: "bg-yellow-50 text-yellow-700" },
                    { label: "System Status", value: "Online", icon: "✓", color: "bg-gray-50 text-gray-400" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">{stat.label}</span>
                            <span className="text-xl font-black text-green-950">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-2 bg-green-800 rounded-full" />
                        <h2 className="text-2xl font-black text-green-950 uppercase tracking-tight">Records Management</h2>
                    </div>

                    <div className="flex items-center gap-2">
                        {isRefreshing && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100 animate-pulse">
                                <div className="h-2 w-2 bg-green-600 rounded-full" />
                                <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Refreshing Data</span>
                            </div>
                        )}
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest hidden sm:block">Global Sync Enabled</p>
                    </div>
                </div>

                <div className="flex p-1.5 bg-gray-200/50 rounded-[2rem] w-full max-w-2xl">
                    {["Main Event", "School Registration"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-[1.5rem] transition-all cursor-pointer ${activeTab === tab ? 'bg-white text-green-950 shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab === "Main Event" ? "Individual Players" : "Verified Schools"}
                        </button>
                    ))}
                </div>

                <ParticipantTable 
                    participants={filteredParticipants} 
                    isAdmin={true}
                    isLoading={isLoading}
                    onDelete={(id) => handleActionClick("DELETE", id)}
                    onUpdateStatus={(id, status) => handleActionClick("UPDATE_STATUS", { id, status })}
                    onEdit={(p) => handleActionClick("EDIT", p)}
                />
            </div>
          </div>
        </div>
      </section>

      <CodeVerificationModal 
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        onVerify={handleVerify}
        actionTitle={pendingAction?.type.replace('_', ' ') || ""}
      />

      <AdminParticipantModal
        isOpen={isParticipantModalOpen}
        onClose={() => setIsParticipantModalOpen(false)}
        onSave={handleSaveParticipant}
        participant={selectedParticipant}
      />

      <Footer />
    </main>
  );
}
