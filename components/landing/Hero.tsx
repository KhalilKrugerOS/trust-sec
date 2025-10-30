"use client";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";
import BackgroundImage from "@/public/trust_sec_background.jpg";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center">
      {/* Background Image */}
      <Image
        src={BackgroundImage}
        alt="TrustSec Background"
        fill
        className="object-cover -z-20"
        priority
      />

      {/* Gradient Overlay for brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080056]/80 via-[#114ef6]/60 to-[#01d5e1]/50 -z-10" />

      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#01d5e1] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#114ef6] rounded-full blur-3xl"></div>
      </div>

      {/* Navbar - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* iPhone X Style Notch Logo - Centered at top with corner curves */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0">
          <div className="relative">
            {/* Main notch body - Bigger and more airy */}
            <div className="bg-white rounded-b-[28px] px-4 py-4 shadow-xl flex items-center gap-4 relative z-10">
              {/* Logo Image */}
              <Image
                src="/layer_logo.png"
                alt="TrustSec Logo"
                width={160}
                height={60}
                className="object-contain"
              />
            </div>

            {/* Left corner curve - Adjusted for bigger notch */}
            <div
              className="absolute top-0 -left-[10px] w-[20px] h-[10px] z-0"
              style={{
                background:
                  "radial-gradient(circle at 0 100%, transparent 9px, white 10px)",
              }}
            />

            {/* Right corner curve - Adjusted for bigger notch */}
            <div
              className="absolute top-0 -right-[10px] w-[20px] h-[10px] z-0"
              style={{
                background:
                  "radial-gradient(circle at 100% 100%, transparent 9px, white 10px)",
              }}
            />
          </div>
        </div>

        {/* Navigation items - Below the notch */}
        <div className="w-full px-8 pt-16">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Social Media Icons - Left */}
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-trustsec-1 p-2 rounded-full hover:bg-trustsec-2 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="bg-trustsec-1 p-2 rounded-full hover:bg-trustsec-2 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-trustsec-1 p-2 rounded-full hover:bg-trustsec-2 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
            </div>

            {/* Courses Button - Right */}
            <Link
              href={"/courses"}
              className="backdrop-blur-md bg-white/10 border border-trustsec-3 text-white px-6 py-2.5 rounded-lg hover:bg-white/20 transition-all font-black uppercase text-sm flex items-center gap-2"
            >
              Courses
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 pt-20 pb-8 w-full">
        {/* Hero Content */}
        <div className="max-w-7xl mx-auto">
          <div className="text-white space-y-4 mb-16">
            <p className="text-3xl md:text-4xl font-normal">
              Welcome to TrustSec !
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-tight">
              Learn Fast. <br />
              Stay Secure.
            </h1>
          </div>

          {/* Bottom Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {/* Team TrustSec Card */}
            <div className="backdrop-blur-xl bg-white/5 border border-trustsec-3 rounded-3xl p-6 col-span-2">
              <h3 className="text-white font-black text-xl uppercase mb-3">
                Team TrustSec
              </h3>
              <p className="text-white text-base leading-relaxed">
                Through expert-led courses and practical training, we help
                learners gain the skills and confidence to succeed in
                today&apos;s digital world.
              </p>
            </div>

            {/* Refer a Friend Card */}
            <div className="backdrop-blur-xl bg-white/5 border border-trustsec-3 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
              <h3 className="text-white font-black text-lg uppercase mb-2">
                Refer a friend !
              </h3>
              <p className="text-white text-xs mb-4">
                Share your link with your friends !
              </p>
              <button className="bg-white border border-trustsec-3 text-trustsec-1 px-5 py-2 rounded-full hover:bg-trustsec-3 hover:text-white transition-all font-normal flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                </svg>
                Link
              </button>
            </div>

            {/* Download App Card - Absolute positioned */}
            <div className="absolute -right-4 -bottom-16 backdrop-blur-xl bg-white/95 border border-trustsec-3 rounded-2xl p-5 max-w-xs text-center shadow-lg hidden lg:block">
              <h3 className="text-trustsec-1 font-black text-lg uppercase mb-3">
                Download
                <br />
                our app !
              </h3>
              <div className="border border-trustsec-3 rounded-full px-4 py-2 inline-flex items-center gap-2">
                <div className="bg-trustsec-2 p-1.5 rounded-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                </div>
                <span className="text-trustsec-2 uppercase text-xs font-normal">
                  +10k Downloads
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
