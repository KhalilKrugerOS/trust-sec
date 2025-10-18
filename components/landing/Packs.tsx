import Image from "next/image";
import BackgroundImage from "@/public/trust_sec_background.jpg";

export default function Packs() {
    return (
        <section className="relative py-20 px-4 overflow-hidden">
            {/* Background Image */}
            <Image
                src={BackgroundImage}
                alt="Background"
                fill
                className="object-cover -z-20"
            />
            
            {/* Light overlay */}
            <div className="absolute inset-0 bg-white/90 dark:bg-trustsec-1/90 -z-10" />
            
            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-trustsec-1 font-black text-6xl md:text-7xl uppercase mb-4">
                        How can I start ?
                    </h2>
                    <p className="text-trustsec-1 text-2xl font-normal">
                        Choose your best plan to start your journey.
                    </p>
                </div>

                {/* Packs Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Initiation Pack */}
                    <div className="relative backdrop-blur-xl rounded-3xl overflow-hidden min-h-[700px] border border-trustsec-3/20 shadow-2xl">
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#114ef6]/80 via-[#080056]/80 to-[#01d5e1]/80"></div>

                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#01d5e1] rounded-full blur-3xl opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#114ef6] rounded-full blur-3xl opacity-20"></div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-between p-8 text-center">
                            {/* Best Seller Badge */}
                            <div className="backdrop-blur-md bg-white/5 border border-trustsec-3 px-9 py-4 rounded-full">
                                <span className="text-white text-sm font-normal capitalize">Best Seller</span>
                            </div>

                            {/* Pack Info */}
                            <div className="space-y-16">
                                <div className="space-y-4">
                                    <h3 className="text-white font-black text-5xl md:text-6xl uppercase leading-tight">
                                        Initiation<br />Pack
                                    </h3>
                                    <p className="text-white text-xl font-normal">Group Training</p>
                                </div>

                                {/* Pricing */}
                                <div className="space-y-6">
                                    <div className="bg-white border border-trustsec-3 px-12 py-4 rounded-full inline-flex items-baseline gap-2">
                                        <span className="text-[#040404] font-black text-5xl">---</span>
                                        <span className="text-[#040404] font-normal text-3xl">Dt</span>
                                        <span className="text-[#040404] font-normal text-lg ml-2">/ Per Month</span>
                                    </div>

                                    <div className="relative">
                                        <div className="border-t border-white/30 mb-2"></div>
                                        <p className="text-white text-lg font-normal capitalize">---- Dt / Per Year</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="bg-trustsec-2 hover:bg-trustsec-3 transition-colors p-4 rounded-full shadow-lg group">
                                <svg className="w-12 h-12 text-white transform rotate-[-135deg] group-hover:rotate-[-180deg] transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Professional Pack */}
                    <div className="relative backdrop-blur-xl rounded-3xl overflow-hidden min-h-[700px] border border-trustsec-3/20 shadow-2xl">
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#01d5e1]/80 via-[#114ef6]/80 to-[#080056]/80"></div>

                        {/* Decorative Circles */}
                        <div className="absolute top-0 left-0 w-96 h-96 bg-[#114ef6] rounded-full blur-3xl opacity-20"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#01d5e1] rounded-full blur-3xl opacity-20"></div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-between p-8 text-center">
                            {/* Best Seller Badge */}
                            <div className="backdrop-blur-md bg-white/5 border border-trustsec-3 px-9 py-4 rounded-full">
                                <span className="text-white text-sm font-normal capitalize">Best Seller</span>
                            </div>

                            {/* Pack Info */}
                            <div className="space-y-16">
                                <div className="space-y-4">
                                    <h3 className="text-white font-black text-5xl md:text-6xl uppercase leading-tight">
                                        Professional<br />Pack
                                    </h3>
                                    <p className="text-white text-xl font-normal">Group Training</p>
                                </div>

                                {/* Pricing */}
                                <div className="space-y-6">
                                    <div className="bg-white border border-trustsec-3 px-12 py-4 rounded-full inline-flex items-baseline gap-2">
                                        <span className="text-[#040404] font-black text-5xl">---</span>
                                        <span className="text-[#040404] font-normal text-3xl">Dt</span>
                                        <span className="text-[#040404] font-normal text-lg ml-2">/ Per Month</span>
                                    </div>

                                    <div className="relative">
                                        <div className="border-t border-white/30 mb-2"></div>
                                        <p className="text-white text-lg font-normal capitalize">---- Dt / Per Year</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="bg-trustsec-2 hover:bg-trustsec-3 transition-colors p-4 rounded-full shadow-lg group">
                                <svg className="w-12 h-12 text-white transform rotate-[-135deg] group-hover:rotate-[-180deg] transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
