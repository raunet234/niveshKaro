"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ================================================================
   SAMPLE LISTINGS DATA
   ================================================================ */
const SAMPLE_LISTINGS = [
    {
        id: "sharma-builders",
        badge: "verified",
        title: 'Sharma Builders — Residential Project "Green Valley"',
        city: "Patna",
        state: "Bihar",
        desc: "We are building 200 flats in Kankarbagh, Patna. Looking for investment partners.",
        minInvestment: 500000,
        returnOffered: "12% per year for 5 years",
        riskScore: 4,
        riskLevel: "MEDIUM",
        growthScore: 6,
        interested: 45,
        totalLookingFor: "₹10 Crore",
        earningSpeed: "Medium & Steady",
        listedDate: "15 Jan 2026",
        rating: 4.2,
        reviewCount: 12,
        category: "Real Estate",
        emoji: "🏠",
        returnCategory: "high",
        riskCategory: "low",
    },
    {
        id: "chai-sutta-bar",
        badge: "verified",
        title: "Rajesh Gupta — Chai Sutta Bar Franchise",
        city: "Patna",
        state: "Bihar",
        desc: "Own a Chai Sutta Bar franchise in Boring Road, Patna. Full setup support. High footfall area.",
        minInvestment: 1200000,
        returnOffered: "20-30% per year",
        riskScore: 6,
        riskLevel: "MED-HIGH",
        growthScore: 8,
        interested: 8,
        totalLookingFor: "₹1.5 Crore",
        earningSpeed: "Fast Earning 🚀",
        listedDate: "3 Feb 2026",
        rating: 4.5,
        reviewCount: 8,
        category: "Business & Franchise",
        emoji: "🏪",
        returnCategory: "high",
        riskCategory: "high",
    },
    {
        id: "post-office-fd",
        badge: "government",
        title: "Post Office Fixed Deposit",
        city: "All India",
        state: "🇮🇳",
        desc: "India Post fixed deposit scheme. Government backed. Available at any post office near you.",
        minInvestment: 1000,
        returnOffered: "7.5% per year (fixed)",
        riskScore: 1,
        riskLevel: "VERY LOW",
        growthScore: 10,
        interested: 0,
        totalLookingFor: "Unlimited",
        earningSpeed: "Slow but Safe 🐢",
        listedDate: "Available since 1882",
        rating: 0,
        reviewCount: 0,
        category: "Government",
        emoji: "🏦",
        returnCategory: "low",
        riskCategory: "low",
        isStandard: true,
    },
    {
        id: "sbi-bluechip-mf",
        badge: "government",
        title: "SBI Blue Chip Mutual Fund",
        city: "All India",
        state: "🇮🇳",
        desc: "Large cap equity mutual fund managed by SBI Funds Management. Suitable for long-term wealth creation.",
        minInvestment: 5000,
        returnOffered: "12-15% per year (historical)",
        riskScore: 5,
        riskLevel: "MEDIUM",
        growthScore: 7,
        interested: 0,
        totalLookingFor: "Open-ended",
        earningSpeed: "Medium ⚡",
        listedDate: "Available",
        rating: 0,
        reviewCount: 0,
        category: "Stocks & MF",
        emoji: "📈",
        returnCategory: "high",
        riskCategory: "medium",
        isStandard: true,
    },
    {
        id: "greenfield-farms",
        badge: "verified",
        title: "Greenfield Organic Farms — Agricultural Land Lease",
        city: "Nagpur",
        state: "Maharashtra",
        desc: "Organic farming on 50-acre land near Nagpur. Lease your capital for guaranteed crop-share returns.",
        minInvestment: 300000,
        returnOffered: "15% per year",
        riskScore: 5,
        riskLevel: "MEDIUM",
        growthScore: 6,
        interested: 18,
        totalLookingFor: "₹3 Crore",
        earningSpeed: "Medium & Steady",
        listedDate: "20 Jan 2026",
        rating: 4.0,
        reviewCount: 5,
        category: "Agriculture",
        emoji: "🌾",
        returnCategory: "high",
        riskCategory: "medium",
    },
    {
        id: "gold-sgb",
        badge: "government",
        title: "Sovereign Gold Bond 2026-27",
        city: "All India",
        state: "🇮🇳",
        desc: "Government of India gold bonds. Earn 2.5% fixed interest + gold price appreciation. Tax benefits on maturity.",
        minInvestment: 5000,
        returnOffered: "2.5% + Gold Price",
        riskScore: 2,
        riskLevel: "LOW",
        growthScore: 7,
        interested: 0,
        totalLookingFor: "Government scheme",
        earningSpeed: "Slow but Safe 🐢",
        listedDate: "Available",
        rating: 0,
        reviewCount: 0,
        category: "Gold",
        emoji: "🥇",
        returnCategory: "low",
        riskCategory: "low",
        isStandard: true,
    },
    {
        id: "tech-startup-1",
        badge: "verified",
        title: "QuickServe — Food Delivery Startup",
        city: "Bangalore",
        state: "Karnataka",
        desc: "AI-powered hyper-local food delivery platform. Expanding to 5 cities. Looking for growth capital.",
        minInvestment: 2500000,
        returnOffered: "25-40% per year (projected)",
        riskScore: 8,
        riskLevel: "HIGH",
        growthScore: 9,
        interested: 12,
        totalLookingFor: "₹5 Crore",
        earningSpeed: "Fast Earning 🚀",
        listedDate: "1 Mar 2026",
        rating: 3.8,
        reviewCount: 4,
        category: "Startups",
        emoji: "💻",
        returnCategory: "high",
        riskCategory: "high",
    },
    {
        id: "ppf-scheme",
        badge: "government",
        title: "Public Provident Fund (PPF)",
        city: "All India",
        state: "🇮🇳",
        desc: "Government-backed long-term savings scheme with tax benefits under Section 80C. 15-year lock-in.",
        minInvestment: 500,
        returnOffered: "7.1% per year (fixed)",
        riskScore: 1,
        riskLevel: "VERY LOW",
        growthScore: 10,
        interested: 0,
        totalLookingFor: "Government scheme",
        earningSpeed: "Slow but Safe 🐢",
        listedDate: "Available",
        rating: 0,
        reviewCount: 0,
        category: "Government",
        emoji: "🏦",
        returnCategory: "low",
        riskCategory: "low",
        isStandard: true,
    },
    {
        id: "infra-highway",
        badge: "verified",
        title: "Highway Construction Project — NH-30 Extension",
        city: "Lucknow",
        state: "Uttar Pradesh",
        desc: "Investment in highway construction via government-approved BOT model. Toll collection rights for 15 years.",
        minInvestment: 5000000,
        returnOffered: "14% per year",
        riskScore: 4,
        riskLevel: "MEDIUM",
        growthScore: 7,
        interested: 32,
        totalLookingFor: "₹25 Crore",
        earningSpeed: "Medium & Steady",
        listedDate: "10 Feb 2026",
        rating: 4.3,
        reviewCount: 9,
        category: "Infrastructure",
        emoji: "🏗️",
        returnCategory: "high",
        riskCategory: "low",
    },
];

const CATEGORIES = [
    { emoji: "📋", label: "All", value: "all" },
    { emoji: "🏠", label: "Real Estate", value: "real-estate" },
    { emoji: "🏪", label: "Business & Franchise", value: "business" },
    { emoji: "🏦", label: "Fixed Returns", value: "fixed-returns" },
    { emoji: "📈", label: "Stocks & MF", value: "stocks-mf" },
    { emoji: "🥇", label: "Gold", value: "gold" },
    { emoji: "🌾", label: "Agriculture", value: "agriculture" },
    { emoji: "🏗️", label: "Infrastructure", value: "infrastructure" },
    { emoji: "💻", label: "Startups", value: "startups" },
];

const MATRIX_ZONES = [
    {
        id: "popular",
        icon: "🌟",
        title: "POPULAR PICKS",
        desc: "Verified builders, top-rated NBFCs, blue-chip MFs",
        tags: [
            { text: "Low Risk", color: "green" },
            { text: "High Return", color: "green" },
        ],
        borderHover: "hover:border-primary-400",
        activeBorder: "border-primary-500 bg-primary-50/80",
        filter: (l: typeof SAMPLE_LISTINGS[0]) => l.riskCategory === "low" && l.returnCategory === "high",
    },
    {
        id: "high-growth",
        icon: "⚡",
        title: "HIGH GROWTH",
        desc: "Startups, new businesses, high-return opportunities",
        tags: [
            { text: "High Risk", color: "red" },
            { text: "High Return", color: "green" },
        ],
        borderHover: "hover:border-orange-400",
        activeBorder: "border-orange-500 bg-orange-50/80",
        filter: (l: typeof SAMPLE_LISTINGS[0]) => l.riskCategory === "high" && l.returnCategory === "high",
    },
    {
        id: "safe",
        icon: "🛡️",
        title: "SAFE & SLOW",
        desc: "PPF, Post Office, Savings, RDs",
        tags: [
            { text: "Low Risk", color: "green" },
            { text: "Low Return", color: "yellow" },
        ],
        borderHover: "hover:border-green-400",
        activeBorder: "border-green-500 bg-green-50/80",
        filter: (l: typeof SAMPLE_LISTINGS[0]) => l.riskCategory === "low" && l.returnCategory === "low",
    },
    {
        id: "explore-caution",
        icon: "⚠️",
        title: "EXPLORE WITH CAUTION",
        desc: "Newer, unproven opportunities",
        tags: [
            { text: "High Risk", color: "red" },
            { text: "Low Return", color: "yellow" },
        ],
        borderHover: "hover:border-red-400",
        activeBorder: "border-red-500 bg-red-50/80",
        filter: (l: typeof SAMPLE_LISTINGS[0]) => l.riskCategory === "high" && l.returnCategory === "low",
    },
];

/* ================================================================
   LISTING CARD COMPONENT
   ================================================================ */
function ListingCard({ listing }: { listing: typeof SAMPLE_LISTINGS[0] }) {
    const riskColor =
        listing.riskScore <= 3 ? "#10b981" : listing.riskScore <= 6 ? "#f59e0b" : "#ef4444";
    const growthColor =
        listing.growthScore <= 3 ? "#ef4444" : listing.growthScore <= 6 ? "#f59e0b" : "#10b981";

    return (
        <div className="listing-card">
            {/* Top badge */}
            <div className="px-5 pt-4 pb-2 flex items-center gap-2 flex-wrap">
                {listing.badge === "verified" && <span className="badge-verified">✅ VERIFIED BUSINESS</span>}
                {listing.badge === "government" && <span className="badge-govt">📌 GOVERNMENT / INSTITUTIONAL</span>}
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                    {listing.emoji} {listing.category}
                </span>
            </div>

            <div className="px-5 pb-5">
                {/* Title */}
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary-950 mb-1">
                    {listing.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">📍 {listing.city}, {listing.state}</p>
                <p className="text-sm text-gray-600 italic mb-4">&ldquo;{listing.desc}&rdquo;</p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                        <span className="text-gray-500">💰 Min Investment:</span>
                        <div className="font-bold text-primary-900">₹{listing.minInvestment.toLocaleString("en-IN")}</div>
                    </div>
                    <div>
                        <span className="text-gray-500">📊 Return Offered:</span>
                        <div className="font-bold text-green-700">{listing.returnOffered}</div>
                    </div>
                </div>

                {/* Risk & Growth Bars */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500 w-28">⚠️ Risk Level:</span>
                        <div className="flex-1 risk-bar">
                            <div className="risk-bar-fill" style={{ width: `${listing.riskScore * 10}%`, background: riskColor }} />
                        </div>
                        <span className="font-bold text-xs w-24 text-right" style={{ color: riskColor }}>
                            {listing.riskLevel} ({listing.riskScore}/10)
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500 w-28">📈 Growth:</span>
                        <div className="flex-1 risk-bar">
                            <div className="risk-bar-fill" style={{ width: `${listing.growthScore * 10}%`, background: growthColor }} />
                        </div>
                        <span className="font-bold text-xs w-24 text-right" style={{ color: growthColor }}>
                            {listing.growthScore}/10
                        </span>
                    </div>
                </div>

                {/* Extra details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-600 mb-4">
                    {listing.interested > 0 && (
                        <div>👥 {listing.interested} people inquired</div>
                    )}
                    <div>🎯 Looking for: {listing.totalLookingFor}</div>
                    <div>⏱️ {listing.earningSpeed}</div>
                    <div>📅 {listing.listedDate}</div>
                    {listing.rating > 0 && (
                        <div>⭐ {listing.rating}/5 ({listing.reviewCount} reviews)</div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                    <Link
                        href={`/listing/${listing.id}`}
                        className="btn-primary !py-2 !px-4 !text-sm !rounded-xl flex-1 min-w-[100px]"
                    >
                        Details →
                    </Link>
                    <Link
                        href={`/compare?ids=${listing.id}`}
                        className="btn-secondary !py-2 !px-4 !text-sm !rounded-xl"
                    >
                        Compare
                    </Link>
                    {listing.isStandard ? (
                        <button className="btn-green !py-2 !px-4 !text-sm !rounded-xl">
                            🔗 How to Apply
                        </button>
                    ) : (
                        <button className="btn-green !py-2 !px-4 !text-sm !rounded-xl">
                            📞 I&apos;m Interested
                        </button>
                    )}
                    <button className="border border-gray-200 rounded-xl px-3 py-2 text-lg hover:bg-red-50 hover:border-red-200 transition-colors">
                        ♡
                    </button>
                </div>

                {/* Disclaimer */}
                <p className="text-[11px] text-gray-400 mt-3">
                    ℹ️ Information only. Verify independently before investing.
                </p>
            </div>
        </div>
    );
}

/* ================================================================
   DASHBOARD CONTENT (wrapped in Suspense)
   ================================================================ */
function DashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const stateName = searchParams.get("state") || "Bihar";
    const cityName = searchParams.get("city") || "Patna";
    const budgetStr = searchParams.get("budget") || "₹25 Lakh - ₹1 Crore";
    const riskStr = searchParams.get("risk") || "balanced";

    const [activeCategory, setActiveCategory] = useState("all");
    const [activeZone, setActiveZone] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState("popular");
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const filteredListings = SAMPLE_LISTINGS.filter((l) => {
        // Apply matrix zone filter
        if (activeZone) {
            const zone = MATRIX_ZONES.find((z) => z.id === activeZone);
            if (zone && !zone.filter(l)) return false;
        }

        // Apply category filter
        if (activeCategory !== "all") {
            const catMap: Record<string, string[]> = {
                "real-estate": ["Real Estate"],
                business: ["Business & Franchise"],
                "fixed-returns": ["Government"],
                "stocks-mf": ["Stocks & MF"],
                gold: ["Gold"],
                agriculture: ["Agriculture"],
                infrastructure: ["Infrastructure"],
                startups: ["Startups"],
            };
            if (catMap[activeCategory] && !catMap[activeCategory].includes(l.category)) return false;
        }
        if (verifiedOnly && l.badge !== "verified" && l.badge !== "government") return false;
        return true;
    });

    // Sort
    const sortedListings = [...filteredListings].sort((a, b) => {
        if (sortBy === "highest-return") return b.growthScore - a.growthScore;
        if (sortBy === "lowest-risk") return a.riskScore - b.riskScore;
        if (sortBy === "most-trusted") return b.rating - a.rating;
        // default: popular by interested count
        return b.interested - a.interested;
    });

    const handleZoneSelect = (zoneId: string) => {
        setActiveZone(activeZone === zoneId ? null : zoneId);
        // Reset category when zone is selected
        setActiveCategory("all");
    };

    const clearAllFilters = () => {
        setActiveZone(null);
        setActiveCategory("all");
        setVerifiedOnly(false);
        setSortBy("popular");
    };

    const hasActiveFilters = activeZone || activeCategory !== "all" || verifiedOnly;

    return (
        <>
            {/* Top Bar with Back Button */}
            <div className="bg-gradient-hero border-b border-white/10 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    {/* Back button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-3 transition-colors group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                        <span>📍 {cityName}, {stateName}</span>
                        <span className="text-white/30">|</span>
                        <span>💰 Budget: {budgetStr}</span>
                        <span className="text-white/30">|</span>
                        <span>🎯 Risk Comfort: {riskStr}</span>
                        <Link href="/select-location" className="text-primary-300 hover:text-white ml-auto text-xs">
                            ✏️ Change
                        </Link>
                    </div>
                    <p className="text-[11px] text-white/40 mt-1">
                        Showing opportunities matching your preferences — not recommendations
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Risk-Return Matrix */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h2 className="font-heading font-bold text-lg text-primary-900">
                                Risk-Return Matrix — Choose your comfort zone
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                Click a zone to filter opportunities. Click again to deselect.
                            </p>
                        </div>
                        {activeZone && (
                            <button
                                onClick={() => setActiveZone(null)}
                                className="text-xs text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1 transition-colors"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear zone filter
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {MATRIX_ZONES.map((zone) => (
                            <button
                                key={zone.id}
                                onClick={() => handleZoneSelect(zone.id)}
                                className={`glass-card-light rounded-2xl p-5 text-left transition-all tap-target border-2 ${activeZone === zone.id
                                        ? zone.activeBorder + " shadow-lg scale-[1.02]"
                                        : activeZone && activeZone !== zone.id
                                            ? "border-transparent opacity-50"
                                            : `border-transparent ${zone.borderHover}`
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-lg">{zone.icon}</span>
                                    <h3 className="font-heading font-bold text-sm text-primary-900">{zone.title}</h3>
                                    {activeZone === zone.id && (
                                        <span className="ml-auto text-xs bg-primary-600 text-white px-2 py-0.5 rounded-full">Active</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mb-2">{zone.desc}</p>
                                <div className="flex gap-1">
                                    {zone.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className={`text-[10px] px-1.5 py-0.5 rounded-full ${tag.color === "green"
                                                    ? "bg-green-100 text-green-700"
                                                    : tag.color === "red"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {tag.text}
                                        </span>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => { setActiveCategory(cat.value); setActiveZone(null); }}
                            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all tap-target ${activeCategory === cat.value
                                    ? "bg-primary-600 text-white shadow-lg"
                                    : "bg-white text-gray-700 border border-gray-200 hover:border-primary-300"
                                }`}
                        >
                            {cat.emoji} {cat.label}
                        </button>
                    ))}
                </div>

                {/* Sort & Filter Bar */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 bg-white focus:border-primary-500 outline-none"
                    >
                        <option value="popular">🔥 Most Popular</option>
                        <option value="highest-return">📈 Highest Return</option>
                        <option value="lowest-risk">🛡️ Lowest Risk</option>
                        <option value="most-trusted">⭐ Most Trusted</option>
                    </select>

                    <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700">
                        <input
                            type="checkbox"
                            checked={verifiedOnly}
                            onChange={(e) => setVerifiedOnly(e.target.checked)}
                            className="w-4 h-4 accent-primary-600 rounded"
                        />
                        Verified Only
                    </label>

                    {hasActiveFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="text-xs text-red-500 hover:text-red-700 font-medium px-3 py-2 rounded-xl border border-red-200 hover:bg-red-50 transition-colors"
                        >
                            ✕ Clear All Filters
                        </button>
                    )}

                    <div className="ml-auto text-sm text-gray-500">
                        {sortedListings.length} opportunities found
                    </div>
                </div>

                {/* Active filter indicator */}
                {activeZone && (
                    <div className="mb-6 bg-primary-50 border border-primary-100 rounded-xl px-4 py-3 flex items-center gap-3">
                        <span className="text-lg">{MATRIX_ZONES.find(z => z.id === activeZone)?.icon}</span>
                        <div className="flex-1">
                            <span className="text-sm font-semibold text-primary-800">
                                Showing: {MATRIX_ZONES.find(z => z.id === activeZone)?.title}
                            </span>
                            <span className="text-xs text-primary-600 ml-2">
                                — {MATRIX_ZONES.find(z => z.id === activeZone)?.desc}
                            </span>
                        </div>
                        <button onClick={() => setActiveZone(null)} className="text-primary-500 hover:text-primary-700 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Listings Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {sortedListings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>

                {/* Load More */}
                {sortedListings.length > 0 && (
                    <div className="text-center">
                        <button className="btn-secondary !rounded-2xl !py-3 !px-8">
                            Load More Opportunities ↓
                        </button>
                    </div>
                )}

                {sortedListings.length === 0 && (
                    <div className="text-center py-20">
                        <span className="text-5xl block mb-4">🔍</span>
                        <h3 className="font-heading font-bold text-xl text-primary-900 mb-2">
                            No opportunities found in this zone
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Try a different zone or clear your filters to see all opportunities.
                        </p>
                        <button
                            onClick={clearAllFilters}
                            className="btn-primary !rounded-2xl !py-3 !px-8"
                        >
                            Show All Opportunities
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

/* ================================================================
   DASHBOARD PAGE
   ================================================================ */
export default function DashboardPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-surface-light">
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center min-h-[60vh]">
                            <div className="animate-spin w-12 h-12 border-4 border-primary-300 border-t-primary-600 rounded-full" />
                        </div>
                    }
                >
                    <DashboardContent />
                </Suspense>
            </div>
            <Footer />
        </>
    );
}
