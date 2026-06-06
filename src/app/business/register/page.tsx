"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PLANS = [
    {
        id: "free",
        emoji: "🆓",
        name: "Free Plan",
        price: "₹0",
        period: "",
        features: [
            "Basic listing",
            '"Unverified" badge',
            "Limited visibility",
            "1 listing only",
        ],
        highlight: false,
        color: "#9ca3af",
    },
    {
        id: "basic",
        emoji: "⭐",
        name: "Basic Plan",
        price: "₹999",
        period: "/month",
        features: [
            "Verified badge",
            "Normal visibility",
            "Up to 3 listings",
            "Inquiry notifications",
        ],
        highlight: false,
        color: "#3b82f6",
    },
    {
        id: "premium",
        emoji: "🔥",
        name: "Premium Plan",
        price: "₹2,499",
        period: "/month",
        features: [
            "Featured badge & top visibility",
            "Unlimited listings",
            "Priority verification",
            "Detailed analytics dashboard",
        ],
        highlight: true,
        color: "#8b5cf6",
    },
    {
        id: "enterprise",
        emoji: "💎",
        name: "Enterprise Plan",
        price: "₹9,999",
        period: "/month",
        features: [
            "All Premium features",
            "Multi-city exposure (up to 10 cities)",
            "Dedicated support manager",
            "Custom branding on listings",
        ],
        highlight: false,
        color: "#f59e0b",
    },
];

const BUSINESS_TYPES = [
    "Builder / Real Estate Developer",
    "Property Dealer",
    "Franchise Owner",
    "NBFC / Financial Institution",
    "Shop / Retail Owner",
    "Restaurant / Food Business",
    "Agriculture / Farm Business",
    "Manufacturing Unit",
    "Startup / Tech Company",
    "Service Provider",
    "Other",
];

export default function BusinessRegisterPage() {
    const [step, setStep] = useState(0); // 0 = landing, 1-5 = form steps
    const [selectedPlan, setSelectedPlan] = useState("free");

    if (step === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-surface-light pt-20 pb-12">
                    {/* Hero */}
                    <section className="bg-gradient-hero py-16 sm:py-20 relative overflow-hidden">
                        <div className="absolute inset-0">
                            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
                            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl" />
                        </div>
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                Get Your Business in Front of Thousands of Investors 🚀
                            </h1>
                            <p className="text-primary-200 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
                                List your investment opportunity on NiveshMitra. Get discovered by
                                investors across India. Direct inquiries, verified trust badge.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-primary-300 mb-8">
                                <span>✅ Pan-India visibility</span>
                                <span>✅ Verified trust badge</span>
                                <span>✅ Direct investor inquiries</span>
                                <span>✅ Business dashboard</span>
                            </div>
                            <button onClick={() => setStep(1)} className="btn-green !text-lg !py-4 !px-10 !rounded-2xl">
                                Start Registration →
                            </button>
                            <p className="text-white/40 text-sm mt-3">
                                Start with Free plan and upgrade anytime
                            </p>
                        </div>
                    </section>

                    {/* Pricing Plans */}
                    <section id="pricing" className="py-16 sm:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-950 mb-3">
                                    Choose Your Plan
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    Annual plans get 20% discount
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {PLANS.map((plan) => (
                                    <div
                                        key={plan.id}
                                        className={`glass-card-light rounded-2xl p-6 card-hover relative ${plan.highlight ? "ring-2 ring-primary-500 shadow-xl" : ""
                                            }`}
                                    >
                                        {plan.highlight && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                Most Popular
                                            </div>
                                        )}
                                        <div className="text-center mb-4 pt-2">
                                            <span className="text-3xl">{plan.emoji}</span>
                                            <h3 className="font-heading font-bold text-base text-primary-900 mt-2">
                                                {plan.name}
                                            </h3>
                                            <div className="mt-2">
                                                <span className="text-2xl font-bold" style={{ color: plan.color }}>
                                                    {plan.price}
                                                </span>
                                                <span className="text-sm text-gray-500">{plan.period}</span>
                                            </div>
                                        </div>
                                        <ul className="space-y-2 mb-6">
                                            {plan.features.map((f, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <span className="text-green-500 mt-0.5">✓</span>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={() => { setSelectedPlan(plan.id); setStep(1); }}
                                            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.highlight
                                                    ? "btn-primary"
                                                    : "btn-secondary"
                                                }`}
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-surface-light pt-20 pb-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
                    {/* Progress */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            {["Personal", "Business", "Documents", "Plan", "Review"].map((label, i) => (
                                <div key={label} className="flex items-center gap-1.5">
                                    <div
                                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > i + 1
                                                ? "bg-green-500 text-white"
                                                : step === i + 1
                                                    ? "bg-primary-600 text-white"
                                                    : "bg-gray-200 text-gray-500"
                                            }`}
                                    >
                                        {step > i + 1 ? "✓" : i + 1}
                                    </div>
                                    <span className={`text-xs font-medium hidden sm:block ${step >= i + 1 ? "text-primary-700" : "text-gray-400"}`}>
                                        {label}
                                    </span>
                                    {i < 4 && <div className={`w-6 sm:w-12 h-0.5 mx-1 ${step > i + 1 ? "bg-green-500" : "bg-gray-200"}`} />}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 text-center">Step {step} of 5</p>
                    </div>

                    {/* Step 1: Personal Details */}
                    {step === 1 && (
                        <div className="animate-in">
                            <h2 className="font-heading font-bold text-xl text-primary-950 mb-6">
                                👤 Your Personal Details
                            </h2>
                            <div className="glass-card-light rounded-2xl p-6 space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name *</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="Enter your full name" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number * (OTP verification)</label>
                                    <input type="tel" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="+91 XXXXX XXXXX" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
                                    <input type="email" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Create Password *</label>
                                    <input type="password" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="Minimum 8 characters" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Aadhaar Number * (encrypted storage)</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="XXXX XXXX XXXX" />
                                </div>
                            </div>
                            <button onClick={() => setStep(2)} className="btn-primary w-full !py-4 !rounded-2xl mt-6">
                                Continue →
                            </button>
                        </div>
                    )}

                    {/* Step 2: Business Details */}
                    {step === 2 && (
                        <div className="animate-in">
                            <button onClick={() => setStep(1)} className="text-primary-600 text-sm font-medium mb-4 flex items-center gap-1">← Back</button>
                            <h2 className="font-heading font-bold text-xl text-primary-950 mb-6">
                                🏢 Business Details
                            </h2>
                            <div className="glass-card-light rounded-2xl p-6 space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Business Name *</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" placeholder="Enter your business name" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Business Type *</label>
                                    <select className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 outline-none bg-white">
                                        <option value="">Select type...</option>
                                        {BUSINESS_TYPES.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">Registration Number</label>
                                        <input type="text" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">GST Number</label>
                                        <input type="text" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">PAN Number *</label>
                                        <input type="text" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">Years in Business *</label>
                                        <input type="number" className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Business Description *</label>
                                    <textarea className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" rows={4} placeholder="Describe your business in simple words..." />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Full Address *</label>
                                    <textarea className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" rows={2} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">State *</label>
                                        <select className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 outline-none bg-white">
                                            <option>Select state...</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">City *</label>
                                        <select className="w-full border border-gray-200 rounded-xl p-3 text-base focus:border-primary-500 outline-none bg-white">
                                            <option>Select city...</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setStep(3)} className="btn-primary w-full !py-4 !rounded-2xl mt-6">
                                Continue →
                            </button>
                        </div>
                    )}

                    {/* Step 3: Document Upload */}
                    {step === 3 && (
                        <div className="animate-in">
                            <button onClick={() => setStep(2)} className="text-primary-600 text-sm font-medium mb-4 flex items-center gap-1">← Back</button>
                            <h2 className="font-heading font-bold text-xl text-primary-950 mb-6">
                                📄 Document Upload
                            </h2>
                            <div className="glass-card-light rounded-2xl p-6 space-y-5">
                                {[
                                    { label: "Business Registration Certificate *", type: "PDF/Image" },
                                    { label: "GST Certificate", type: "PDF/Image" },
                                    { label: "PAN Card *", type: "PDF/Image" },
                                    { label: "Bank Statement — last 6 months *", type: "PDF (encrypted, admin view only)" },
                                    { label: "Photos of Business/Project * (min 3, max 10)", type: "Images" },
                                    { label: "Past Project Certificates", type: "PDF/Image" },
                                ].map((doc, i) => (
                                    <div key={i}>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">{doc.label}</label>
                                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-primary-300 transition-colors cursor-pointer">
                                            <span className="text-3xl block mb-1">📁</span>
                                            <span className="text-sm text-gray-500">Click to upload or drag & drop ({doc.type})</span>
                                        </div>
                                    </div>
                                ))}

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        References — 2 people who can vouch for your business
                                    </label>
                                    {[1, 2].map((n) => (
                                        <div key={n} className="grid grid-cols-3 gap-3 mb-3">
                                            <input type="text" placeholder={`Reference ${n} name`} className="border border-gray-200 rounded-xl p-3 text-sm focus:border-primary-500 outline-none" />
                                            <input type="tel" placeholder="Phone" className="border border-gray-200 rounded-xl p-3 text-sm focus:border-primary-500 outline-none" />
                                            <input type="text" placeholder="Relationship" className="border border-gray-200 rounded-xl p-3 text-sm focus:border-primary-500 outline-none" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => setStep(4)} className="btn-primary w-full !py-4 !rounded-2xl mt-6">
                                Continue →
                            </button>
                        </div>
                    )}

                    {/* Step 4: Subscription Plan */}
                    {step === 4 && (
                        <div className="animate-in">
                            <button onClick={() => setStep(3)} className="text-primary-600 text-sm font-medium mb-4 flex items-center gap-1">← Back</button>
                            <h2 className="font-heading font-bold text-xl text-primary-950 mb-6">
                                💳 Choose Your Plan
                            </h2>
                            <div className="space-y-4">
                                {PLANS.map((plan) => (
                                    <button
                                        key={plan.id}
                                        onClick={() => setSelectedPlan(plan.id)}
                                        className={`w-full glass-card-light rounded-2xl p-5 text-left transition-all tap-target ${selectedPlan === plan.id ? "ring-2 ring-primary-500 bg-primary-50" : ""
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">{plan.emoji}</span>
                                            <div className="flex-1">
                                                <h3 className="font-heading font-bold text-base text-primary-900">{plan.name}</h3>
                                                <span className="text-lg font-bold" style={{ color: plan.color }}>
                                                    {plan.price}
                                                </span>
                                                <span className="text-sm text-gray-500">{plan.period}</span>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 ${selectedPlan === plan.id ? "border-primary-600 bg-primary-600" : "border-gray-300"} flex items-center justify-center`}>
                                                {selectedPlan === plan.id && <span className="text-white text-xs">✓</span>}
                                            </div>
                                        </div>
                                        <ul className="flex flex-wrap gap-2">
                                            {plan.features.map((f, i) => (
                                                <li key={i} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                                                    ✓ {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 text-center mt-3">Start with Free and upgrade anytime</p>
                            <button onClick={() => setStep(5)} className="btn-primary w-full !py-4 !rounded-2xl mt-6">
                                Continue →
                            </button>
                        </div>
                    )}

                    {/* Step 5: Review & Submit */}
                    {step === 5 && (
                        <div className="animate-in">
                            <button onClick={() => setStep(4)} className="text-primary-600 text-sm font-medium mb-4 flex items-center gap-1">← Back</button>
                            <h2 className="font-heading font-bold text-xl text-primary-950 mb-6">
                                ✅ Review & Submit
                            </h2>
                            <div className="glass-card-light rounded-2xl p-6 mb-6">
                                <h3 className="font-semibold text-base text-primary-800 mb-4">Summary</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between"><span className="text-gray-500">Plan:</span><span className="font-semibold capitalize">{selectedPlan}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Personal Details:</span><span className="text-green-600">✓ Filled</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Business Details:</span><span className="text-green-600">✓ Filled</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Documents:</span><span className="text-green-600">✓ Uploaded</span></div>
                                </div>
                            </div>

                            <div className="glass-card-light rounded-2xl p-6 mb-6">
                                <label className="flex items-start gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 accent-primary-600 mt-0.5" />
                                    <span className="text-sm text-gray-600">
                                        I confirm all information provided is accurate. I understand NiveshMitra is a discovery
                                        platform and does not handle investments. I agree to the{" "}
                                        <span className="text-primary-600 underline">Terms & Conditions</span>.
                                    </span>
                                </label>
                            </div>

                            <button className="btn-green w-full !py-4 !text-lg !rounded-2xl">
                                🚀 Submit Application
                            </button>
                            <p className="text-sm text-gray-500 text-center mt-3">
                                Our team will review your application within 48 hours.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
