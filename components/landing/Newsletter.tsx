"use client";

import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log("Subscribe:", email);
    };

    return (
        <section className="py-20 px-4 bg-white">
            <div className="container mx-auto max-w-7xl">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-trustsec-1 font-black text-6xl md:text-7xl uppercase mb-4">
                        Weekly news ?
                    </h2>
                    <p className="text-trustsec-1 text-2xl font-normal">
                        Stay updated with TrustSec.
                    </p>
                </div>

                {/* Newsletter Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg">
                    {/* Background with Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-trustsec-1 to-trustsec-2">
                        {/* Pattern overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-trustsec-2/50 via-transparent to-trustsec-3/50"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-12 md:p-16 lg:p-20">
                        <div className="max-w-2xl">
                            {/* Logo */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                        <svg className="w-8 h-8 text-trustsec-1" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                        </svg>
                                    </div>
                                    <span className="text-white font-black text-3xl uppercase tracking-wider">TrustSec</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-white text-3xl font-normal uppercase tracking-widest mb-8">
                                Get weekly updates
                            </h3>

                            {/* Subscription Form */}
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                                {/* Email Input */}
                                <div className="relative flex-1">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@gmail.com"
                                        className="w-full bg-white border border-slate-500 rounded-lg pl-12 pr-4 py-4 text-slate-500 focus:outline-none focus:border-trustsec-3 focus:ring-2 focus:ring-trustsec-3/20 transition-all"
                                        required
                                    />
                                </div>

                                {/* Subscribe Button */}
                                <button
                                    type="submit"
                                    className="border-2 border-trustsec-3 bg-transparent hover:bg-trustsec-3 text-white px-8 py-4 rounded-lg transition-all font-medium text-lg whitespace-nowrap"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
