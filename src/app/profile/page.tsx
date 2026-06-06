"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("saved");

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-surface-light pt-20 pb-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Profile Header */}
                    <div className="glass-card-light rounded-2xl p-6 mb-8">
                        <div className="flex flex-col sm:flex-row items-center gap-5">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                                RK
                            </div>
                            <div className="text-center sm:text-left flex-1">
                                <h1 className="font-heading font-bold text-xl text-primary-950">Rajesh Kumar</h1>
                                <p className="text-sm text-gray-500">📍 Patna, Bihar • Member since Jan 2026</p>
                                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                        🟡 Balanced Risk Profile
                                    </span>
                                </div>
                            </div>
                            <Link href="/risk-quiz" className="btn-secondary !py-2 !px-4 !text-sm !rounded-xl">
                                🎯 Retake Risk Quiz
                            </Link>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto mb-6 pb-2">
                        {[
                            { id: "saved", label: "💾 Saved" },
                            { id: "inquiries", label: "📞 My Inquiries" },
                            { id: "tracker", label: "📊 Investment Tracker" },
                            { id: "reviews", label: "⭐ My Reviews" },
                            { id: "settings", label: "⚙️ Settings" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all tap-target ${activeTab === tab.id
                                        ? "bg-primary-600 text-white"
                                        : "bg-white text-gray-700 border border-gray-200"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Saved */}
                    {activeTab === "saved" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "Sharma Builders — Green Valley", city: "Patna", return: "12%", risk: "MEDIUM" },
                                { title: "Post Office FD", city: "All India", return: "7.5%", risk: "VERY LOW" },
                                { title: "SBI Blue Chip MF", city: "All India", return: "12-15%", risk: "MEDIUM" },
                            ].map((item, i) => (
                                <div key={i} className="glass-card-light rounded-2xl p-5 card-hover">
                                    <h3 className="font-heading font-semibold text-base text-primary-900 mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">📍 {item.city}</p>
                                    <div className="flex items-center gap-3 text-sm mb-3">
                                        <span className="text-green-700 font-semibold">📊 {item.return}/yr</span>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-gray-600">⚠️ {item.risk}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href="/listing/sample" className="btn-primary !py-2 !px-4 !text-xs !rounded-xl flex-1 text-center">
                                            View Details
                                        </Link>
                                        <button className="btn-secondary !py-2 !px-4 !text-xs !rounded-xl">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Inquiries */}
                    {activeTab === "inquiries" && (
                        <div className="space-y-4">
                            {[
                                { business: "Sharma Builders", listing: "Green Valley", date: "Mar 5", status: "Sent" },
                                { business: "Chai Sutta Bar", listing: "Franchise Opportunity", date: "Mar 1", status: "Business Contacted" },
                                { business: "Greenfield Farms", listing: "Organic Farm Land", date: "Feb 28", status: "Meeting Done" },
                            ].map((inq, i) => (
                                <div key={i} className="glass-card-light rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold text-base text-primary-900">{inq.business}</h3>
                                        <p className="text-sm text-gray-500">{inq.listing} • {inq.date}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${inq.status === "Sent" ? "bg-blue-100 text-blue-700" :
                                                inq.status === "Business Contacted" ? "bg-green-100 text-green-700" :
                                                    "bg-purple-100 text-purple-700"
                                            }`}>
                                            {inq.status === "Sent" ? "✅" : inq.status === "Business Contacted" ? "📞" : "🤝"} {inq.status}
                                        </span>
                                        <select className="text-xs border rounded-lg px-2 py-1 bg-white">
                                            <option>Update Status</option>
                                            <option>Sent</option>
                                            <option>Business Contacted</option>
                                            <option>Meeting Done</option>
                                            <option>Invested</option>
                                            <option>Declined</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Investment Tracker */}
                    {activeTab === "tracker" && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-heading font-bold text-lg text-primary-900">
                                    My Investment Tracker
                                </h3>
                                <button className="btn-primary !py-2 !px-4 !text-sm !rounded-xl">
                                    + Add Investment
                                </button>
                            </div>

                            {/* Portfolio Overview */}
                            <div className="glass-card-light rounded-2xl p-6 mb-6">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Total Invested</div>
                                        <div className="font-heading font-bold text-xl text-primary-900">₹15,00,000</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Expected Value</div>
                                        <div className="font-heading font-bold text-xl text-green-700">₹18,45,000</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Active Investments</div>
                                        <div className="font-heading font-bold text-xl text-primary-900">3</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Avg Return</div>
                                        <div className="font-heading font-bold text-xl text-green-700">11.2%</div>
                                    </div>
                                </div>
                            </div>

                            {/* Investment Cards */}
                            <div className="space-y-4">
                                {[
                                    { name: "Sharma Builders — Green Valley", amount: 1000000, return: 12, date: "Jan 2026", maturity: "Jan 2031", status: "Active" },
                                    { name: "Post Office FD", amount: 300000, return: 7.5, date: "Feb 2026", maturity: "Feb 2031", status: "Active" },
                                    { name: "SBI Blue Chip SIP", amount: 200000, return: 14, date: "Mar 2025", maturity: "Ongoing", status: "Active" },
                                ].map((inv, i) => (
                                    <div key={i} className="glass-card-light rounded-2xl p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-base text-primary-900">{inv.name}</h4>
                                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                                                {inv.status}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                            <div>
                                                <span className="text-gray-500">Invested:</span>
                                                <div className="font-bold text-primary-900">₹{inv.amount.toLocaleString("en-IN")}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Expected Return:</span>
                                                <div className="font-bold text-green-700">{inv.return}%/yr</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Invested On:</span>
                                                <div className="font-semibold">{inv.date}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Maturity:</span>
                                                <div className="font-semibold">{inv.maturity}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mt-6">
                                <p className="text-xs text-blue-800">
                                    📊 This is your personal tracker. NiveshMitra does not manage or process these investments.
                                    Values are calculated based on the expected return rates you entered.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Reviews */}
                    {activeTab === "reviews" && (
                        <div className="space-y-4">
                            {[
                                { business: "Sharma Builders", rating: 5, comment: "Very transparent. Good communication.", date: "Mar 2026" },
                                { business: "Greenfield Farms", rating: 4, comment: "Promising but it's early. Good concept.", date: "Feb 2026" },
                            ].map((review, i) => (
                                <div key={i} className="glass-card-light rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold text-primary-900">{review.business}</span>
                                        <div className="flex gap-0.5">
                                            {Array.from({ length: 5 }, (_, j) => (
                                                <span key={j} className={`text-sm ${j < review.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500 ml-auto">{review.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{review.comment}</p>
                                    <div className="flex gap-2 mt-3">
                                        <button className="text-xs text-primary-600 hover:underline">Edit</button>
                                        <button className="text-xs text-red-500 hover:underline">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Settings */}
                    {activeTab === "settings" && (
                        <div className="glass-card-light rounded-2xl p-6 space-y-6 max-w-lg">
                            <h3 className="font-heading font-bold text-lg text-primary-900">Profile Settings</h3>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                                <input type="text" defaultValue="Rajesh Kumar" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                                <input type="email" defaultValue="rajesh@example.com" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
                                <input type="tel" defaultValue="+91 98765 43210" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Preferred Location</label>
                                <select className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 outline-none bg-white">
                                    <option>Patna, Bihar</option>
                                </select>
                            </div>
                            <button className="btn-primary !py-3 !rounded-xl">Save Changes</button>

                            <div className="border-t border-gray-200 pt-4">
                                <button className="text-sm text-red-500 hover:underline">Delete Account</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
