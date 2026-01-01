import React from "react";
import Link from "next/link";

export default function WelcomePage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col">
            {/* Hero Section */}
            <section className="flex-grow flex flex-col justify-center items-center relative py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
                        New Experience Available
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">NextGen</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        The platform that empowers you to build, scale, and innovate faster than ever before.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/about"
                            className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all text-lg"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We provide the tools you need to succeed in a modern digital landscape.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                                <svg className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Lightning Fast</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Optimized for speed and performance, ensuring your users never have to wait.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-100 hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                                <svg className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Secure by Design</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Built with top-tier security standards to keep your data safe and protected.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-purple-100 hover:shadow-lg transition-all group">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                                <svg className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Fully Scalable</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Grow your business without worry. Our infrastructure scales with your needs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-900 text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
                    <p className="text-gray-400 mb-10 text-lg">
                        Join thousands of satisfied users who have transformed their workflow.
                    </p>
                </div>
            </section>
        </div>
    );
}
