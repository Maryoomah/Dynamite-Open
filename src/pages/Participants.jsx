import { useState, useEffect } from "react";
import ParticipantTable from "../components/ParticipantTable";
import { participantService } from "../services/participantService";
import Footer from "../components/footer";
import SEO from "../components/SEO";

export default function Participants() {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const filteredParticipants = participants.filter(p => p.category === activeTab);

  const stats = [
    { label: "Total Registered", value: participants.length, color: "text-green-950" },
    { label: "Confirmed (Paid)", value: participants.filter(p => p.paymentStatus === 'Paid').length, color: "text-green-600" },
    { label: "Pending", value: participants.filter(p => p.paymentStatus === 'Pending').length, color: "text-yellow-600" },
  ];

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      <SEO title="Tournament Participants" description="View the registry of all participants registered for Dynamite Opens 5.0." />

      {/* PUBLIC HERO */}
      <section className="relative py-16 sm:py-24 bg-green-950 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-900/30 rounded-full blur-3xl -translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/50 rounded-full border border-green-800/50 mb-6">
                <div className="h-1.5 w-1.5 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-yellow-500 font-black text-[10px] uppercase tracking-widest mt-0.5">Live Registry</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                Tournament <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-400">Registry</span>
            </h1>
            <p className="max-w-2xl mx-auto text-green-100/60 font-medium text-sm sm:text-base leading-relaxed">
                Meet the minds competing for glory in Dynamite Opens 5.0. 
                Search and filter to find players or schools.
            </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12 sm:py-20 lg:-mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            
            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 animate-pulse">
                            <div className="h-2 w-20 bg-gray-100 rounded-full" />
                            <div className="h-8 w-12 bg-gray-50 rounded-full" />
                        </div>
                    ))
                ) : (
                    stats.map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 flex flex-col items-center justify-center gap-2 group hover:scale-[1.02] transition-transform">
                            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">{stat.label}</span>
                            <span className={`text-5xl font-black ${stat.color} tracking-tighter`}>{stat.value}</span>
                        </div>
                    ))
                )}
            </div>

            <div className="flex flex-col gap-10">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-2 bg-green-500 rounded-full" />
                    <h2 className="text-2xl font-black text-green-950 uppercase tracking-tight">Registry Database</h2>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex p-2 bg-gray-200/50 rounded-[2.5rem] w-full max-w-3xl">
                        {["Main Event", "School Registration"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    window.scrollTo({ top: 400, behavior: 'smooth' });
                                }}
                                className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-[2rem] transition-all cursor-pointer ${activeTab === tab ? 'bg-green-950 text-yellow-400 shadow-2xl shadow-green-950/40' : 'text-gray-400 hover:text-gray-600'}`}
                            > 
                                {tab === "Main Event" ? "Individual Players" : "Verified School Teams"}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between px-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Showing {filteredParticipants.length} {activeTab === "Main Event" ? 'Participants' : 'Schools'}
                        </p>
                        
                        {isRefreshing && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100 animate-pulse">
                                <div className="h-2 w-2 bg-green-600 rounded-full" />
                                <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Live Updating</span>
                            </div>
                        )}
                    </div>
                </div>

                <ParticipantTable 
                    participants={filteredParticipants} 
                    isAdmin={false} 
                    isLoading={isLoading}
                />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
