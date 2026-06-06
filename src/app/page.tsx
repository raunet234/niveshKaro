"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ================================================================
   ANIMATED COUNTER COMPONENT
   ================================================================ */
function AnimatedCounter({
    target,
    suffix = "",
    prefix = "",
    duration = 2000,
}: {
    target: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const animated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated.current) {
                    animated.current = true;
                    const start = Date.now();
                    const step = () => {
                        const progress = Math.min((Date.now() - start) / duration, 1);
                        setCount(Math.floor(progress * target));
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return (
        <div ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white">
            {prefix}
            {count.toLocaleString("en-IN")}
            {suffix}
        </div>
    );
}

/* ================================================================
   FAQ ACCORDION ITEM
   ================================================================ */
function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-gray-200">
            <button
                className="w-full flex items-center justify-between py-5 text-left tap-target"
                onClick={() => setOpen(!open)}
            >
                <span className="text-base sm:text-lg font-semibold text-primary-900 pr-4">{question}</span>
                <span
                    className={`text-primary-500 text-2xl flex-shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""
                        }`}
                >
                    +
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"
                    }`}
            >
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{answer}</p>
            </div>
        </div>
    );
}

/* ================================================================
   FEATURED LISTING CARD
   ================================================================ */
function FeaturedCard({
    title,
    city,
    state,
    returnPct,
    riskLevel,
    riskScore,
    verified,
    category,
    emoji,
}: {
    title: string;
    city: string;
    state: string;
    returnPct: string;
    riskLevel: string;
    riskScore: number;
    verified: boolean;
    category: string;
    emoji: string;
}) {
    const riskColor =
        riskScore <= 3 ? "#10b981" : riskScore <= 6 ? "#f59e0b" : "#ef4444";
    return (
        <div className="listing-card card-hover group">
            {/* Top colored band */}
            <div className="h-2 w-full" style={{ background: riskColor }} />
            <div className="p-5">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {verified && (
                        <span className="badge-verified">✅ Verified</span>
                    )}
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                        {emoji} {category}
                    </span>
                </div>
                {/* Title */}
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary-950 mb-1 group-hover:text-primary-700 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                    📍 {city}, {state}
                </p>
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green-50 rounded-xl p-3">
                        <div className="text-xs text-gray-500 mb-1">Return Offered</div>
                        <div className="text-lg font-bold text-green-700">{returnPct}</div>
                    </div>
                    <div className="rounded-xl p-3" style={{ backgroundColor: `${riskColor}15` }}>
                        <div className="text-xs text-gray-500 mb-1">Risk Level</div>
                        <div className="text-lg font-bold" style={{ color: riskColor }}>
                            {riskLevel}
                        </div>
                    </div>
                </div>
                {/* Risk Bar */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-gray-500">Risk:</span>
                    <div className="flex-1 risk-bar">
                        <div
                            className="risk-bar-fill"
                            style={{ width: `${riskScore * 10}%`, background: riskColor }}
                        />
                    </div>
                    <span className="text-xs font-semibold" style={{ color: riskColor }}>
                        {riskScore}/10
                    </span>
                </div>
                {/* CTA */}
                <Link
                    href="/listing/sample"
                    className="block text-center btn-primary !py-2.5 !text-sm !rounded-xl w-full"
                >
                    View Details →
                </Link>
                <p className="text-[11px] text-gray-400 text-center mt-2">
                    ℹ️ Information only — verify independently
                </p>
            </div>
        </div>
    );
}

/* ================================================================
   CATEGORY CARD
   ================================================================ */
function CategoryCard({
    emoji,
    title,
    count,
}: {
    emoji: string;
    title: string;
    count: number;
}) {
    return (
        <Link
            href={`/dashboard?category=${title.toLowerCase().replace(/ /g, "-")}`}
            className="glass-card-light rounded-2xl p-5 sm:p-6 text-center card-hover group tap-target"
        >
            <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {emoji}
            </div>
            <h3 className="font-heading font-semibold text-sm sm:text-base text-primary-900 mb-1">
                {title}
            </h3>
            <p className="text-xs text-gray-500">{count}+ opportunities</p>
        </Link>
    );
}

/* ================================================================
   STATE CARD FOR MAP SECTION
   ================================================================ */
function StateCard({
    name,
    count,
    popular,
}: {
    name: string;
    count: number;
    popular?: boolean;
}) {
    return (
        <Link
            href={`/select-location?state=${name.toLowerCase().replace(/ /g, "-")}`}
            className="flex items-center justify-between bg-white/8 hover:bg-white/15 rounded-xl px-4 py-3 transition-all group tap-target"
        >
            <span className="text-white/80 group-hover:text-white text-sm font-medium">{name}</span>
            <div className="flex items-center gap-2">
                {popular && <span className="badge-popular !text-[10px] !py-0.5">🔥 Popular</span>}
                <span className="text-primary-300 text-xs">{count} opportunities</span>
            </div>
        </Link>
    );
}

/* ================================================================
   TESTIMONIAL CARD
   ================================================================ */
function TestimonialCard({
    name,
    role,
    location,
    text,
    rating,
}: {
    name: string;
    role: string;
    location: string;
    text: string;
    rating: number;
}) {
    return (
        <div className="glass-card-light rounded-2xl p-6 card-hover">
            <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">&ldquo;{text}&rdquo;</p>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                    {name[0]}
                </div>
                <div>
                    <div className="font-semibold text-sm text-primary-900">{name}</div>
                    <div className="text-xs text-gray-500">
                        {role} • {location}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ================================================================
   LANDING PAGE
   ================================================================ */
export default function LandingPage() {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 600);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Navbar />

            {/* ============================================================
          HERO SECTION — Wealthfront-Inspired Split Layout
          ============================================================ */}
            <section className="bg-gradient-hero relative overflow-hidden min-h-[90vh] flex items-center pt-20">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary-400/15 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* LEFT — Text Content */}
                        <div className="text-center lg:text-left">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/10">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-primary-200 text-sm font-medium">
                                    India&apos;s First Investment Discovery Platform 🇮🇳
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-heading font-extrabold text-white mb-5 leading-[1.1]">
                                Discover Smart{" "}
                                <span className="bg-gradient-to-r from-primary-300 via-primary-200 to-purple-300 bg-clip-text text-transparent">
                                    Investment
                                </span>{" "}
                                Opportunities
                            </h1>
                            <p className="text-base sm:text-lg text-white/70 mb-6 max-w-xl leading-relaxed">
                                Browse verified investment options in your city. See risk, returns, and track record — all in one place. You decide, you directly connect.
                            </p>

                            {/* Bullet features — Wealthfront style */}
                            <div className="space-y-3 mb-8">
                                {[
                                    "Pan-India verified opportunities",
                                    "Free for investors — no hidden charges",
                                    "Direct connection with business owners",
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <span className="text-white/80 text-[15px]">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-5">
                                <Link
                                    href="/select-location"
                                    className="btn-green !text-base !py-4 !px-8 !rounded-2xl w-full sm:w-auto group"
                                >
                                    Get started
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/business/register"
                                    className="btn-secondary !text-base !py-4 !px-8 !rounded-2xl !border-white/20 !text-white !bg-white/10 hover:!bg-white/20 w-full sm:w-auto"
                                >
                                    List Your Business
                                </Link>
                            </div>

                            {/* Fine print — Wealthfront style */}
                            <p className="text-white/30 text-xs leading-relaxed max-w-lg mx-auto lg:mx-0">
                                All investments happen directly between you and the business. NiveshMitra only helps you discover and connect. Not financial advice.
                            </p>
                        </div>

                        {/* RIGHT — Phone Mockup */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative">
                                {/* Glow behind phone */}
                                <div className="absolute -inset-8 bg-primary-500/20 rounded-[60px] blur-3xl" />

                                {/* Phone Device Frame */}
                                <div className="relative w-[280px] sm:w-[320px] h-[570px] sm:h-[650px] bg-gray-900 rounded-[40px] p-[10px] shadow-2xl shadow-black/40 border border-white/10">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-10" />
                                    {/* Screen */}
                                    <div className="w-full h-full bg-gradient-to-b from-primary-950 via-primary-900 to-primary-800 rounded-[30px] overflow-hidden relative">
                                        {/* Status bar */}
                                        <div className="flex items-center justify-between px-6 pt-8 pb-3">
                                            <span className="text-white/60 text-[10px] font-medium">9:41</span>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-3 h-3 text-white/60" fill="currentColor" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4l2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" /></svg>
                                                <svg className="w-3 h-3 text-white/60" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" /></svg>
                                            </div>
                                        </div>

                                        {/* App Header */}
                                        <div className="px-5 pb-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">N</span>
                                                </div>
                                                <span className="text-white font-heading font-bold text-sm">NiveshMitra</span>
                                            </div>
                                        </div>

                                        {/* Portfolio Value Card */}
                                        <div className="mx-4 bg-white/8 backdrop-blur-sm rounded-2xl p-4 mb-3 border border-white/10">
                                            <div className="text-primary-300 text-[10px] font-medium mb-0.5">Your Portfolio</div>
                                            <div className="text-white font-heading font-bold text-2xl mb-0.5">₹15,00,000</div>
                                            <div className="text-primary-300 text-[10px]">Net worth as of today</div>
                                            {/* mini sparkline */}
                                            <svg className="w-full h-8 mt-2" viewBox="0 0 200 30" fill="none">
                                                <path d="M0 25 Q30 20, 50 15 T100 12 T150 8 T200 5" stroke="#a78bfa" strokeWidth="2" fill="none" />
                                                <path d="M0 25 Q30 20, 50 15 T100 12 T150 8 T200 5 V30 H0Z" fill="url(#sparkGrad)" opacity="0.3" />
                                                <defs>
                                                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#a78bfa" />
                                                        <stop offset="100%" stopColor="transparent" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>

                                        {/* Investment Items */}
                                        <div className="px-4 space-y-2">
                                            {[
                                                { icon: "🏠", name: "Real Estate", sub: "Sharma Builders", value: "₹5,00,000", ret: "+12%", color: "#10b981" },
                                                { icon: "📈", name: "Mutual Funds", sub: "SBI Blue Chip", value: "₹3,50,000", ret: "+14.2%", color: "#3b82f6" },
                                                { icon: "🏦", name: "Fixed Deposit", sub: "Post Office FD", value: "₹3,00,000", ret: "+7.5%", color: "#8b5cf6" },
                                                { icon: "🥇", name: "Gold SGB", sub: "Sovereign Bond", value: "₹2,00,000", ret: "+8.8%", color: "#f59e0b" },
                                                { icon: "🌾", name: "Agriculture", sub: "Organic Farms", value: "₹1,50,000", ret: "+15%", color: "#059669" },
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2.5 border border-white/5">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: `${item.color}20` }}>
                                                        {item.icon}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-white text-[11px] font-semibold">{item.name}</div>
                                                        <div className="text-white/40 text-[9px]">{item.sub}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-white text-[11px] font-bold">{item.value}</div>
                                                        <div className="text-[9px] font-semibold" style={{ color: item.color }}>{item.ret}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Bottom nav */}
                                        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-3 bg-primary-950/80 backdrop-blur-md border-t border-white/5">
                                            {["🏠", "🔍", "📊", "👤"].map((icon, i) => (
                                                <span key={i} className={`text-sm ${i === 0 ? "opacity-100" : "opacity-40"}`}>{icon}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave separator */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 40C240 80 480 10 720 40C960 70 1200 20 1440 40V100H0V40Z" fill="#1a1052" />
                    </svg>
                </div>
            </section>

            {/* ============================================================
          SOCIAL PROOF STATS BAR — Like Wealthfront's Bankrate/stats row
          ============================================================ */}
            <section className="bg-gradient-hero py-8 border-b border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-6 flex-wrap">
                        {[
                            { value: "500+", label: "Cities Covered" },
                            { value: "10,000+", label: "Investors Exploring" },
                            { value: "₹50Cr+", label: "Opportunities Listed" },
                            { value: "4.8 ★", label: "User Rating" },
                            { value: "100%", label: "Free for Investors" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center flex-1 min-w-[100px]">
                                <div className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">{stat.value}</div>
                                <div className="text-[11px] sm:text-xs text-white/50 mt-0.5">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
          HOW IT WORKS — INVESTORS
          ============================================================ */}
            <section id="how-it-works" className="py-20 sm:py-28 bg-surface-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="section-label mb-3">FOR INVESTORS</div>
                        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-primary-950 mb-4 leading-tight">
                            Start discovering in{" "}
                            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">4 simple steps</span>
                        </h2>
                        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                            No complex forms. No financial jargon. Just straightforward investment discovery.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                        {[
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                ),
                                step: "01",
                                title: "Select your State & City",
                                desc: "Choose from all 28 states + 8 union territories across India",
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                ),
                                step: "02",
                                title: "Set your budget & risk comfort",
                                desc: 'Simple options like "₹1 Lakh – ₹5 Lakh" and "Safe & Steady"',
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                ),
                                step: "03",
                                title: "Discover verified opportunities",
                                desc: "Browse listings with transparent risk, return, and verification data",
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                    </svg>
                                ),
                                step: "04",
                                title: "Connect with business owners",
                                desc: "Express interest and the business contacts you within 48 hours",
                            },
                        ].map((item, i) => (
                            <div key={i} className="feature-card-wf text-center relative card-hover">
                                <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-5">
                                    {item.icon}
                                </div>
                                <div className="text-[11px] font-bold text-primary-400 tracking-wider mb-2">{item.step}</div>
                                <h3 className="font-heading font-bold text-base text-primary-950 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-primary-50/60 border border-primary-100/50 rounded-2xl p-5 text-center max-w-3xl mx-auto">
                        <p className="text-sm text-primary-700">
                            All investments happen directly between you and the business. NiveshMitra only helps you discover and connect.
                        </p>
                    </div>
                </div>
            </section>

            {/* ============================================================
          HOW IT WORKS — BUSINESSES
          ============================================================ */}
            <section id="how-it-works-business" className="py-20 sm:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="section-label mb-3">FOR BUSINESSES</div>
                        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-primary-950 mb-4 leading-tight">
                            Reach investors{" "}
                            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">across India</span>
                        </h2>
                        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                            Get your business in front of thousands of verified investors.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                        {[
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                ),
                                step: "01",
                                title: "Register & upload documents",
                                desc: "Create your business profile with verification documents for trust.",
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                    </svg>
                                ),
                                step: "02",
                                title: "List your opportunity",
                                desc: "Add investment details — return, risk, lock-in period & more.",
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>
                                ),
                                step: "03",
                                title: "Get investor inquiries",
                                desc: "Interested investors connect with you directly — grow your business.",
                            },
                        ].map((item, i) => (
                            <div key={i} className="feature-card-wf text-center card-hover">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5">
                                    {item.icon}
                                </div>
                                <div className="text-[11px] font-bold text-blue-400 tracking-wider mb-2">{item.step}</div>
                                <h3 className="font-heading font-bold text-base text-primary-950 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            href="/business/register"
                            className="btn-primary !rounded-2xl !text-base !py-4 !px-10"
                        >
                            List Your Business
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                        <p className="text-sm text-gray-400 mt-4 max-w-md mx-auto">
                            Get verified, build trust, and attract investors from your city and across India.
                        </p>
                    </div>
                </div>
            </section>

            {/* ============================================================
          FEATURED OPPORTUNITIES
          ============================================================ */}
            <section className="py-20 sm:py-28 bg-surface-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <div className="section-label mb-3">POPULAR PICKS</div>
                        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-primary-950 mb-4 leading-tight">
                            Investment opportunities{" "}
                            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">across India</span>
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
                            Showing popular listings — not recommendations. Always verify independently.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeaturedCard
                            title="Sharma Builders — Green Valley Residential"
                            city="Patna"
                            state="Bihar"
                            returnPct="12% / year"
                            riskLevel="MEDIUM"
                            riskScore={4}
                            verified={true}
                            category="Real Estate"
                            emoji="🏠"
                        />
                        <FeaturedCard
                            title="Chai Sutta Bar Franchise Opportunity"
                            city="Jaipur"
                            state="Rajasthan"
                            returnPct="20-30% / year"
                            riskLevel="MED-HIGH"
                            riskScore={6}
                            verified={true}
                            category="Franchise"
                            emoji="🏪"
                        />
                        <FeaturedCard
                            title="Post Office Fixed Deposit"
                            city="All India"
                            state="🇮🇳"
                            returnPct="7.5% / year"
                            riskLevel="VERY LOW"
                            riskScore={1}
                            verified={true}
                            category="Government"
                            emoji="🏦"
                        />
                        <FeaturedCard
                            title="SBI Blue Chip Mutual Fund"
                            city="All India"
                            state="🇮🇳"
                            returnPct="12-15% / year"
                            riskLevel="MEDIUM"
                            riskScore={5}
                            verified={true}
                            category="Mutual Funds"
                            emoji="📈"
                        />
                        <FeaturedCard
                            title="Greenfield Organic Farms — Land Lease"
                            city="Nagpur"
                            state="Maharashtra"
                            returnPct="15% / year"
                            riskLevel="MEDIUM"
                            riskScore={5}
                            verified={true}
                            category="Agriculture"
                            emoji="🌾"
                        />
                        <FeaturedCard
                            title="Sovereign Gold Bond 2026-27"
                            city="All India"
                            state="🇮🇳"
                            returnPct="2.5% + Gold Price"
                            riskLevel="LOW"
                            riskScore={2}
                            verified={true}
                            category="Gold"
                            emoji="🥇"
                        />
                    </div>

                    <div className="text-center mt-10">
                        <Link href="/select-location" className="btn-primary !rounded-2xl !py-3.5 !px-8">
                            Explore All Opportunities →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================================
          STATS SECTION (Animated Counters)
          ============================================================ */}
            <section className="bg-gradient-hero py-16 sm:py-20 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary-400/15 rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div>
                            <AnimatedCounter target={500} suffix="+" />
                            <p className="text-primary-300 text-sm sm:text-base mt-2">Businesses Listed</p>
                        </div>
                        <div>
                            <AnimatedCounter target={10000} suffix="+" />
                            <p className="text-primary-300 text-sm sm:text-base mt-2">Investors Exploring</p>
                        </div>
                        <div>
                            <AnimatedCounter target={50} prefix="₹" suffix=" Cr+" />
                            <p className="text-primary-300 text-sm sm:text-base mt-2">Connections Facilitated</p>
                        </div>
                        <div>
                            <AnimatedCounter target={36} />
                            <p className="text-primary-300 text-sm sm:text-base mt-2">States & UTs Covered</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
          PAN-INDIA COVERAGE
          ============================================================ */}
            <section className="bg-gradient-hero py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-3">
                            Investment Opportunities From Every Corner of India 🇮🇳
                        </h2>
                        <p className="text-primary-300 text-sm sm:text-base">
                            All 28 states + 8 union territories. Click on any state to explore.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {[
                            {
                                region: "🏔️ North India",
                                states: [
                                    { name: "Delhi", count: 89, popular: true },
                                    { name: "Uttar Pradesh", count: 76, popular: true },
                                    { name: "Haryana", count: 54, popular: true },
                                    { name: "Rajasthan", count: 61, popular: true },
                                    { name: "Punjab", count: 38 },
                                    { name: "Himachal Pradesh", count: 15 },
                                    { name: "Uttarakhand", count: 22 },
                                    { name: "Jammu & Kashmir", count: 12 },
                                    { name: "Ladakh", count: 3 },
                                    { name: "Chandigarh", count: 18 },
                                ],
                            },
                            {
                                region: "🌊 West India",
                                states: [
                                    { name: "Maharashtra", count: 120, popular: true },
                                    { name: "Gujarat", count: 85, popular: true },
                                    { name: "Goa", count: 28 },
                                    { name: "Dadra & Nagar Haveli", count: 5 },
                                ],
                            },
                            {
                                region: "🌴 South India",
                                states: [
                                    { name: "Karnataka", count: 95, popular: true },
                                    { name: "Tamil Nadu", count: 78, popular: true },
                                    { name: "Telangana", count: 72, popular: true },
                                    { name: "Kerala", count: 45, popular: true },
                                    { name: "Andhra Pradesh", count: 42 },
                                    { name: "Puducherry", count: 8 },
                                    { name: "Lakshadweep", count: 2 },
                                    { name: "Andaman & Nicobar", count: 4 },
                                ],
                            },
                            {
                                region: "🏛️ East India",
                                states: [
                                    { name: "West Bengal", count: 58, popular: true },
                                    { name: "Bihar", count: 52, popular: true },
                                    { name: "Odisha", count: 28 },
                                    { name: "Jharkhand", count: 22 },
                                ],
                            },
                            {
                                region: "🌿 Central India",
                                states: [
                                    { name: "Madhya Pradesh", count: 42 },
                                    { name: "Chhattisgarh", count: 18 },
                                ],
                            },
                            {
                                region: "🏔️ Northeast India",
                                states: [
                                    { name: "Assam", count: 15 },
                                    { name: "Tripura", count: 6 },
                                    { name: "Meghalaya", count: 5 },
                                    { name: "Manipur", count: 4 },
                                    { name: "Nagaland", count: 3 },
                                    { name: "Arunachal Pradesh", count: 3 },
                                    { name: "Mizoram", count: 2 },
                                    { name: "Sikkim", count: 4 },
                                ],
                            },
                        ].map((region) => (
                            <div key={region.region}>
                                <h3 className="text-lg font-heading font-semibold text-primary-200 mb-3">
                                    {region.region}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {region.states.map((state) => (
                                        <StateCard key={state.name} {...state} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
          CATEGORIES SECTION
          ============================================================ */}
            <section className="py-20 sm:py-28 bg-surface-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <div className="section-label mb-3">CATEGORIES</div>
                        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-primary-950 mb-4 leading-tight">
                            Explore by category
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
                            Discover opportunities across 8 major investment categories
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        <CategoryCard emoji="🏠" title="Real Estate & Builders" count={180} />
                        <CategoryCard emoji="🏪" title="Local Business & Franchise" count={120} />
                        <CategoryCard emoji="🏦" title="Fixed Returns & NBFCs" count={85} />
                        <CategoryCard emoji="📈" title="Stocks & Mutual Funds" count={200} />
                        <CategoryCard emoji="🥇" title="Gold & Commodities" count={45} />
                        <CategoryCard emoji="🌾" title="Agriculture & Land" count={60} />
                        <CategoryCard emoji="🏗️" title="Infrastructure Projects" count={35} />
                        <CategoryCard emoji="💻" title="Startups & Tech" count={50} />
                    </div>
                </div>
            </section>

            {/* ============================================================
          TRUST & SAFETY SECTION
          ============================================================ */}
            <section className="py-20 sm:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <div className="section-label mb-3">TRUST & SAFETY</div>
                        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-primary-950 mb-4 leading-tight">
                            Built on{" "}
                            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">trust & transparency</span>
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                            Your safety is our priority. Here&apos;s how we ensure a transparent experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                icon: "✅",
                                title: "Verified Businesses",
                                desc: "Businesses submit documents for verification — GST, PAN, registration certificates",
                            },
                            {
                                icon: "📊",
                                title: "Transparent Data",
                                desc: "Every listing shows risk score, return offered, business age, and verification status",
                            },
                            {
                                icon: "🔒",
                                title: "Secure & Encrypted",
                                desc: "Your personal data is encrypted and secure. We never share without your consent",
                            },
                            {
                                icon: "⚖️",
                                title: "Discovery Only",
                                desc: "We are a discovery platform — we don't handle your money or process investments",
                            },
                            {
                                icon: "📞",
                                title: "Direct Connection",
                                desc: "You deal directly with the business owner. No middlemen, no hidden charges",
                            },
                            {
                                icon: "📚",
                                title: "Education First",
                                desc: "Free learning resources, risk quiz, and comparison tools to help you understand",
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl hover:bg-primary-50/50 transition-colors">
                                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                <div>
                                    <h3 className="font-heading font-semibold text-base text-primary-900 mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
          TESTIMONIALS
          ============================================================ */}
            <section className="py-20 sm:py-28 bg-surface-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <div className="section-label mb-3">TESTIMONIALS</div>
                        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-primary-950 leading-tight">
                            What people are saying
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <TestimonialCard
                            name="Rajesh Kumar"
                            role="Investor"
                            location="Patna, Bihar"
                            text="NiveshMitra helped me discover a verified builder project in my own city. I compared it with FDs and made an informed decision. Very simple to use!"
                            rating={5}
                        />
                        <TestimonialCard
                            name="Priya Sharma"
                            role="Business Owner"
                            location="Jaipur, Rajasthan"
                            text="Listed my franchise opportunity and got 23 genuine investor inquiries in the first month. The verification badge really builds trust."
                            rating={5}
                        />
                        <TestimonialCard
                            name="Amit Patel"
                            role="Investor"
                            location="Ahmedabad, Gujarat"
                            text="Finally, a platform that shows investment options for common people in simple language. The risk quiz helped me understand my comfort level."
                            rating={4}
                        />
                    </div>
                </div>
            </section>

            {/* ============================================================
          FAQ SECTION
          ============================================================ */}
            <section className="py-20 sm:py-28 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <div className="section-label mb-3">FAQ</div>
                        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-primary-950 mb-4 leading-tight">
                            Frequently asked questions
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base">
                            Got questions? We have answers.
                        </p>
                    </div>

                    <div>
                        <FAQItem
                            question="What is NiveshMitra?"
                            answer="NiveshMitra is India's first pan-India investment discovery platform. Think of it like '99acres for Investments' — we help you discover verified investment opportunities in your city and across India, compare them, and connect directly with business owners. We don't handle money or give financial advice."
                        />
                        <FAQItem
                            question="Is NiveshMitra free for investors?"
                            answer="Yes! NiveshMitra is 100% free for investors. You can browse, compare, take the risk quiz, read articles, and send inquiries — all for free. No hidden charges."
                        />
                        <FAQItem
                            question="Does NiveshMitra handle my investment money?"
                            answer="No. NiveshMitra is a discovery platform. We help you find opportunities and connect with businesses. All investment decisions and money transfers happen directly between you and the business owner. We never touch your money."
                        />
                        <FAQItem
                            question="How does NiveshMitra verify businesses?"
                            answer="Businesses submit documents like GST certificate, PAN card, business registration, and bank statements. Our team reviews these documents and verifies the business exists. However, we do NOT verify or guarantee investment returns. Always do your own due diligence."
                        />
                        <FAQItem
                            question="Is my data safe?"
                            answer="Yes. Your data is encrypted and secure. We only share your contact details with a business when you explicitly click 'I'm Interested' and give consent. We never sell your data to third parties."
                        />
                        <FAQItem
                            question="How does NiveshMitra make money?"
                            answer="Businesses pay a subscription fee to list their investment opportunities on the platform. Investors use the platform completely free. That's our business model — simple and transparent."
                        />
                    </div>
                </div>
            </section>

            {/* ============================================================
          CTA SECTION
          ============================================================ */}
            <section className="bg-gradient-hero py-20 sm:py-28 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px]" />
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-white mb-5 leading-tight">
                        Ready to discover smart investment opportunities?
                    </h2>
                    <p className="text-primary-200/70 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of Indians exploring verified investment opportunities
                        in their city. It&apos;s free, simple, and transparent.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/select-location"
                            className="btn-green !text-base !py-4 !px-8 !rounded-2xl w-full sm:w-auto"
                        >
                            Start Exploring — It&apos;s Free →
                        </Link>
                        <Link
                            href="/business/register"
                            className="btn-secondary !border-white/20 !text-white !bg-white/10 hover:!bg-white/20 !text-base !py-4 !px-8 !rounded-2xl w-full sm:w-auto"
                        >
                            List Your Business →
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Back to top button */}
            {showBackToTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-500 transition-all z-40 flex items-center justify-center tap-target"
                    aria-label="Back to top"
                >
                    ↑
                </button>
            )}
        </>
    );
}
