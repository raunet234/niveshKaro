"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BusinessDashboardPage() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-surface-light pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Dashboard Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="font-heading font-bold text-2xl text-primary-950">
                                    🏢 Sharma Builders Pvt. Ltd.
                                </h1>
                                <span className="badge-verified">✅ Verified</span>
                            </div>
                            <p className="text-sm text-gray-500">
                                Premium Plan • Joined Jan 2026
                            </p>
                        </div>
                        <Link href="/business/listings/new" className="btn-green !py-3 !px-6 !rounded-xl">
                            + Create New Listing
                        </Link>
                    </div>

                    {/* Analytics Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                        {[
                            { icon: "👁️", label: "Total Views", value: "5,234", change: "+12%", color: "#3b82f6" },
                            { icon: "📞", label: "Total Inquiries", value: "67", change: "+23%", color: "#10b981" },
                            { icon: "⭐", label: "Avg Rating", value: "4.3/5", change: "", color: "#f59e0b" },
                            { icon: "📋", label: "Active Listings", value: "3", change: "", color: "#8b5cf6" },
                            { icon: "📊", label: "This Month", value: "+23", change: "inquiries", color: "#ef4444" },
                        ].map((stat, i) => (
                            <div key={i} className="glass-card-light rounded-2xl p-5 card-hover">
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                                <div className="font-heading font-bold text-xl" style={{ color: stat.color }}>
                                    {stat.value}
                                </div>
                                {stat.change && (
                                    <div className="text-xs text-green-600 mt-1">{stat.change}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto mb-6 pb-2">
                        {[
                            { id: "overview", label: "📊 Overview" },
                            { id: "listings", label: "📋 My Listings" },
                            { id: "inquiries", label: "📞 Inquiries" },
                            { id: "analytics", label: "📈 Analytics" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all tap-target ${activeTab === tab.id
                                        ? "bg-primary-600 text-white"
                                        : "bg-white text-gray-700 border border-gray-200 hover:border-primary-300"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Views Chart Placeholder */}
                            <div className="glass-card-light rounded-2xl p-6">
                                <h3 className="font-heading font-semibold text-base text-primary-900 mb-4">
                                    📈 Views & Inquiries — Last 30 Days
                                </h3>
                                <div className="h-48 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl flex items-center justify-center">
                                    <div className="text-center text-gray-400">
                                        <span className="text-3xl block mb-2">📊</span>
                                        <span className="text-sm">Chart visualization here (Recharts)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Geographic Insights */}
                            <div className="glass-card-light rounded-2xl p-6">
                                <h3 className="font-heading font-semibold text-base text-primary-900 mb-4">
                                    🌍 Investor Locations
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { city: "Mumbai", count: 15, pct: 22 },
                                        { city: "Delhi", count: 12, pct: 18 },
                                        { city: "Patna", count: 10, pct: 15 },
                                        { city: "Bangalore", count: 8, pct: 12 },
                                        { city: "Kolkata", count: 6, pct: 9 },
                                    ].map((loc) => (
                                        <div key={loc.city} className="flex items-center gap-3">
                                            <span className="text-sm text-gray-700 w-24">{loc.city}</span>
                                            <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary-500 rounded-full"
                                                    style={{ width: `${loc.pct * 3}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-500 w-20 text-right">
                                                {loc.count} inquiries
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Listings Tab */}
                    {activeTab === "listings" && (
                        <div className="space-y-4">
                            {[
                                { title: "Green Valley Residential Project", status: "Active", views: 2340, inquiries: 45, rating: 4.2 },
                                { title: "Commercial Complex — Phase 2", status: "Active", views: 1890, inquiries: 18, rating: 4.0 },
                                { title: "Sharma Heights — Completed", status: "Fully Funded", views: 1004, inquiries: 4, rating: 4.5 },
                            ].map((listing, i) => (
                                <div key={i} className="glass-card-light rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-heading font-semibold text-base text-primary-900">{listing.title}</h3>
                                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                            <span>👁️ {listing.views} views</span>
                                            <span>📞 {listing.inquiries} inquiries</span>
                                            <span>⭐ {listing.rating}/5</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${listing.status === "Active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                            }`}>
                                            {listing.status}
                                        </span>
                                        <button className="btn-secondary !py-2 !px-3 !text-xs !rounded-lg">Edit</button>
                                        <button className="btn-secondary !py-2 !px-3 !text-xs !rounded-lg">View</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Inquiries Tab */}
                    {activeTab === "inquiries" && (
                        <div className="glass-card-light rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[600px]">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500">Investor</th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500">City</th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500">Listing</th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500">Date</th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500">Status</th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { name: "Rajesh Kumar", city: "Mumbai, MH", listing: "Green Valley", date: "Mar 5", status: "New" },
                                            { name: "Priya Singh", city: "Delhi", listing: "Green Valley", date: "Mar 4", status: "Contacted" },
                                            { name: "Amit Patel", city: "Ahmedabad, GJ", listing: "Commercial Phase 2", date: "Mar 3", status: "Meeting" },
                                            { name: "Sunita Devi", city: "Patna, BR", listing: "Green Valley", date: "Mar 2", status: "Invested" },
                                            { name: "Vikram Roy", city: "Kolkata, WB", listing: "Green Valley", date: "Mar 1", status: "New" },
                                        ].map((inq, i) => (
                                            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                                                <td className="p-4 text-sm font-medium text-primary-800">{inq.name}</td>
                                                <td className="p-4 text-sm text-gray-600">{inq.city}</td>
                                                <td className="p-4 text-sm text-gray-600">{inq.listing}</td>
                                                <td className="p-4 text-sm text-gray-500">{inq.date}</td>
                                                <td className="p-4">
                                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${inq.status === "New" ? "bg-yellow-100 text-yellow-700" :
                                                            inq.status === "Contacted" ? "bg-blue-100 text-blue-700" :
                                                                inq.status === "Meeting" ? "bg-purple-100 text-purple-700" :
                                                                    "bg-green-100 text-green-700"
                                                        }`}>
                                                        {inq.status}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex gap-2">
                                                        <button className="text-xs text-primary-600 hover:underline">📞 Call</button>
                                                        <button className="text-xs text-primary-600 hover:underline">📧 Email</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Analytics Tab */}
                    {activeTab === "analytics" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="glass-card-light rounded-2xl p-6">
                                <h3 className="font-heading font-semibold text-base text-primary-900 mb-4">
                                    📊 Inquiry Conversion Funnel
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { label: "Profile Views", value: 5234, pct: 100, color: "#3b82f6" },
                                        { label: "Listing Views", value: 3120, pct: 60, color: "#8b5cf6" },
                                        { label: "Inquiries Sent", value: 67, pct: 2, color: "#f59e0b" },
                                        { label: "Meetings Done", value: 12, pct: 0.2, color: "#10b981" },
                                        { label: "Invested", value: 4, pct: 0.08, color: "#059669" },
                                    ].map((step) => (
                                        <div key={step.label} className="flex items-center gap-3">
                                            <span className="text-sm w-32 text-gray-700">{step.label}</span>
                                            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{ width: `${Math.max(step.pct, 2)}%`, background: step.color }}
                                                />
                                            </div>
                                            <span className="text-sm font-bold w-16 text-right">{step.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-card-light rounded-2xl p-6">
                                <h3 className="font-heading font-semibold text-base text-primary-900 mb-4">
                                    📅 Monthly Trend
                                </h3>
                                <div className="h-48 bg-gradient-to-br from-primary-50 to-green-50 rounded-xl flex items-center justify-center">
                                    <span className="text-sm text-gray-400">Line chart with Recharts</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
