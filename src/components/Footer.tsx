import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            {/* Main Footer */}
            <div className="bg-gradient-hero text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
                        {/* Brand */}
                        <div className="col-span-2 md:col-span-4 lg:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">N</span>
                                </div>
                                <div>
                                    <div className="font-heading font-bold text-lg">NiveshMitra</div>
                                    <div className="text-primary-300 text-xs">Discover Smart Investments</div>
                                </div>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed mb-4">
                                India&apos;s first pan-India investment discovery platform. Connecting investors
                                with verified business opportunities across all 36 states & UTs.
                            </p>
                            <div className="flex items-center gap-3">
                                <a
                                    href="#"
                                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                                    aria-label="Twitter"
                                >
                                    𝕏
                                </a>
                                <a
                                    href="#"
                                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    in
                                </a>
                                <a
                                    href="#"
                                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                                    aria-label="YouTube"
                                >
                                    ▶
                                </a>
                                <a
                                    href="#"
                                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                                    aria-label="Instagram"
                                >
                                    📷
                                </a>
                            </div>
                        </div>

                        {/* For Investors */}
                        <div>
                            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary-300 mb-4">
                                For Investors
                            </h4>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link href="/select-location" className="text-white/60 hover:text-white text-sm transition-colors">
                                        Explore Opportunities
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/risk-quiz" className="text-white/60 hover:text-white text-sm transition-colors">
                                        Risk Quiz
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/learn" className="text-white/60 hover:text-white text-sm transition-colors">
                                        Learning Center
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/compare" className="text-white/60 hover:text-white text-sm transition-colors">
                                        Compare Options
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/profile" className="text-white/60 hover:text-white text-sm transition-colors">
                                        My Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* For Businesses */}
                        <div>
                            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary-300 mb-4">
                                For Businesses
                            </h4>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link href="/business/register" className="text-white/60 hover:text-white text-sm transition-colors">
                                        List Your Business
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business/dashboard" className="text-white/60 hover:text-white text-sm transition-colors">
                                        Business Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#pricing" className="text-white/60 hover:text-white text-sm transition-colors">
                                        Pricing Plans
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#how-it-works-business" className="text-white/60 hover:text-white text-sm transition-colors">
                                        How It Works
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary-300 mb-4">
                                Company
                            </h4>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link href="/about" className="text-white/60 hover:text-white text-sm transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-white/60 hover:text-white text-sm transition-colors">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/disclaimer" className="text-white/60 hover:text-white text-sm transition-colors">
                                        Disclaimer
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Disclaimer Section */}
                <div className="disclaimer-bar">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="text-lg flex-shrink-0">⚖️</span>
                            <div>
                                <h5 className="font-semibold text-white/80 text-sm mb-2">Important Disclaimer</h5>
                                <p className="text-white/50 text-xs leading-relaxed mb-3">
                                    <strong className="text-white/70">English:</strong> NiveshMitra is an investment discovery platform.
                                    We help you find and compare investment opportunities and connect with businesses. We do NOT provide
                                    financial advice, handle investments, process payments, or guarantee returns. All investment decisions
                                    and transactions happen directly between you and the business owner. Always verify opportunities
                                    independently and consult a certified financial advisor before investing. Invest at your own risk.
                                </p>
                                <p className="text-white/50 text-xs leading-relaxed">
                                    <strong className="text-white/70">हिंदी:</strong> निवेशमित्र एक निवेश खोज प्लेटफॉर्म है। हम आपको
                                    निवेश के अवसर खोजने, तुलना करने और व्यापारियों से जुड़ने में मदद करते हैं। हम वित्तीय सलाह नहीं
                                    देते, निवेश नहीं संभालते, भुगतान प्रोसेस नहीं करते, या रिटर्न की गारंटी नहीं देते। सभी निवेश
                                    निर्णय और लेनदेन सीधे आपके और व्यापार मालिक के बीच होते हैं। निवेश करने से पहले स्वतंत्र रूप से
                                    सत्यापित करें और प्रमाणित वित्तीय सलाहकार से परामर्श करें। अपने जोखिम पर निवेश करें।
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 py-5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-white/40 text-xs">
                            © 2026 NiveshMitra. All rights reserved. Made in India 🇮🇳
                        </p>
                        <p className="text-white/30 text-xs">
                            Investment Discovery & Education Platform — NOT a Financial Advisory Service
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
