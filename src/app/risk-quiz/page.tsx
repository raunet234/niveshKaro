"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const QUESTIONS = [
    {
        id: 1,
        question: "If you put ₹1 Lakh somewhere and it drops to ₹80,000 in 1 month, what would you do?",
        options: [
            { emoji: "😰", text: "Take my money out immediately — can't handle this", score: 1 },
            { emoji: "🤔", text: "Wait and watch for a few months", score: 2 },
            { emoji: "💪", text: "Put in ₹20,000 more — it'll come back!", score: 3 },
        ],
    },
    {
        id: 2,
        question: "How long can you keep your money invested without needing it?",
        options: [
            { emoji: "⏰", text: "Less than 1 year", score: 1 },
            { emoji: "📅", text: "1-3 years", score: 2 },
            { emoji: "📆", text: "3-10 years", score: 3 },
            { emoji: "🔒", text: "10+ years — I won't need this money for a long time", score: 4 },
        ],
    },
    {
        id: 3,
        question: "What is your age group?",
        options: [
            { emoji: "🧑‍🎓", text: "18-25", score: 4 },
            { emoji: "💼", text: "25-35", score: 3 },
            { emoji: "👨‍👩‍👧‍👦", text: "35-50", score: 2 },
            { emoji: "🧓", text: "50+", score: 1 },
        ],
    },
    {
        id: 4,
        question: "What is your monthly household income (approximately)?",
        options: [
            { emoji: "💵", text: "Below ₹25,000", score: 1 },
            { emoji: "💰", text: "₹25,000 - ₹50,000", score: 2 },
            { emoji: "💎", text: "₹50,000 - ₹1,00,000", score: 3 },
            { emoji: "🏆", text: "₹1,00,000+", score: 4 },
        ],
    },
    {
        id: 5,
        question: "Do you have an emergency fund? (6 months of expenses saved separately that you won't invest)",
        options: [
            { emoji: "❌", text: "No, I don't have one", score: 1 },
            { emoji: "🟡", text: "Yes, partially — I have some savings", score: 2 },
            { emoji: "✅", text: "Yes, fully — I have 6+ months expenses saved", score: 3 },
        ],
    },
    {
        id: 6,
        question: "What matters more to you?",
        options: [
            { emoji: "🛡️", text: "Keeping my money safe — I cannot afford to lose any", score: 1 },
            { emoji: "⚖️", text: "A mix of safety and growth", score: 2 },
            { emoji: "🚀", text: "Maximum growth — I'm willing to accept some losses", score: 3 },
        ],
    },
];

const PROFILES = {
    conservative: {
        emoji: "🟢",
        title: "SAFE & STEADY",
        subtitle: "Explorer",
        desc: "You prefer safety and stability. Slow, steady growth is your comfort zone. You're not comfortable with large ups and downs in your investment value.",
        color: "#10b981",
        allocation: [
            { name: "Fixed Returns (FD, PPF)", pct: 40, color: "#10b981" },
            { name: "Government Bonds", pct: 25, color: "#3b82f6" },
            { name: "Gold", pct: 15, color: "#f59e0b" },
            { name: "Mutual Funds (Debt)", pct: 15, color: "#8b5cf6" },
            { name: "Real Estate", pct: 5, color: "#ef4444" },
        ],
    },
    balanced: {
        emoji: "🟡",
        title: "BALANCED",
        subtitle: "Explorer",
        desc: "You can handle moderate ups and downs for better returns. You like a mix of safe and growth-oriented opportunities.",
        color: "#f59e0b",
        allocation: [
            { name: "Real Estate", pct: 35, color: "#ef4444" },
            { name: "Mutual Funds", pct: 25, color: "#8b5cf6" },
            { name: "Fixed Returns", pct: 20, color: "#10b981" },
            { name: "Gold", pct: 10, color: "#f59e0b" },
            { name: "Local Business", pct: 10, color: "#3b82f6" },
        ],
    },
    aggressive: {
        emoji: "🔴",
        title: "GROWTH-ORIENTED",
        subtitle: "Explorer",
        desc: "You're willing to take higher risks for maximum growth. You understand that investments can go up and down significantly, and you're okay with that.",
        color: "#ef4444",
        allocation: [
            { name: "Stocks & Equity MF", pct: 35, color: "#8b5cf6" },
            { name: "Startups & Business", pct: 25, color: "#3b82f6" },
            { name: "Real Estate", pct: 20, color: "#ef4444" },
            { name: "Crypto/Commodities", pct: 10, color: "#f59e0b" },
            { name: "Fixed Returns", pct: 10, color: "#10b981" },
        ],
    },
};

export default function RiskQuizPage() {
    const router = useRouter();
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleAnswer = (score: number) => {
        setSelectedOption(score);
        setTimeout(() => {
            const newAnswers = [...answers, score];
            setAnswers(newAnswers);
            setSelectedOption(null);

            if (currentQ < QUESTIONS.length - 1) {
                setCurrentQ(currentQ + 1);
            } else {
                setShowResult(true);
            }
        }, 500);
    };

    const totalScore = answers.reduce((a, b) => a + b, 0);
    const maxScore = QUESTIONS.reduce((a, q) => a + Math.max(...q.options.map((o) => o.score)), 0);
    const profile =
        totalScore <= maxScore * 0.35
            ? "conservative"
            : totalScore <= maxScore * 0.65
                ? "balanced"
                : "aggressive";

    const profileData = PROFILES[profile as keyof typeof PROFILES];

    const handleRetake = () => {
        setCurrentQ(0);
        setAnswers([]);
        setShowResult(false);
        setSelectedOption(null);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-surface-light pt-20 pb-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6">
                    {!showResult ? (
                        <>
                            {/* Back Button */}
                            <div className="pt-2 mb-4">
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
                            <div className="text-center mb-8">
                                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-950 mb-2">
                                    Understand Your Risk Comfort Level 🎯
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    Answer 6 simple questions. This is for your own understanding — not financial advice.
                                </p>
                            </div>

                            {/* Progress */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-primary-700">
                                        Question {currentQ + 1} of {QUESTIONS.length}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {Math.round(((currentQ) / QUESTIONS.length) * 100)}% complete
                                    </span>
                                </div>
                                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
                                        style={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Question */}
                            <div className="animate-in">
                                <div className="glass-card-light rounded-2xl p-6 sm:p-8 mb-6">
                                    <h2 className="font-heading font-bold text-lg sm:text-xl text-primary-950 mb-6 leading-snug">
                                        {QUESTIONS[currentQ].question}
                                    </h2>

                                    <div className="space-y-3">
                                        {QUESTIONS[currentQ].options.map((option, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleAnswer(option.score)}
                                                className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all tap-target ${selectedOption === option.score
                                                    ? "border-primary-500 bg-primary-50 scale-[0.98]"
                                                    : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{option.emoji}</span>
                                                    <span className="text-sm sm:text-base font-medium text-gray-800">
                                                        {option.text}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* RESULT */
                        <div className="pt-8 animate-in">
                            <div className="text-center mb-8">
                                <div className="text-6xl mb-4">{profileData.emoji}</div>
                                <p className="text-sm text-gray-500 mb-2">Based on your answers...</p>
                                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl mb-1" style={{ color: profileData.color }}>
                                    {profileData.title}
                                </h1>
                                <p className="font-heading font-semibold text-lg text-primary-900 mb-4">
                                    {profileData.subtitle}
                                </p>
                                <p className="text-sm text-gray-600 max-w-md mx-auto">{profileData.desc}</p>
                            </div>

                            {/* Allocation */}
                            <div className="glass-card-light rounded-2xl p-6 mb-6">
                                <h3 className="font-heading font-bold text-base text-primary-900 mb-4 text-center">
                                    People like you often explore:
                                </h3>

                                {/* Bar chart */}
                                <div className="space-y-3 mb-4">
                                    {profileData.allocation.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-sm text-gray-700 w-40 text-right flex-shrink-0">
                                                {item.name}
                                            </span>
                                            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-1000"
                                                    style={{
                                                        width: `${item.pct}%`,
                                                        background: item.color,
                                                    }}
                                                />
                                            </div>
                                            <span className="text-sm font-bold w-10" style={{ color: item.color }}>
                                                {item.pct}%
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-[11px] text-gray-400 text-center">
                                    This is based on general patterns, not personalized financial advice. Consult a financial advisor for personal guidance.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    href={`/dashboard?risk=${profile}`}
                                    className="btn-green !py-4 !text-base !rounded-2xl flex-1 text-center"
                                >
                                    Explore Matching Opportunities →
                                </Link>
                                <button onClick={handleRetake} className="btn-secondary !py-4 !text-base !rounded-2xl flex-1">
                                    🔄 Retake Quiz
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
