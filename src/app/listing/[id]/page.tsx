"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ================================================================
   RETURN CALCULATOR
   ================================================================ */
function ReturnCalculator({ annualRate }: { annualRate: number }) {
    const [amount, setAmount] = useState(1000000);
    const [years, setYears] = useState(5);

    const calcReturn = (rate: number) =>
        Math.round(amount * Math.pow(1 + rate / 100, years));
    const projected = calcReturn(annualRate);
    const bankFd = calcReturn(7);
    const savings = calcReturn(4);

    return (
        <div className="glass-card-light rounded-2xl p-6">
            <h3 className="font-heading font-bold text-lg text-primary-900 mb-1">
                See what your money could grow to 📊
            </h3>
            <p className="text-xs text-gray-500 mb-5">
                This is an estimate for educational purposes based on the offered return rate.
            </p>

            <div className="space-y-5 mb-6">
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                        How much would you put in?
                    </label>
                    <input
                        type="range"
                        min={100000}
                        max={50000000}
                        step={100000}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full accent-primary-600 mb-1"
                    />
                    <div className="text-center font-heading font-bold text-xl text-primary-700">
                        ₹{amount.toLocaleString("en-IN")}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                        For how many years?
                    </label>
                    <input
                        type="range"
                        min={1}
                        max={30}
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                        className="w-full accent-primary-600 mb-1"
                    />
                    <div className="text-center font-heading font-bold text-xl text-primary-700">
                        {years} year{years > 1 ? "s" : ""}
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="bg-primary-50 rounded-xl p-5 space-y-3">
                <p className="text-sm text-gray-600 mb-3">
                    If you put <strong>₹{amount.toLocaleString("en-IN")}</strong> for{" "}
                    <strong>{years} years</strong> at <strong>{annualRate}%</strong> return:
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-sm">📈 This opportunity:</span>
                    <span className="font-bold text-lg text-green-700">
                        ₹{projected.toLocaleString("en-IN")}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm">🏦 Bank FD (7%):</span>
                    <span className="font-semibold text-gray-600">
                        ₹{bankFd.toLocaleString("en-IN")}{" "}
                        <span className="text-xs text-red-500">
                            (₹{(projected - bankFd).toLocaleString("en-IN")} less)
                        </span>
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm">💰 Savings (4%):</span>
                    <span className="font-semibold text-gray-600">
                        ₹{savings.toLocaleString("en-IN")}{" "}
                        <span className="text-xs text-red-500">
                            (₹{(projected - savings).toLocaleString("en-IN")} less)
                        </span>
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm">📉 Under mattress (0%):</span>
                    <span className="font-semibold text-gray-600">
                        ₹{amount.toLocaleString("en-IN")}{" "}
                        <span className="text-xs text-red-500">(loses value to inflation)</span>
                    </span>
                </div>
            </div>

            <p className="text-[11px] text-gray-400 mt-3">
                ⚠️ This is an estimate based on the offered return rate. Actual returns may vary. Not a guarantee or financial advice.
            </p>
        </div>
    );
}

/* ================================================================
   LISTING DETAIL PAGE
   ================================================================ */
export default function ListingDetailPage() {
    const router = useRouter();
    const [interestModalOpen, setInterestModalOpen] = useState(false);
    const [qaOpen, setQaOpen] = useState(false);
    const [agreed, setAgreed] = useState(false);

    // Sample listing data
    const listing = {
        id: "sharma-builders",
        title: "Sharma Builders — Residential Project \"Green Valley\"",
        businessName: "Sharma Builders Pvt. Ltd.",
        city: "Patna",
        state: "Bihar",
        category: "Real Estate",
        verified: true,
        desc: "We are developing a premium residential project 'Green Valley' in the heart of Kankarbagh, Patna. The project consists of 200 flats across 4 towers with modern amenities including swimming pool, gym, children's play area, and 24/7 security. We are looking for investment partners who can participate in the project and share the returns upon completion and sale of units.",
        minInvestment: 500000,
        maxInvestment: 5000000,
        returnOffered: 12,
        returnType: "Fixed",
        riskScore: 4,
        riskLevel: "MEDIUM",
        growthScore: 6,
        lockInPeriod: "5 years",
        totalNeeded: "₹10 Crore",
        interested: 45,
        interestAmount: "₹2.3 Cr",
        yearsOperating: 8,
        earningSpeed: "Medium & Steady",
        payoutFrequency: "Yearly",
        rating: 4.2,
        reviewCount: 12,
        whatCouldGoWrong: [
            "The construction project could get delayed due to regulatory approvals",
            "Market conditions in Patna real estate could change",
            "The business could face cash flow issues during construction",
            "Material costs may increase affecting project margins",
        ],
        worstCase: "Complete loss of investment if project fails (extremely rare for established builders)",
        bestCase: "12% annual returns for 5 years + potential appreciation in property value",
    };

    const riskColor = listing.riskScore <= 3 ? "#10b981" : listing.riskScore <= 6 ? "#f59e0b" : "#ef4444";

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-surface-light pt-20">
                {/* Breadcrumb */}
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 font-medium transition-colors group"
                            >
                                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back
                            </button>
                            <span className="text-gray-200">|</span>
                            <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                                <Link href="/" className="hover:text-primary-600">Home</Link>
                                <span>/</span>
                                <Link href="/dashboard" className="hover:text-primary-600">{listing.state}</Link>
                                <span>/</span>
                                <span className="text-primary-700">{listing.city}</span>
                                <span>/</span>
                                <span className="text-primary-700">{listing.category}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT COLUMN - Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Section 1: Header */}
                            <div className="glass-card-light rounded-2xl p-6">
                                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            {listing.verified && <span className="badge-verified">✅ VERIFIED</span>}
                                            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                                                🏠 {listing.category}
                                            </span>
                                        </div>
                                        <h1 className="font-heading font-bold text-xl sm:text-2xl text-primary-950 mb-1">
                                            {listing.title}
                                        </h1>
                                        <p className="text-gray-500 text-sm">📍 {listing.city}, {listing.state}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="border border-gray-200 rounded-xl px-3 py-2 text-sm hover:bg-green-50 hover:border-green-200 transition-colors">
                                            📲 Share
                                        </button>
                                        <button className="border border-gray-200 rounded-xl px-3 py-2 text-lg hover:bg-red-50 hover:border-red-200 transition-colors">
                                            ♡
                                        </button>
                                    </div>
                                </div>

                                {/* Image placeholder */}
                                <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl h-48 sm:h-64 flex items-center justify-center mb-4">
                                    <div className="text-center text-gray-400">
                                        <span className="text-5xl block mb-2">🏗️</span>
                                        <span className="text-sm">Project photos will appear here</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <h3 className="font-heading font-semibold text-base text-primary-900 mb-2">
                                    About This Opportunity
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{listing.desc}</p>
                            </div>

                            {/* Section 2: Key Numbers */}
                            <div className="glass-card-light rounded-2xl p-6">
                                <h3 className="font-heading font-bold text-lg text-primary-900 mb-4">
                                    Key Numbers Dashboard
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {[
                                        { icon: "💰", label: "Min Investment", value: `₹${listing.minInvestment.toLocaleString("en-IN")}` },
                                        { icon: "💰", label: "Max Investment", value: `₹${listing.maxInvestment.toLocaleString("en-IN")}` },
                                        { icon: "📊", label: "Return Offered", value: `${listing.returnOffered}% / year` },
                                        { icon: "📊", label: "Return Type", value: listing.returnType },
                                        { icon: "🔒", label: "Lock-in Period", value: listing.lockInPeriod },
                                        { icon: "🎯", label: "Total Looking For", value: listing.totalNeeded },
                                        { icon: "📅", label: "Operating Since", value: `${2026 - listing.yearsOperating} (${listing.yearsOperating} years)` },
                                        { icon: "⏱️", label: "Earning Speed", value: listing.earningSpeed },
                                        { icon: "💳", label: "Payout", value: listing.payoutFrequency },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-gray-50 rounded-xl p-3">
                                            <div className="text-xs text-gray-500 mb-1">{item.icon} {item.label}</div>
                                            <div className="font-bold text-primary-900 text-sm">{item.value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Risk Bar */}
                                <div className="mt-4 p-4 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-sm text-gray-600">⚠️ Risk Level:</span>
                                        <div className="flex-1 risk-bar">
                                            <div className="risk-bar-fill" style={{ width: `${listing.riskScore * 10}%`, background: riskColor }} />
                                        </div>
                                        <span className="font-bold text-sm" style={{ color: riskColor }}>
                                            {listing.riskLevel} ({listing.riskScore}/10)
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-600">📈 Interest So Far:</span>
                                        <div className="flex-1 risk-bar">
                                            <div className="risk-bar-fill bg-primary-500" style={{ width: "23%" }} />
                                        </div>
                                        <span className="text-xs text-gray-600">
                                            {listing.interested} inquired • {listing.interestAmount} interest
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Return Calculator */}
                            <ReturnCalculator annualRate={listing.returnOffered} />

                            {/* Section 4: Risk Understanding */}
                            <div className="glass-card-light rounded-2xl p-6">
                                <h3 className="font-heading font-bold text-lg text-primary-900 mb-4">
                                    What you should know before proceeding ⚠️
                                </h3>

                                <div className="space-y-4">
                                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
                                        <h4 className="font-semibold text-sm text-yellow-800 mb-2">📌 What could go wrong?</h4>
                                        <ul className="space-y-1.5">
                                            {listing.whatCouldGoWrong.map((risk, i) => (
                                                <li key={i} className="text-sm text-yellow-700 flex items-start gap-2">
                                                    <span>•</span> {risk}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                                            <h4 className="font-semibold text-sm text-red-800 mb-1">📉 Worst Case</h4>
                                            <p className="text-sm text-red-700">{listing.worstCase}</p>
                                        </div>
                                        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                                            <h4 className="font-semibold text-sm text-green-800 mb-1">📈 Best Case</h4>
                                            <p className="text-sm text-green-700">{listing.bestCase}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 5: Verification & Track Record */}
                            <div className="glass-card-light rounded-2xl p-6">
                                <h3 className="font-heading font-bold text-lg text-primary-900 mb-4">
                                    Business Verification & Track Record
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: "📅", text: "In business since: 2018 (8 years)", verified: true },
                                        { icon: "📄", text: "Documents: GST Certificate, Business Registration, PAN", verified: true },
                                        { icon: "🏗️", text: "Past projects: 3 completed projects", verified: true },
                                        { icon: "👥", text: "Past investors: 120 people in previous projects", verified: true },
                                        { icon: "⭐", text: `Rating: ${listing.rating}/5 (${listing.reviewCount} reviews)`, verified: true },
                                        { icon: "🔍", text: "Verified by NiveshMitra team: Yes", verified: true },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm">
                                            <span>{item.icon}</span>
                                            <span className="text-gray-700">{item.text}</span>
                                            <span className="text-green-500 ml-auto">✅</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
                                    <p className="text-xs text-blue-800">
                                        <strong>Note:</strong> NiveshMitra verifies that a business exists and documents are authentic.
                                        We do NOT verify or guarantee the investment returns. Always do your own due diligence before investing.
                                    </p>
                                </div>
                            </div>

                            {/* Section 6: How It Works */}
                            <div className="glass-card-light rounded-2xl p-6">
                                <h3 className="font-heading font-bold text-lg text-primary-900 mb-4">
                                    Interested? Here&apos;s what happens next:
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { step: 1, text: "📞 Click 'I'm Interested' — we share your contact with this business" },
                                        { step: 2, text: "🤝 The business owner contacts you within 24-48 hours" },
                                        { step: 3, text: "📋 Meet them. Ask questions. Check their documents yourself." },
                                        { step: 4, text: "📝 If satisfied, sign an agreement directly with them" },
                                        { step: 5, text: "💰 Transfer investment amount directly to the business" },
                                        { step: 6, text: "✅ Come back and track your investment on NiveshMitra" },
                                    ].map((item) => (
                                        <div key={item.step} className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                                {item.step}
                                            </div>
                                            <span className="text-sm text-gray-700">{item.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 bg-purple-50 border border-purple-100 rounded-xl p-4">
                                    <p className="text-xs text-purple-800">
                                        NiveshMitra helps you DISCOVER opportunities and CONNECT with businesses. We do NOT handle your
                                        money or process investments. All deals happen directly between you and the business.
                                    </p>
                                </div>
                            </div>

                            {/* Section 7: Q&A */}
                            <div className="glass-card-light rounded-2xl p-6">
                                <h3 className="font-heading font-bold text-lg text-primary-900 mb-4">
                                    Public Q&A — 15 questions asked • 12 answered
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        {
                                            q: "What is the expected completion date of the project?",
                                            a: "We expect to complete the project by December 2028. Construction is progressing on schedule.",
                                            user: "Amit K.",
                                            date: "2 weeks ago",
                                        },
                                        {
                                            q: "Can I visit the construction site before expressing interest?",
                                            a: "Absolutely! We encourage all potential investors to visit the site. Please contact us to schedule a visit.",
                                            user: "Priya S.",
                                            date: "1 month ago",
                                        },
                                    ].map((qa, i) => (
                                        <div key={i} className="border-b border-gray-100 pb-4">
                                            <div className="text-sm font-semibold text-primary-800 mb-1">
                                                Q: {qa.q}
                                            </div>
                                            <div className="text-sm text-gray-600 ml-4 mb-1">
                                                A: {qa.a}
                                            </div>
                                            <div className="text-xs text-gray-400 ml-4">
                                                Asked by {qa.user} • {qa.date}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setQaOpen(!qaOpen)}
                                    className="btn-secondary !py-2 !px-4 !text-sm !rounded-xl mt-3"
                                >
                                    💬 Ask a Question (Login Required)
                                </button>
                            </div>

                            {/* Section 8: Reviews */}
                            <div className="glass-card-light rounded-2xl p-6">
                                <h3 className="font-heading font-bold text-lg text-primary-900 mb-4">
                                    Reviews ⭐ {listing.rating}/5 ({listing.reviewCount} reviews)
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { name: "Rajesh K.", rating: 5, comment: "Very transparent and professional team. They showed me all documents and answered every question patiently.", date: "1 week ago", verified: true },
                                        { name: "Sunita M.", rating: 4, comment: "Good project with reasonable returns. Site visit was very informative. Lock-in period is slightly long.", date: "3 weeks ago", verified: false },
                                    ].map((review, i) => (
                                        <div key={i} className="border-b border-gray-100 pb-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="flex items-center gap-0.5">
                                                    {Array.from({ length: 5 }, (_, j) => (
                                                        <span key={j} className={`text-sm ${j < review.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                                                    ))}
                                                </div>
                                                <span className="text-sm font-semibold text-primary-800">{review.name}</span>
                                                {review.verified && <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">Verified Investor</span>}
                                            </div>
                                            <p className="text-sm text-gray-600">{review.comment}</p>
                                            <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn-secondary !py-2 !px-4 !text-sm !rounded-xl mt-3">
                                    ✍️ Write a Review (Login Required)
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - Sidebar */}
                        <div className="space-y-6">
                            {/* CTA Card */}
                            <div className="glass-card-light rounded-2xl p-6 sticky top-24">
                                <div className="text-center mb-4">
                                    <div className="font-heading font-bold text-2xl text-primary-900 mb-1">
                                        ₹{listing.minInvestment.toLocaleString("en-IN")}
                                    </div>
                                    <div className="text-sm text-gray-500">Minimum Investment</div>
                                </div>

                                <div className="bg-green-50 rounded-xl p-3 text-center mb-4">
                                    <div className="font-bold text-xl text-green-700">{listing.returnOffered}% / year</div>
                                    <div className="text-xs text-green-600">{listing.returnType} Returns</div>
                                </div>

                                <button
                                    onClick={() => setInterestModalOpen(true)}
                                    className="btn-green w-full !py-4 !text-base !rounded-2xl mb-3"
                                >
                                    📞 I&apos;m Interested — Connect Me
                                </button>

                                <button className="btn-secondary w-full !py-3 !rounded-2xl mb-3">
                                    📲 Share on WhatsApp
                                </button>

                                <Link href={`/compare?ids=${listing.id}`} className="btn-secondary w-full !py-3 !rounded-2xl block text-center">
                                    ⚖️ Compare with Others
                                </Link>

                                <p className="text-[11px] text-gray-400 text-center mt-4">
                                    ⚖️ NiveshMitra is a discovery platform. We do NOT handle money or guarantee returns.
                                </p>
                            </div>

                            {/* Similar Opportunities */}
                            <div className="glass-card-light rounded-2xl p-6">
                                <h3 className="font-heading font-semibold text-base text-primary-900 mb-4">
                                    Similar in {listing.city}
                                </h3>
                                {[
                                    { title: "Kumar Properties — Heights Tower", return: "10%", risk: "LOW" },
                                    { title: "Patna Real Estate Group", return: "14%", risk: "MEDIUM" },
                                    { title: "Bihar Housing Development", return: "9%", risk: "LOW" },
                                ].map((item, i) => (
                                    <Link key={i} href="/listing/sample" className="block p-3 rounded-xl hover:bg-gray-50 transition-colors mb-2">
                                        <div className="font-semibold text-sm text-primary-800">{item.title}</div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                            <span>📊 {item.return}/yr</span>
                                            <span>•</span>
                                            <span>⚠️ {item.risk}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                        <p className="text-sm text-yellow-800">
                            <strong>⚖️ IMPORTANT:</strong> NiveshMitra is a discovery platform. We help you find
                            opportunities and connect with businesses. We do NOT provide financial advice, manage
                            investments, process money, or guarantee returns. All decisions are yours. All transactions
                            happen directly between you and the business. Past performance does not guarantee future
                            results. Always consult a certified financial advisor.
                        </p>
                    </div>
                </div>
            </div>

            {/* Interest Modal */}
            {interestModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-heading font-bold text-lg text-primary-900">Express Interest</h3>
                            <button
                                onClick={() => setInterestModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                            Your contact details (name, phone, email) will be shared with{" "}
                            <strong>{listing.businessName}</strong>. They will reach out to you within 24-48 hours.
                        </p>

                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Any specific questions? (optional)
                            </label>
                            <textarea
                                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                                rows={3}
                                placeholder="E.g., Can I visit the site? What documents will I receive?"
                            />
                        </div>

                        <label className="flex items-start gap-2 mb-4 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="w-4 h-4 accent-primary-600 mt-0.5"
                            />
                            <span className="text-xs text-gray-600">
                                I understand that NiveshMitra is a discovery platform and does not handle investments or
                                guarantee returns. I will verify this opportunity independently.
                            </span>
                        </label>

                        <button
                            disabled={!agreed}
                            className={`w-full py-3 rounded-xl font-semibold text-base transition-all ${agreed
                                ? "btn-green"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Send My Interest ✅
                        </button>

                        <p className="text-[11px] text-gray-400 text-center mt-3">
                            Please login first to send your interest
                        </p>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
