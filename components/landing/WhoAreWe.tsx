import Image from "next/image";
import BackgroundImage from "@/public/trust_sec_background.jpg";

export default function WhoAreWe() {
    return (
        <section className="relative py-20 px-4 overflow-hidden">
            {/* Background Image */}
            <Image
                src={BackgroundImage}
                alt="Background"
                fill
                className="object-cover -z-20"
            />
            
            {/* Light overlay for readability */}
            <div className="absolute inset-0 bg-white/90 dark:bg-trustsec-1/90 -z-10" />
            
            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-trustsec-1 font-black text-6xl md:text-7xl uppercase mb-4">
                        Who are we ?
                    </h2>
                    <p className="text-trustsec-1 text-2xl font-normal">
                        Get to know TrustSec.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Certified Training Card */}
                    <div className="relative backdrop-blur-xl bg-gradient-to-br from-[#121212]/80 via-[#114ef6]/30 to-[#114ef6]/50 border border-trustsec-3/20 rounded-3xl overflow-hidden min-h-[500px] p-8 shadow-2xl">
                        {/* Decorative Gradients */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-[#114ef6] rounded-full blur-3xl opacity-20"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#114ef6] rounded-full blur-3xl opacity-15"></div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
                            {/* Image Placeholder */}
                            <div className="w-full md:w-1/3 h-64 md:h-80 bg-gradient-to-br from-trustsec-2 to-trustsec-3 rounded-3xl flex items-center justify-center">
                                <div className="text-white text-6xl font-black opacity-20">
                                    <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 text-white">
                                <h3 className="font-black text-4xl md:text-5xl uppercase mb-4">
                                    Certified<br />Training
                                </h3>
                                <p className="text-xl md:text-2xl leading-relaxed">
                                    TrustSec's programs combine real-world scenarios, hands-on labs, and expert-led sessions to build practical skills in threat detection, data protection, and compliance.
                                </p>
                            </div>
                        </div>

                        {/* See More Button */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%]">
                            <button className="w-full bg-white text-trustsec-1 py-4 rounded-full hover:bg-trustsec-3 hover:text-white transition-all font-normal text-xl flex items-center justify-center gap-3">
                                <div className="bg-trustsec-2 p-2 rounded-full rotate-[-135deg]">
                                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                                    </svg>
                                </div>
                                See more
                            </button>
                        </div>
                    </div>

                    {/* Why Choose Us Card */}
                    <div className="relative backdrop-blur-xl rounded-3xl overflow-hidden min-h-[500px] border border-trustsec-3/20 shadow-2xl">
                        {/* Background Image with Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#01d5e1]/40 via-transparent to-transparent">
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/50"></div>
                            {/* Image placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-br from-trustsec-1/80 to-trustsec-2/80"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                            <div className="text-white">
                                <h3 className="font-black text-5xl md:text-7xl uppercase mb-6 leading-tight">
                                    Why choose<br />us ?
                                </h3>
                                <p className="text-xl md:text-2xl leading-relaxed max-w-xl">
                                    Cyber threats evolve every day—your defenses should too. TrustSec provides expert training to help businesses and professionals stay secure in a connected world.
                                </p>
                            </div>

                            {/* See More Button */}
                            <button className="w-full bg-white text-trustsec-1 py-4 rounded-full hover:bg-trustsec-3 hover:text-white transition-all font-normal text-xl flex items-center justify-center gap-3 mt-8">
                                <div className="bg-trustsec-2 p-2 rounded-full rotate-[-135deg]">
                                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                                    </svg>
                                </div>
                                See more
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
