"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const COMPARE_DATA = [
    {
        id: "sharma-builders",
        title: "Sharma Builders — Green Valley",
        city: "Patna, Bihar",
        type: "Real Estate",
        verified: true,
        minInvestment: "₹5,00,000",
        returnOffered: "12% / year",
        returnType: "Fixed",
        riskLevel: "MEDIUM (4/10)",
        riskScore: 4,
        lockIn: "5 years",
        businessAge: "8 years",
        interested: "45 people",
        earningSpeed: "Medium",
        payout: "Yearly",
        rating: "⭐ 4.2/5",
        isStandard: false,
    },
    {
        id: "chai-sutta-bar",
        title: "Chai Sutta Bar Franchise",
        city: "Patna, Bihar",
        type: "Franchise",
        verified: true,
        minInvestment: "₹12,00,000",
        returnOffered: "20-30% / year",
        returnType: "Variable",
        riskLevel: "MED-HIGH (6/10)",
        riskScore: 6,
        lockIn: "None",
        businessAge: "2 years",
        interested: "8 people",
        earningSpeed: "Fast 🚀",
        payout: "Monthly",
        rating: "⭐ 4.5/5",
        isStandard: false,
    },
    {
        id: "post-office-fd",
        title: "Post Office Fixed Deposit",
        city: "All India",
        type: "Government",
        verified: true,
        minInvestment: "₹1,000",
        returnOffered: "7.5% / year",
        returnType: "Fixed",
        riskLevel: "VERY LOW (1/10)",
        riskScore: 1,
        lockIn: "5 years",
        businessAge: "140+ years",
        interested: "Crores",
        earningSpeed: "Slow 🐢",
        payout: "At maturity",
        rating: "⭐ Government",
        isStandard: true,
    },
];

const COMPARISON_ROWS = [
    { key: "city", label: "City" },
    { key: "type", label: "Type" },
    { key: "verified", label: "Verified" },
    { key: "minInvestment", label: "Min. Investment" },
    { key: "returnOffered", label: "Return Offered" },
    { key: "returnType", label: "Return Type" },
    { key: "riskLevel", label: "Risk Level" },
    { key: "lockIn", label: "Lock-in Period" },
    { key: "businessAge", label: "Business Age" },
    { key: "interested", label: "People Interested" },
    { key: "earningSpeed", label: "Earning Speed" },
    { key: "payout", label: "Payout" },
    { key: "rating", label: "Rating" },
];

function CompareContent() {
    const router = useRouter();
    const [selected, setSelected] = useState<string[]>(["sharma-builders", "chai-sutta-bar", "post-office-fd"]);

    const selectedData = COMPARE_DATA.filter((d) => selected.includes(d.id));

    return (
        <div className="min-h-screen bg-surface-light pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary-600 text-sm font-medium mb-6 transition-colors group"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-950 mb-2">
                        Compare Investment Opportunities ⚖️
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Side-by-side comparison to help you make informed decisions
                    </p>
                </div>

                {/* Comparison Table */}
                <div className="glass-card-light rounded-2xl overflow-hidden mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="bg-gradient-hero">
                                    <th className="p-4 text-left text-sm font-semibold text-white/70 w-40">Feature</th>
                                    {selectedData.map((d) => (
                                        <th key={d.id} className="p-4 text-left">
                                            <div className="font-heading font-bold text-white text-sm mb-1">{d.title}</div>
                                            <div className="text-primary-300 text-xs">{d.city}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON_ROWS.map((row, i) => (
                                    <tr key={row.key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="p-4 text-sm font-semibold text-primary-800">{row.label}</td>
                                        {selectedData.map((d) => {
                                            const value = d[row.key as keyof typeof d];
                                            let displayValue = typeof value === "boolean" ? (value ? "✅ Yes" : "❌ No") : String(value);

                                            // Color-code risk
                                            let cellClass = "text-sm text-gray-700";
                                            if (row.key === "riskLevel") {
                                                if (d.riskScore <= 2) cellClass = "text-sm font-bold text-green-600";
                                                else if (d.riskScore <= 5) cellClass = "text-sm font-bold text-yellow-600";
                                                else cellClass = "text-sm font-bold text-red-600";
                                            }
                                            if (row.key === "returnOffered") cellClass = "text-sm font-bold text-green-700";

                                            return (
                                                <td key={d.id} className={`p-4 ${cellClass}`}>
                                                    {displayValue}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                                {/* Action Row */}
                                <tr className="bg-primary-50">
                                    <td className="p-4 text-sm font-semibold text-primary-800">Action</td>
                                    {selectedData.map((d) => (
                                        <td key={d.id} className="p-4">
                                            {d.isStandard ? (
                                                <button className="btn-primary !py-2 !px-4 !text-sm !rounded-xl">
                                                    🔗 How to Apply
                                                </button>
                                            ) : (
                                                <button className="btn-green !py-2 !px-4 !text-sm !rounded-xl">
                                                    📞 I&apos;m Interested
                                                </button>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Insight */}
                <div className="glass-card-light rounded-2xl p-5 mb-6">
                    <p className="text-sm text-gray-700">
                        Based on your preferences (Balanced risk, ₹1 Cr budget), similar investors in Patna most
                        frequently explore: <strong className="text-primary-800">Sharma Builders</strong> and{" "}
                        <strong className="text-primary-800">Post Office FD</strong>.
                    </p>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                    <p className="text-sm text-yellow-800">
                        ⚖️ This comparison is for informational purposes. It is not a recommendation.
                        Verify each opportunity independently. Past performance does not guarantee future results.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function ComparePage() {
    return (
        <>
            <Navbar />
            <Suspense
                fallback={
                    <div className="min-h-screen bg-surface-light flex items-center justify-center">
                        <div className="animate-spin w-12 h-12 border-4 border-primary-300 border-t-primary-600 rounded-full" />
                    </div>
                }
            >
                <CompareContent />
            </Suspense>
            <Footer />
        </>
    );
}
