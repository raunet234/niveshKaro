"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ADMIN_TABS = [
    { id: "dashboard", label: "📊 Dashboard", icon: "📊" },
    { id: "businesses", label: "🏢 Businesses", icon: "🏢" },
    { id: "listings", label: "📋 Listings", icon: "📋" },
    { id: "users", label: "👥 Users", icon: "👥" },
    { id: "content", label: "📝 Content", icon: "📝" },
    { id: "revenue", label: "💰 Revenue", icon: "💰" },
];

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-surface-light pt-20">
                <div className="flex">
                    {/* Sidebar */}
                    <aside className="hidden lg:block w-60 bg-white border-r border-gray-100 min-h-[calc(100vh-5rem)] sticky top-20 p-4">
                        <div className="mb-6">
                            <h2 className="font-heading font-bold text-sm text-primary-400 uppercase tracking-wider mb-4 px-3">
                                Admin Panel
                            </h2>
                            <nav className="space-y-1">
                                {ADMIN_TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all tap-target ${activeTab === tab.id
                                                ? "bg-primary-50 text-primary-700"
                                                : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Mobile Tabs */}
                    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 flex items-center gap-1 p-2 overflow-x-auto">
                        {ADMIN_TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium ${activeTab === tab.id
                                        ? "bg-primary-600 text-white"
                                        : "text-gray-500"
                                    }`}
                            >
                                {tab.icon}
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 p-6 pb-20 lg:pb-6">
                        {/* Dashboard */}
                        {activeTab === "dashboard" && (
                            <div>
                                <h1 className="font-heading font-bold text-2xl text-primary-950 mb-6">
                                    Platform Dashboard
                                </h1>

                                {/* Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                                    {[
                                        { label: "Investors", value: "10,234", change: "+134", color: "#3b82f6" },
                                        { label: "Businesses", value: "523", change: "+12", color: "#10b981" },
                                        { label: "Active Listings", value: "847", change: "+28", color: "#8b5cf6" },
                                        { label: "Inquiries", value: "3,456", change: "+89", color: "#f59e0b" },
                                        { label: "Revenue (Mo)", value: "₹4.2L", change: "+15%", color: "#ef4444" },
                                        { label: "New Today", value: "45", change: "users", color: "#06b6d4" },
                                    ].map((stat, i) => (
                                        <div key={i} className="glass-card-light rounded-2xl p-4">
                                            <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                                            <div className="font-heading font-bold text-lg" style={{ color: stat.color }}>
                                                {stat.value}
                                            </div>
                                            <div className="text-xs text-green-600">{stat.change}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Top Cities & States */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                    <div className="glass-card-light rounded-2xl p-6">
                                        <h3 className="font-heading font-semibold text-base text-primary-900 mb-4">
                                            🏙️ Top 10 Active Cities
                                        </h3>
                                        <div className="space-y-2">
                                            {["Mumbai (120)", "Delhi (98)", "Bangalore (85)", "Hyderabad (72)", "Pune (65)", "Chennai (58)", "Ahmedabad (52)", "Kolkata (48)", "Jaipur (42)", "Patna (38)"].map((city, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <span className="text-xs font-bold text-gray-400 w-5">{i + 1}</span>
                                                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${100 - i * 8}%` }} />
                                                    </div>
                                                    <span className="text-xs text-gray-600 w-28 text-right">{city}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="glass-card-light rounded-2xl p-6">
                                        <h3 className="font-heading font-semibold text-base text-primary-900 mb-4">
                                            📊 Category Distribution
                                        </h3>
                                        <div className="space-y-2">
                                            {[
                                                { cat: "Real Estate", count: 180, pct: 35, color: "#ef4444" },
                                                { cat: "Business & Franchise", count: 120, pct: 23, color: "#f59e0b" },
                                                { cat: "Stocks & MF", count: 200, pct: 15, color: "#3b82f6" },
                                                { cat: "Fixed Returns", count: 85, pct: 12, color: "#10b981" },
                                                { cat: "Agriculture", count: 60, pct: 8, color: "#8b5cf6" },
                                                { cat: "Others", count: 50, pct: 7, color: "#9ca3af" },
                                            ].map((cat) => (
                                                <div key={cat.cat} className="flex items-center gap-3">
                                                    <span className="text-sm w-36 text-gray-700">{cat.cat}</span>
                                                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full" style={{ width: `${cat.pct * 2}%`, background: cat.color }} />
                                                    </div>
                                                    <span className="text-xs text-gray-600 w-12">{cat.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Revenue Chart */}
                                <div className="glass-card-light rounded-2xl p-6">
                                    <h3 className="font-heading font-semibold text-base text-primary-900 mb-4">
                                        💰 Revenue Trend (Last 12 Months)
                                    </h3>
                                    <div className="h-48 bg-gradient-to-br from-primary-50 to-green-50 rounded-xl flex items-center justify-center">
                                        <span className="text-sm text-gray-400">Revenue chart with Recharts</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Businesses */}
                        {activeTab === "businesses" && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h1 className="font-heading font-bold text-2xl text-primary-950">Business Verification</h1>
                                    <div className="flex gap-2 text-sm">
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">12 Pending</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">423 Verified</span>
                                    </div>
                                </div>

                                <div className="glass-card-light rounded-2xl overflow-hidden">
                                    <table className="w-full min-w-[700px]">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100">
                                                <th className="p-4 text-left text-xs font-semibold text-gray-500">Business</th>
                                                <th className="p-4 text-left text-xs font-semibold text-gray-500">Type</th>
                                                <th className="p-4 text-left text-xs font-semibold text-gray-500">Location</th>
                                                <th className="p-4 text-left text-xs font-semibold text-gray-500">Status</th>
                                                <th className="p-4 text-left text-xs font-semibold text-gray-500">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { name: "Kumar Properties", type: "Builder", loc: "Patna, Bihar", status: "Pending" },
                                                { name: "Fresh Farms Ltd", type: "Agriculture", loc: "Nagpur, MH", status: "Pending" },
                                                { name: "TechServe India", type: "Startup", loc: "Bangalore, KA", status: "Under Review" },
                                                { name: "Sharma Builders", type: "Builder", loc: "Patna, Bihar", status: "Verified" },
                                                { name: "Quick Eats", type: "Franchise", loc: "Delhi", status: "Verified" },
                                            ].map((biz, i) => (
                                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                                                    <td className="p-4 text-sm font-medium text-primary-800">{biz.name}</td>
                                                    <td className="p-4 text-sm text-gray-600">{biz.type}</td>
                                                    <td className="p-4 text-sm text-gray-600">{biz.loc}</td>
                                                    <td className="p-4">
                                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${biz.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                                                                biz.status === "Under Review" ? "bg-blue-100 text-blue-700" :
                                                                    "bg-green-100 text-green-700"
                                                            }`}>{biz.status}</span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex gap-2">
                                                            <button className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-lg hover:bg-green-100">✅ Approve</button>
                                                            <button className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-lg hover:bg-red-100">❌ Reject</button>
                                                            <button className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-100">👁️ View</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Listings */}
                        {activeTab === "listings" && (
                            <div>
                                <h1 className="font-heading font-bold text-2xl text-primary-950 mb-6">Listings Management</h1>
                                <div className="glass-card-light rounded-2xl overflow-hidden">
                                    <table className="w-full min-w-[700px]">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100">
                                                <th className="p-4 text-left text-xs font-semibold text-gray-500">Listing</th>
                                                <th className="p-4 text-left text-xs font-semibold text-gray-500">Business</th>
                                                <th className="p-4 text-left text-xs font-semibold text-gray-500">Category</th>
                                                <th className="p-4 text-left text-xs font-semibold text-gray-500">Views</th>
                                                <th className="p-4 text-left text-xs font-semibold text-gray-500">Status</th>
                                                <th className="p-4 text-left text-xs font-semibold text-gray-500">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { title: "Green Valley Project", biz: "Sharma Builders", cat: "Real Estate", views: 2340, status: "Active", featured: true },
                                                { title: "Chai Sutta Franchise", biz: "Rajesh Gupta", cat: "Franchise", views: 1200, status: "Active", featured: false },
                                                { title: "Organic Farm Lease", biz: "Fresh Farms", cat: "Agriculture", views: 890, status: "Active", featured: false },
                                                { title: "Tech Startup Equity", biz: "TechServe", cat: "Startup", views: 456, status: "Suspended", featured: false },
                                            ].map((listing, i) => (
                                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <div className="text-sm font-medium text-primary-800">{listing.title}</div>
                                                        {listing.featured && <span className="text-[10px] text-yellow-700 bg-yellow-50 px-1.5 py-0.5 rounded-full">⭐ Featured</span>}
                                                    </td>
                                                    <td className="p-4 text-sm text-gray-600">{listing.biz}</td>
                                                    <td className="p-4 text-sm text-gray-600">{listing.cat}</td>
                                                    <td className="p-4 text-sm text-gray-600">{listing.views}</td>
                                                    <td className="p-4">
                                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${listing.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                                            }`}>{listing.status}</span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex gap-1">
                                                            <button className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg">⭐</button>
                                                            <button className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded-lg">✏️</button>
                                                            <button className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-lg">🚫</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Users */}
                        {activeTab === "users" && (
                            <div>
                                <h1 className="font-heading font-bold text-2xl text-primary-950 mb-6">User Management</h1>
                                <div className="flex gap-3 mb-4">
                                    <select className="border rounded-xl px-3 py-2 text-sm bg-white">
                                        <option>All Roles</option>
                                        <option>Investors</option>
                                        <option>Business Owners</option>
                                    </select>
                                    <input type="text" placeholder="Search users..." className="border rounded-xl px-4 py-2 text-sm flex-1 max-w-sm" />
                                </div>
                                <div className="glass-card-light rounded-2xl p-6">
                                    <p className="text-sm text-gray-500">User management table with search, filter, suspend, and ban actions.</p>
                                </div>
                            </div>
                        )}

                        {/* Content */}
                        {activeTab === "content" && (
                            <div>
                                <h1 className="font-heading font-bold text-2xl text-primary-950 mb-6">Content Management</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="glass-card-light rounded-2xl p-6 card-hover text-center">
                                        <span className="text-3xl block mb-2">📚</span>
                                        <h3 className="font-semibold text-primary-900">Articles</h3>
                                        <p className="text-xs text-gray-500 mt-1">12 published</p>
                                        <button className="btn-primary !py-2 !px-4 !text-xs !rounded-xl mt-3">Manage</button>
                                    </div>
                                    <div className="glass-card-light rounded-2xl p-6 card-hover text-center">
                                        <span className="text-3xl block mb-2">🏦</span>
                                        <h3 className="font-semibold text-primary-900">Standard Options</h3>
                                        <p className="text-xs text-gray-500 mt-1">FD, PPF, SGB, MFs</p>
                                        <button className="btn-primary !py-2 !px-4 !text-xs !rounded-xl mt-3">Manage</button>
                                    </div>
                                    <div className="glass-card-light rounded-2xl p-6 card-hover text-center">
                                        <span className="text-3xl block mb-2">❓</span>
                                        <h3 className="font-semibold text-primary-900">FAQ</h3>
                                        <p className="text-xs text-gray-500 mt-1">6 questions</p>
                                        <button className="btn-primary !py-2 !px-4 !text-xs !rounded-xl mt-3">Manage</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Revenue */}
                        {activeTab === "revenue" && (
                            <div>
                                <h1 className="font-heading font-bold text-2xl text-primary-950 mb-6">Revenue & Subscriptions</h1>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                    {[
                                        { label: "Monthly Revenue", value: "₹4,23,500", color: "#10b981" },
                                        { label: "Active Subs", value: "187", color: "#3b82f6" },
                                        { label: "Free Tier", value: "336", color: "#9ca3af" },
                                        { label: "Churn Rate", value: "2.3%", color: "#ef4444" },
                                    ].map((s, i) => (
                                        <div key={i} className="glass-card-light rounded-2xl p-5">
                                            <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                                            <div className="font-heading font-bold text-xl" style={{ color: s.color }}>{s.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="glass-card-light rounded-2xl p-6">
                                    <h3 className="font-heading font-semibold text-base text-primary-900 mb-4">
                                        Revenue by Plan
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { plan: "Basic (₹999/mo)", count: 98, revenue: "₹97,902", pct: 23, color: "#3b82f6" },
                                            { plan: "Premium (₹2,499/mo)", count: 67, revenue: "₹1,67,433", pct: 40, color: "#8b5cf6" },
                                            { plan: "Enterprise (₹9,999/mo)", count: 22, revenue: "₹2,19,978", pct: 52, color: "#f59e0b" },
                                        ].map((item) => (
                                            <div key={item.plan} className="flex items-center gap-3">
                                                <span className="text-sm w-44 text-gray-700">{item.plan}</span>
                                                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                                                </div>
                                                <span className="text-xs text-gray-600 w-24 text-right">{item.revenue}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
}
