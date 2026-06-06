"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ARTICLES = [
    {
        slug: "what-is-mutual-fund",
        title: "What is Mutual Fund? Samjho 2 minute mein",
        titleHindi: "म्यूचुअल फंड क्या है? 2 मिनट में समझो",
        category: "basics",
        readTime: 3,
        emoji: "📖",
        desc: "A simple, jargon-free explanation of what mutual funds are and how they work. Perfect for beginners.",
    },
    {
        slug: "real-estate-vs-stock-market",
        title: "Real Estate vs Stock Market — Kisme paisa lagayein?",
        titleHindi: "रियल एस्टेट vs शेयर बाज़ार — किसमें पैसा लगाएं?",
        category: "comparison",
        readTime: 5,
        emoji: "🆚",
        desc: "Comparing two of India's most popular investment options. Pros, cons, and who should choose what.",
    },
    {
        slug: "check-business-genuine",
        title: "How to check if a business is genuine before investing",
        titleHindi: "निवेश से पहले बिज़नेस की जांच कैसे करें",
        category: "safety",
        readTime: 4,
        emoji: "🔍",
        desc: "10 practical steps to verify any business before putting your money. Protect yourself from fraud.",
    },
    {
        slug: "what-is-risk",
        title: "What does 'Risk' actually mean? Simple explanation",
        titleHindi: "'जोखिम' का वास्तव में क्या मतलब है?",
        category: "basics",
        readTime: 3,
        emoji: "⚠️",
        desc: "Risk isn't always bad. Learn what it really means and how to think about it like a smart investor.",
    },
    {
        slug: "5-mistakes-first-time",
        title: "5 mistakes first-time investors make",
        titleHindi: "पहली बार निवेश करने वालों की 5 गलतियां",
        category: "tips",
        readTime: 4,
        emoji: "💡",
        desc: "Common mistakes beginners make and how to avoid them. Learn from others' experiences.",
    },
    {
        slug: "how-niveshmitra-verifies",
        title: "How NiveshMitra verifies businesses",
        titleHindi: "NiveshMitra बिज़नेस की जांच कैसे करता है",
        category: "safety",
        readTime: 3,
        emoji: "✅",
        desc: "Our verification process explained step-by-step. What we check and what we don't.",
    },
    {
        slug: "understanding-return-percentage",
        title: "Understanding return percentage — what '12% return' really means",
        titleHindi: "'12% रिटर्न' का वास्तव में क्या मतलब है",
        category: "basics",
        readTime: 4,
        emoji: "📊",
        desc: "Breaking down return percentages in simple terms. Compound interest, simple interest, and real returns.",
    },
    {
        slug: "fd-vs-mf-vs-real-estate",
        title: "Fixed Deposit vs Mutual Fund vs Real Estate — comparison",
        titleHindi: "FD vs म्यूचुअल फंड vs रियल एस्टेट — तुलना",
        category: "comparison",
        readTime: 6,
        emoji: "📈",
        desc: "Side-by-side comparison with real numbers. Which one suits YOUR situation?",
    },
    {
        slug: "spot-fraud-ponzi",
        title: "How to spot a fraud/Ponzi scheme — red flags to watch for",
        titleHindi: "फ्रॉड/पोंजी स्कीम कैसे पहचानें — खतरे के संकेत",
        category: "safety",
        readTime: 5,
        emoji: "🚨",
        desc: "Protect your hard-earned money. Learn the 8 red flags that indicate a potential fraud scheme.",
    },
    {
        slug: "what-is-sip",
        title: "What is SIP? Why everyone is talking about it",
        titleHindi: "SIP क्या है? हर कोई इसकी बात क्यों कर रहा है",
        category: "basics",
        readTime: 3,
        emoji: "💰",
        desc: "Systematic Investment Plan explained. How ₹500/month can build serious wealth over time.",
    },
    {
        slug: "gold-investment",
        title: "Gold investment — physical gold vs digital gold vs SGB",
        titleHindi: "सोने में निवेश — भौतिक सोना vs डिजिटल सोना vs SGB",
        category: "comparison",
        readTime: 5,
        emoji: "🥇",
        desc: "Three ways to invest in gold. Which one is best for you? We break it down with pros and cons.",
    },
    {
        slug: "agriculture-land-investment",
        title: "Agriculture land investment — what you should know",
        titleHindi: "कृषि भूमि में निवेश — आपको क्या जानना चाहिए",
        category: "real_estate",
        readTime: 6,
        emoji: "🌾",
        desc: "Land investment can be lucrative but risky. Learn the legal, financial, and practical aspects.",
    },
];

const CATEGORIES = [
    { value: "all", label: "📖 All Articles", emoji: "📖" },
    { value: "basics", label: "📖 Basics", emoji: "📖" },
    { value: "comparison", label: "🆚 Comparisons", emoji: "🆚" },
    { value: "tips", label: "💡 Tips & Tricks", emoji: "💡" },
    { value: "safety", label: "🛡️ Safety & Scams", emoji: "🛡️" },
    { value: "real_estate", label: "🏠 Real Estate", emoji: "🏠" },
    { value: "market", label: "📈 Market", emoji: "📈" },
];

export default function LearnPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("all");

    const filtered = activeCategory === "all"
        ? ARTICLES
        : ARTICLES.filter((a) => a.category === activeCategory);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-surface-light pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <div className="pt-6">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-500 hover:text-primary-600 text-sm font-medium transition-colors group"
                        >
                            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                    </div>

                    {/* Header */}
                    <div className="text-center py-12">
                        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary-950 mb-3">
                            Learn Before You Earn 📚
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                            Simple, jargon-free articles to help you understand investing.
                            Written for everyone — no finance degree needed.
                        </p>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setActiveCategory(cat.value)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all tap-target ${activeCategory === cat.value
                                    ? "bg-primary-600 text-white shadow-lg"
                                    : "bg-white text-gray-700 border border-gray-200 hover:border-primary-300"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((article) => (
                            <Link
                                key={article.slug}
                                href={`/learn/${article.slug}`}
                                className="listing-card card-hover group"
                            >
                                {/* Thumbnail */}
                                <div className="bg-gradient-to-br from-primary-100 to-primary-50 h-40 flex items-center justify-center">
                                    <span className="text-5xl group-hover:scale-110 transition-transform">{article.emoji}</span>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full capitalize">
                                            {article.category.replace("_", " ")}
                                        </span>
                                        <span className="text-xs text-gray-400">⏱ {article.readTime} min read</span>
                                    </div>
                                    <h3 className="font-heading font-bold text-base text-primary-950 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2">{article.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-16">
                            <span className="text-5xl block mb-4">📭</span>
                            <p className="text-gray-500">No articles in this category yet. Check back soon!</p>
                        </div>
                    )}

                    {/* Disclaimer */}
                    <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
                        <p className="text-sm text-blue-800">
                            📚 All articles are for educational purposes only. Not financial advice.
                            Always consult a certified financial advisor before making investment decisions.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
