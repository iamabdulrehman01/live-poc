"use client";

import React, { useState, useEffect } from "react";
import { Check, X, Shield, Search, RefreshCw, DollarSign, Users, Landmark, Download, Trash2, KeyRound } from "lucide-react";

interface Order {
  orderId: string;
  fullName: string;
  email: string;
  phone: string;
  selectedProgram: string;
  collegeName: string;
  notes: string;
  amount: number;
  paymentStatus: "pending" | "success" | "failed";
  createdAt: string;
}

export default function AdminDashboard() {
  // Authentication states
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Orders list states
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Clear database verification states
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearPassword, setClearPassword] = useState("");
  const [clearError, setClearError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin-orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      const timer = setTimeout(() => {
        fetchOrders();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isAuthorized]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPassword === "Abdul") {
      setIsAuthorized(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const handleUpdateStatus = async (orderId: string, status: "success" | "failed") => {
    try {
      const res = await fetch(`/api/payment-webhook?orderId=${orderId}&status=${status}`);
      if (res.ok) {
        setOrders((prev) =>
          prev.map((ord) =>
            ord.orderId === orderId ? { ...ord, paymentStatus: status } : ord
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDownload = () => {
    window.open("/api/download-orders", "_blank");
  };

  const handleClearHistory = async (e: React.FormEvent) => {
    e.preventDefault();
    setClearError("");

    try {
      const res = await fetch("/api/clear-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: clearPassword }),
      });

      if (res.ok) {
        setOrders([]);
        setShowClearModal(false);
        setClearPassword("");
      } else {
        const data = await res.json();
        setClearError(data.error || "Verification failed");
      }
    } catch (error) {
      console.error("Error clearing history:", error);
      setClearError("Failed to clear transaction history.");
    }
  };

  // Stats calculation
  const totalRegistrations = orders.length;
  const pendingVerification = orders.filter((o) => o.paymentStatus === "pending").length;
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "success")
    .reduce((sum, o) => sum + o.amount, 0);

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const term = searchQuery.toLowerCase();
    return (
      o.fullName.toLowerCase().includes(term) ||
      o.email.toLowerCase().includes(term) ||
      o.orderId.toLowerCase().includes(term) ||
      o.collegeName.toLowerCase().includes(term) ||
      o.selectedProgram.toLowerCase().includes(term)
    );
  });

  // Render Login Page when not authorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#030712] text-[#f1f5f9] flex items-center justify-center p-4">
        {/* Ambient mesh background blobs */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full mesh-blob-cyan pointer-events-none opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full mesh-blob-purple pointer-events-none opacity-40" />

        <div className="relative w-full max-w-md bg-[#070b13]/85 border border-[#1e293b]/70 rounded-3xl p-8 backdrop-blur-lg shadow-2xl z-10">
          <div className="flex flex-col items-center text-center gap-2 mb-8">
            <div className="p-3.5 rounded-2xl bg-[#22d3ee]/10 border border-[#22d3ee]/20 text-[#22d3ee] mb-2">
              <KeyRound size={28} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-white font-jakarta">
              C2C Control Center
            </h1>
            <p className="text-xs text-[#64748b] font-medium leading-relaxed max-w-xs">
              This panel is restricted to the CEO & Founders of Campus to Corporate.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="loginPassword" className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider font-jakarta">
                Admin Password
              </label>
              <input
                id="loginPassword"
                type="password"
                placeholder="Enter password..."
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-[#090d16]/80 text-[#f1f5f9] border ${loginError ? "border-red-500" : "border-[#1e293b] focus:border-[#22d3ee]"
                  } placeholder-[#475569] focus:outline-none transition-all`}
                required
              />
              {loginError && (
                <span className="text-xs font-semibold text-red-400 mt-1">{loginError}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#22d3ee] hover:bg-[#06b6d4] text-black font-bold text-sm rounded-xl cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
            >
              Authenticate Control Panel
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1e293b]/40"></div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-[#f1f5f9] p-6 md:p-10 font-sans relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1e293b]/50 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#22d3ee]/10 border border-[#22d3ee]/20 text-[#22d3ee]">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white font-jakarta">
                C2C Control Center
              </h1>
              <p className="text-xs text-[#64748b] font-medium mt-0.5">
                Admin Payment Verification & Order Management Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-[#0d1323] border border-[#1e293b] rounded-xl hover:bg-slate-900 text-white cursor-pointer transition-all duration-300 w-full md:w-auto"
            >
              <Download size={14} />
              <span>Export Excel</span>
            </button>
            <button
              onClick={() => {
                setClearError("");
                setClearPassword("");
                setShowClearModal(true);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-red-500/10 border border-red-500/30 rounded-xl hover:bg-red-500 hover:text-white text-red-400 cursor-pointer transition-all duration-300 w-full md:w-auto"
            >
              <Trash2 size={14} />
              <span>Clear History</span>
            </button>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center justify-center p-2.5 bg-[#0d1323] border border-[#1e293b] rounded-xl hover:bg-slate-900 text-white cursor-pointer transition-all duration-300 disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#090d16]/80 border border-[#1e293b]/50 backdrop-blur-md flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#64748b] font-extrabold uppercase tracking-widest font-jakarta">
                Total Orders
              </span>
              <h3 className="text-3xl font-extrabold text-white mt-1 font-mono">
                {totalRegistrations}
              </h3>
            </div>
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Users size={22} />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#090d16]/80 border border-[#1e293b]/50 backdrop-blur-md flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#64748b] font-extrabold uppercase tracking-widest font-jakarta">
                Pending Verification
              </span>
              <h3 className="text-3xl font-extrabold text-amber-400 mt-1 font-mono">
                {pendingVerification}
              </h3>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Landmark size={22} />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#090d16]/80 border border-[#1e293b]/50 backdrop-blur-md flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#64748b] font-extrabold uppercase tracking-widest font-jakarta">
                Total Verified Income
              </span>
              <h3 className="text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </h3>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <DollarSign size={22} />
            </div>
          </div>
        </div>

        {/* Filters/Search block */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#070b13] border border-[#1e293b] max-w-md">
          <Search size={16} className="text-[#475569]" />
          <input
            type="text"
            placeholder="Search by student, email, order ID, program..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-sm text-white placeholder-[#475569] focus:outline-none w-full"
          />
        </div>

        {/* Orders Table Card */}
        <div className="rounded-2xl border border-[#1e293b]/60 bg-[#070b13]/60 overflow-hidden shadow-2xl">
          {loading ? (
            <div className="py-20 text-center flex flex-col items-center gap-3">
              <RefreshCw size={24} className="animate-spin text-cyan-400" />
              <span className="text-sm text-[#64748b] font-jakarta">Loading registered cohorts data...</span>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-20 text-center text-[#64748b] text-sm font-jakarta">
              {searchQuery ? "No records match your search criteria." : "No program orders registered yet."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0b101c]/80 border-b border-[#1e293b] text-xs font-extrabold text-[#64748b] uppercase tracking-wider font-jakarta">
                    <th className="py-4 px-6">Order Info</th>
                    <th className="py-4 px-6">Student Details</th>
                    <th className="py-4 px-6">Selected Program</th>
                    <th className="py-4 px-6">College / University</th>
                    <th className="py-4 px-6 text-right">Fee</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center">Verify Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e293b]/40 text-sm">
                  {filteredOrders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-[#0d1323]/20 transition-all">
                      <td className="py-4 px-6">
                        <span className="font-bold text-white block font-mono">{order.orderId}</span>
                        <span className="text-[10px] text-[#475569] mt-0.5 block font-mono">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-white block font-jakarta">{order.fullName}</span>
                        <span className="text-xs text-[#64748b] block">{order.email}</span>
                        <span className="text-[11px] text-[#64748b] block font-mono">{order.phone}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-white font-medium max-w-[200px] inline-block">
                          {order.selectedProgram}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[#94a3b8] text-xs max-w-[180px] inline-block truncate" title={order.collegeName}>
                          {order.collegeName}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-[#f1f5f9] font-mono">
                        ₹{order.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-4 px-6">
                        {order.paymentStatus === "pending" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.05)] font-jakarta">
                            Pending
                          </span>
                        )}
                        {order.paymentStatus === "success" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.05)] font-jakarta">
                            Paid
                          </span>
                        )}
                        {order.paymentStatus === "failed" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.05)] font-jakarta">
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {order.paymentStatus === "pending" ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleUpdateStatus(order.orderId, "success")}
                              className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 cursor-pointer transition-all duration-300"
                              title="Mark as Paid"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order.orderId, "failed")}
                              className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer transition-all duration-300"
                              title="Reject / Unpaid"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#475569] font-bold uppercase tracking-wider font-mono">
                            Verified
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Clear Database Password Verification Modal Overlay */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/90 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#070b13] border border-[#1e293b] rounded-3xl p-6 shadow-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[#1e293b]/40 pb-4">
              <h3 className="text-lg font-bold text-white font-jakarta">Confirm Wipe History</h3>
              <button
                onClick={() => setShowClearModal(false)}
                className="p-1 text-[#64748b] hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#94a3b8] leading-relaxed font-jakarta">
              Warning: This will permanently erase all order files and transaction history from the database. This action is irreversible.
            </p>

            <form onSubmit={handleClearHistory} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="clearPassInput" className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider font-jakarta">
                  Enter Password to Verify Action
                </label>
                <input
                  id="clearPassInput"
                  type="password"
                  placeholder="Enter admin password..."
                  value={clearPassword}
                  onChange={(e) => setClearPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-[#030712] text-[#f1f5f9] border ${clearError ? "border-red-500" : "border-[#1e293b] focus:border-[#22d3ee]"
                    } placeholder-[#475569] focus:outline-none transition-all`}
                  required
                  autoFocus
                />
                {clearError && (
                  <span className="text-xs font-semibold text-red-400 mt-1">{clearError}</span>
                )}
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setShowClearModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#cbd5e1] hover:text-white bg-[#0d1323] hover:bg-slate-900 border border-[#1e293b] rounded-xl cursor-pointer font-jakarta"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl cursor-pointer font-jakarta"
                >
                  Confirm Clear Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
