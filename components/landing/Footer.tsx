import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-trustsec-1 to-trustsec-2 text-white py-16 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Logo and Social Media */}
                    <div className="space-y-8">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-trustsec-1" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                </svg>
                            </div>
                            <span className="font-black text-2xl uppercase tracking-wider">TrustSec</span>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="hover:opacity-80 transition-opacity"
                                aria-label="X (Twitter)"
                            >
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-trustsec-1" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="hover:opacity-80 transition-opacity"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-8 h-8" />
                            </a>
                            <a
                                href="#"
                                className="hover:opacity-80 transition-opacity"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-8 h-8" />
                            </a>
                            <a
                                href="#"
                                className="hover:opacity-80 transition-opacity"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-8 h-8" />
                            </a>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="space-y-6">
                        <h3 className="text-trustsec-3 font-semibold text-xl">Support</h3>
                        <div className="space-y-4">
                            <p className="text-white/90">Ariana, Tunisia</p>
                            <div className="flex items-center gap-3">
                                <Mail className="w-6 h-6 text-white/70" />
                                <a href="mailto:TrustSec@gmail.com" className="text-white/90 hover:text-trustsec-3 transition-colors">
                                    TrustSec@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-6 h-6 text-white/70" />
                                <a href="tel:+21612345678" className="text-white/90 hover:text-trustsec-3 transition-colors">
                                    (+216) 12 345 678
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* About Us */}
                    <div className="space-y-6">
                        <h3 className="text-trustsec-3 font-semibold text-xl">About Us</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#history" className="text-white/90 hover:text-trustsec-3 transition-colors">
                                    History
                                </a>
                            </li>
                            <li>
                                <a href="#community" className="text-white/90 hover:text-trustsec-3 transition-colors">
                                    Community
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-white/90 hover:text-trustsec-3 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h3 className="text-trustsec-3 font-semibold text-xl">Services</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#courses" className="text-white/90 hover:text-trustsec-3 transition-colors">
                                    Courses
                                </a>
                            </li>
                            <li>
                                <a href="#certificates" className="text-white/90 hover:text-trustsec-3 transition-colors">
                                    Certificates
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-16 pt-8 border-t border-white/20 text-center">
                    <p className="text-white/70 text-sm">
                        © {new Date().getFullYear()} TrustSec. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
