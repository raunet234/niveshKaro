"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langDropdown, setLangDropdown] = useState(false);
    const [loginDropdown, setLoginDropdown] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-hero border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-18">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">N</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-heading font-bold text-lg leading-tight tracking-tight">
                                NiveshMitra
                            </span>
                            <span className="text-primary-300 text-[10px] leading-tight hidden sm:block">
                                Discover Smart Investments
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link
                            href="/select-location"
                            className="text-white/80 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
                        >
                            Explore
                        </Link>
                        <Link
                            href="/#how-it-works"
                            className="text-white/80 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="/learn"
                            className="text-white/80 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
                        >
                            Learn
                        </Link>
                        <Link
                            href="/risk-quiz"
                            className="text-white/80 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
                        >
                            Risk Quiz
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Language Toggle */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setLangDropdown(!langDropdown);
                                    setLoginDropdown(false);
                                }}
                                className="text-white/70 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10 flex items-center gap-1"
                            >
                                🌐 EN
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {langDropdown && (
                                <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                                    <button className="w-full text-left px-4 py-2.5 text-sm text-primary-700 font-semibold bg-primary-50 hover:bg-primary-100">
                                        🇬🇧 English
                                    </button>
                                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                                        🇮🇳 हिंदी
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Login Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setLoginDropdown(!loginDropdown);
                                    setLangDropdown(false);
                                }}
                                className="btn-primary !py-2 !px-5 !text-sm !rounded-xl"
                            >
                                Login / Register
                            </button>
                            {loginDropdown && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                    <Link
                                        href="/auth/investor"
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 transition-colors"
                                        onClick={() => setLoginDropdown(false)}
                                    >
                                        <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-lg">
                                            👤
                                        </span>
                                        <div>
                                            <div className="font-semibold text-primary-800">Investor Login</div>
                                            <div className="text-xs text-gray-500">Explore opportunities</div>
                                        </div>
                                    </Link>
                                    <div className="border-t border-gray-100 my-1" />
                                    <Link
                                        href="/business/register"
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 transition-colors"
                                        onClick={() => setLoginDropdown(false)}
                                    >
                                        <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lg">
                                            🏢
                                        </span>
                                        <div>
                                            <div className="font-semibold text-primary-800">Business Login</div>
                                            <div className="text-xs text-gray-500">List your business</div>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 tap-target"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-primary-950/98 backdrop-blur-xl border-t border-white/10">
                    <div className="px-4 py-4 space-y-1">
                        <Link
                            href="/select-location"
                            className="block text-white/80 hover:text-white px-4 py-3 rounded-xl text-base font-medium hover:bg-white/10 tap-target"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            🔍 Explore Opportunities
                        </Link>
                        <Link
                            href="/#how-it-works"
                            className="block text-white/80 hover:text-white px-4 py-3 rounded-xl text-base font-medium hover:bg-white/10 tap-target"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            📋 How It Works
                        </Link>
                        <Link
                            href="/learn"
                            className="block text-white/80 hover:text-white px-4 py-3 rounded-xl text-base font-medium hover:bg-white/10 tap-target"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            📚 Learn
                        </Link>
                        <Link
                            href="/risk-quiz"
                            className="block text-white/80 hover:text-white px-4 py-3 rounded-xl text-base font-medium hover:bg-white/10 tap-target"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            🎯 Risk Quiz
                        </Link>
                        <div className="border-t border-white/10 my-3" />
                        <Link
                            href="/auth/investor"
                            className="block text-center btn-green !w-full !rounded-xl tap-target"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            👤 Investor Login
                        </Link>
                        <Link
                            href="/business/register"
                            className="block text-center btn-secondary !w-full !rounded-xl !border-white/20 !text-white !bg-white/10 hover:!bg-white/20 tap-target mt-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            🏢 Business Login
                        </Link>
                        <div className="flex items-center gap-2 mt-3 px-4">
                            <button className="text-sm text-primary-300 font-medium py-1 px-3 rounded-lg bg-white/10">
                                EN
                            </button>
                            <button className="text-sm text-white/60 font-medium py-1 px-3 rounded-lg hover:bg-white/10">
                                हिंदी
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
