"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ================================================================
   DATA
   ================================================================ */
const REGIONS = [
    {
        name: "🏔️ North India",
        states: [
            { name: "Delhi", code: "DL", isUT: true, popular: true, cities: ["New Delhi", "Dwarka", "Rohini", "Saket", "Janakpuri", "Pitampura", "Lajpat Nagar"] },
            { name: "Uttar Pradesh", code: "UP", popular: true, cities: ["Lucknow", "Noida", "Ghaziabad", "Agra", "Varanasi", "Kanpur", "Prayagraj", "Meerut", "Bareilly", "Aligarh", "Moradabad", "Gorakhpur", "Jhansi", "Mathura", "Firozabad"] },
            { name: "Haryana", code: "HR", popular: true, cities: ["Gurgaon", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar", "Rohtak", "Sonipat", "Yamunanagar"] },
            { name: "Rajasthan", code: "RJ", popular: true, cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bhilwara", "Sikar"] },
            { name: "Punjab", code: "PB", cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur"] },
            { name: "Himachal Pradesh", code: "HP", cities: ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi", "Kullu", "Kangra"] },
            { name: "Uttarakhand", code: "UK", cities: ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Haldwani", "Roorkee", "Rudrapur"] },
            { name: "Jammu & Kashmir", code: "JK", isUT: true, cities: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"] },
            { name: "Ladakh", code: "LA", isUT: true, cities: ["Leh", "Kargil"] },
            { name: "Chandigarh", code: "CH", isUT: true, cities: ["Chandigarh"] },
        ],
    },
    {
        name: "🌊 West India",
        states: [
            { name: "Maharashtra", code: "MH", popular: true, cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Kolhapur", "Navi Mumbai", "Amravati", "Sangli"] },
            { name: "Gujarat", code: "GJ", popular: true, cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar", "Junagadh", "Anand", "Morbi"] },
            { name: "Goa", code: "GA", cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"] },
            { name: "Dadra & Nagar Haveli and Daman & Diu", code: "DD", isUT: true, cities: ["Silvassa", "Daman", "Diu"] },
        ],
    },
    {
        name: "🌴 South India",
        states: [
            { name: "Karnataka", code: "KA", popular: true, cities: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Davangere", "Bellary", "Gulbarga", "Shimoga"] },
            { name: "Tamil Nadu", code: "TN", popular: true, cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thanjavur", "Tiruppur"] },
            { name: "Telangana", code: "TS", popular: true, cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Secunderabad"] },
            { name: "Kerala", code: "KL", popular: true, cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Kannur", "Alappuzha", "Palakkad"] },
            { name: "Andhra Pradesh", code: "AP", cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Kakinada", "Rajahmundry", "Amaravati"] },
            { name: "Puducherry", code: "PY", isUT: true, cities: ["Puducherry", "Karaikal"] },
            { name: "Lakshadweep", code: "LD", isUT: true, cities: ["Kavaratti"] },
            { name: "Andaman & Nicobar Islands", code: "AN", isUT: true, cities: ["Port Blair"] },
        ],
    },
    {
        name: "🏛️ East India",
        states: [
            { name: "West Bengal", code: "WB", popular: true, cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Kharagpur", "Bardhaman", "Malda", "Haldia"] },
            { name: "Bihar", code: "BR", popular: true, cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Chapra"] },
            { name: "Odisha", code: "OD", cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore"] },
            { name: "Jharkhand", code: "JH", cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih"] },
        ],
    },
    {
        name: "🌿 Central India",
        states: [
            { name: "Madhya Pradesh", code: "MP", cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"] },
            { name: "Chhattisgarh", code: "CG", cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon"] },
        ],
    },
    {
        name: "🏔️ Northeast India",
        states: [
            { name: "Assam", code: "AS", cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur"] },
            { name: "Tripura", code: "TR", cities: ["Agartala", "Udaipur", "Dharmanagar"] },
            { name: "Meghalaya", code: "ML", cities: ["Shillong", "Tura", "Jowai"] },
            { name: "Manipur", code: "MN", cities: ["Imphal", "Thoubal", "Bishnupur"] },
            { name: "Nagaland", code: "NL", cities: ["Kohima", "Dimapur", "Mokokchung"] },
            { name: "Arunachal Pradesh", code: "AR", cities: ["Itanagar", "Naharlagun", "Pasighat"] },
            { name: "Mizoram", code: "MZ", cities: ["Aizawl", "Lunglei", "Champhai"] },
            { name: "Sikkim", code: "SK", cities: ["Gangtok", "Namchi", "Gyalshing"] },
        ],
    },
];

const BUDGETS = [
    { label: "₹50,000 - ₹1 Lakh", min: 50000, max: 100000, emoji: "💰" },
    { label: "₹1 Lakh - ₹5 Lakh", min: 100000, max: 500000, emoji: "💰" },
    { label: "₹5 Lakh - ₹25 Lakh", min: 500000, max: 2500000, emoji: "💎" },
    { label: "₹25 Lakh - ₹1 Crore", min: 2500000, max: 10000000, emoji: "💎" },
    { label: "₹1 Crore - ₹5 Crore", min: 10000000, max: 50000000, emoji: "🏆" },
    { label: "₹5 Crore+", min: 50000000, max: null, emoji: "🏆" },
];

const RISK_LEVELS = [
    {
        id: "conservative",
        emoji: "🟢",
        title: "Safe & Steady",
        hindiTitle: "Main apna paisa safe rakhna chahta/chahti hoon",
        desc: "I want my money to be safe. I'm okay with slow growth.",
        color: "#10b981",
        growth: "Slow but steady — like a fixed deposit",
    },
    {
        id: "balanced",
        emoji: "🟡",
        title: "Balanced",
        hindiTitle: "Thoda risk le sakta/sakti hoon better returns ke liye",
        desc: "I can handle some ups and downs for better returns.",
        color: "#f59e0b",
        growth: "Moderate growth — mix of safety and returns",
    },
    {
        id: "aggressive",
        emoji: "🔴",
        title: "High Growth",
        hindiTitle: "Mujhe maximum growth chahiye. Risk samajhta/samajhti hoon",
        desc: "I want maximum growth. I understand the risk.",
        color: "#ef4444",
        growth: "Fast growth possible — but value may go up and down",
    },
];

export default function SelectLocationPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [citySearchQuery, setCitySearchQuery] = useState("");
    const [selectedState, setSelectedState] = useState<{
        name: string;
        code: string;
        cities: string[];
    } | null>(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedBudget, setSelectedBudget] = useState("");
    const [selectedRisk, setSelectedRisk] = useState("");

    // Filter states
    const filteredRegions = useMemo(() => {
        if (!searchQuery) return REGIONS;
        const q = searchQuery.toLowerCase();
        return REGIONS.map((region) => ({
            ...region,
            states: region.states.filter(
                (s) =>
                    s.name.toLowerCase().includes(q) ||
                    s.code.toLowerCase().includes(q)
            ),
        })).filter((r) => r.states.length > 0);
    }, [searchQuery]);

    // Filter cities
    const filteredCities = useMemo(() => {
        if (!selectedState) return [];
        if (!citySearchQuery) return selectedState.cities;
        return selectedState.cities.filter((c) =>
            c.toLowerCase().includes(citySearchQuery.toLowerCase())
        );
    }, [selectedState, citySearchQuery]);

    const handleStateSelect = (state: { name: string; code: string; cities: string[] }) => {
        setSelectedState(state);
        setCitySearchQuery("");
        setStep(2);
    };

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
        setStep(3);
    };

    const handleBudgetSelect = (budget: string) => {
        setSelectedBudget(budget);
        setStep(4);
    };

    const handleRiskSelect = (risk: string) => {
        setSelectedRisk(risk);
    };

    const handleComplete = () => {
        const params = new URLSearchParams({
            state: selectedState?.code || "ALL",
            city: selectedCity || "all",
            budget: selectedBudget,
            risk: selectedRisk,
        });
        router.push(`/dashboard?${params.toString()}`);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-surface-light pt-20 pb-8">
                {/* Progress Bar */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex items-center justify-between mb-2">
                        {["State", "City", "Budget", "Risk"].map((label, i) => (
                            <div key={label} className="flex items-center gap-2">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step > i + 1
                                        ? "bg-green-500 text-white"
                                        : step === i + 1
                                            ? "bg-primary-600 text-white pulse-glow"
                                            : "bg-gray-200 text-gray-500"
                                        }`}
                                >
                                    {step > i + 1 ? "✓" : i + 1}
                                </div>
                                <span
                                    className={`text-sm font-medium hidden sm:block ${step >= i + 1 ? "text-primary-700" : "text-gray-400"
                                        }`}
                                >
                                    {label}
                                </span>
                                {i < 3 && (
                                    <div
                                        className={`w-12 sm:w-24 h-1 rounded-full mx-2 ${step > i + 1 ? "bg-green-500" : "bg-gray-200"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-2">
                        Step {step} of 4
                    </p>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    {/* ===== STEP 1: SELECT STATE ===== */}
                    {step === 1 && (
                        <div className="animate-in">
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
                                    📍 Where do you want to explore?
                                </h1>
                                <p className="text-gray-600 text-sm sm:text-base">
                                    Select your state or union territory to discover local opportunities
                                </p>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <div className="relative max-w-md mx-auto">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                                    <input
                                        type="text"
                                        placeholder="Search for your state or union territory..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none text-base transition-all"
                                    />
                                </div>
                            </div>

                            {/* All India Option */}
                            <button
                                onClick={() => {
                                    setSelectedState({ name: "All India", code: "ALL", cities: ["All Cities"] });
                                    setSelectedCity("All Cities");
                                    setStep(3);
                                }}
                                className="w-full mb-6 glass-card-light rounded-2xl p-5 text-center card-hover tap-target border-2 border-dashed border-primary-200 hover:border-primary-500"
                            >
                                <span className="text-2xl mb-1 block">🌍</span>
                                <span className="font-heading font-semibold text-primary-700 text-base">
                                    All India — Show Pan-India Opportunities
                                </span>
                            </button>

                            {/* State Grid by Region */}
                            {filteredRegions.map((region) => (
                                <div key={region.name} className="mb-6">
                                    <h3 className="font-heading font-semibold text-primary-800 text-base mb-3">
                                        {region.name}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {region.states.map((state) => (
                                            <button
                                                key={state.code}
                                                onClick={() => handleStateSelect(state)}
                                                className="glass-card-light rounded-xl p-4 text-left card-hover tap-target flex items-center justify-between group"
                                            >
                                                <div>
                                                    <div className="font-semibold text-primary-900 text-base group-hover:text-primary-600 transition-colors">
                                                        {state.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-0.5">
                                                        {state.code} {state.isUT ? "• Union Territory" : ""}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {state.popular && (
                                                        <span className="badge-popular !text-[10px] !py-0.5">🔥</span>
                                                    )}
                                                    <span className="text-xs text-primary-500 font-medium">
                                                        {Math.floor(Math.random() * 80 + 10)} listings
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ===== STEP 2: SELECT CITY ===== */}
                    {step === 2 && selectedState && (
                        <div className="animate-in">
                            <button
                                onClick={() => { setStep(1); setSelectedState(null); }}
                                className="text-primary-600 text-sm font-medium mb-4 flex items-center gap-1 hover:text-primary-800 tap-target"
                            >
                                ← Back to States
                            </button>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-950 mb-2">
                                    🏙️ Select your city in {selectedState.name}
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    Choose from major cities and districts
                                </p>
                            </div>

                            <div className="mb-6">
                                <div className="relative max-w-md mx-auto">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                                    <input
                                        type="text"
                                        placeholder={`Search cities in ${selectedState.name}...`}
                                        value={citySearchQuery}
                                        onChange={(e) => setCitySearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none text-base transition-all"
                                    />
                                </div>
                            </div>

                            {/* All Cities in State */}
                            <button
                                onClick={() => handleCitySelect(`All ${selectedState.name}`)}
                                className="w-full mb-4 glass-card-light rounded-xl p-4 text-center card-hover tap-target border border-dashed border-primary-200"
                            >
                                <span className="font-semibold text-primary-700">
                                    🌐 All cities in {selectedState.name}
                                </span>
                            </button>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {filteredCities.map((city) => (
                                    <button
                                        key={city}
                                        onClick={() => handleCitySelect(city)}
                                        className="glass-card-light rounded-xl p-4 text-left card-hover tap-target group"
                                    >
                                        <div className="font-semibold text-primary-900 group-hover:text-primary-600 transition-colors">
                                            {city}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {Math.floor(Math.random() * 40 + 5)} opportunities
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ===== STEP 3: BUDGET ===== */}
                    {step === 3 && (
                        <div className="animate-in">
                            <button
                                onClick={() => setStep(selectedState?.code === "ALL" ? 1 : 2)}
                                className="text-primary-600 text-sm font-medium mb-4 flex items-center gap-1 hover:text-primary-800 tap-target"
                            >
                                ← Back
                            </button>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-950 mb-2">
                                    💰 How much are you thinking of putting in?
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    This helps us show you relevant opportunities. You can always change this later.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                {BUDGETS.map((budget) => (
                                    <button
                                        key={budget.label}
                                        onClick={() => handleBudgetSelect(budget.label)}
                                        className={`glass-card-light rounded-2xl p-6 text-center card-hover tap-target transition-all ${selectedBudget === budget.label
                                            ? "ring-2 ring-primary-500 bg-primary-50"
                                            : ""
                                            }`}
                                    >
                                        <span className="text-3xl block mb-2">{budget.emoji}</span>
                                        <span className="font-heading font-bold text-lg text-primary-900">
                                            {budget.label}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 max-w-md mx-auto">
                                <label className="text-sm text-gray-600 block mb-2 text-center">
                                    Or enter exact amount:
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                                    <input
                                        type="text"
                                        placeholder="Enter amount..."
                                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none text-base text-center font-semibold"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                const val = (e.target as HTMLInputElement).value;
                                                if (val) {
                                                    setSelectedBudget(`₹${val}`);
                                                    setStep(4);
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ===== STEP 4: RISK COMFORT ===== */}
                    {step === 4 && (
                        <div className="animate-in">
                            <button
                                onClick={() => setStep(3)}
                                className="text-primary-600 text-sm font-medium mb-4 flex items-center gap-1 hover:text-primary-800 tap-target"
                            >
                                ← Back
                            </button>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-950 mb-2">
                                    🎯 How comfortable are you with risk?
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    There&apos;s no right or wrong answer. This helps us show you matching opportunities.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto mb-8">
                                {RISK_LEVELS.map((level) => (
                                    <button
                                        key={level.id}
                                        onClick={() => handleRiskSelect(level.id)}
                                        className={`glass-card-light rounded-2xl p-6 text-center card-hover tap-target transition-all ${selectedRisk === level.id
                                            ? "ring-2 bg-primary-50"
                                            : ""
                                            }`}
                                        style={{
                                            borderColor: selectedRisk === level.id ? level.color : undefined,
                                            ...(selectedRisk === level.id ? { ringColor: level.color } : {}),
                                        }}
                                    >
                                        <span className="text-4xl block mb-3">{level.emoji}</span>
                                        <h3 className="font-heading font-bold text-lg text-primary-900 mb-1">
                                            {level.title}
                                        </h3>
                                        <p className="text-sm text-primary-600 italic mb-2">
                                            &ldquo;{level.hindiTitle}&rdquo;
                                        </p>
                                        <p className="text-sm text-gray-600 mb-3">{level.desc}</p>
                                        <div className="bg-gray-50 rounded-lg p-2.5">
                                            <div className="text-xs text-gray-500">Typical growth pattern:</div>
                                            <div className="text-sm font-medium" style={{ color: level.color }}>
                                                {level.growth}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Summary & Submit */}
                            {selectedRisk && (
                                <div className="max-w-md mx-auto">
                                    <div className="glass-card-light rounded-2xl p-5 mb-4">
                                        <h4 className="font-heading font-semibold text-primary-800 mb-3 text-center">
                                            Your Preferences
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">📍 Location:</span>
                                                <span className="font-semibold text-primary-900">
                                                    {selectedCity}, {selectedState?.name}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">💰 Budget:</span>
                                                <span className="font-semibold text-primary-900">{selectedBudget}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">🎯 Risk:</span>
                                                <span className="font-semibold text-primary-900 capitalize">{selectedRisk}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={handleComplete} className="btn-green w-full !py-4 !text-lg !rounded-2xl">
                                        Show Opportunities →
                                    </button>
                                    <p className="text-xs text-gray-400 text-center mt-3">
                                        These are not recommendations. We show matching opportunities for you to explore and verify independently.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
