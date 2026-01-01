import React from "react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-gray-50 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        About Us
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        We are building the future of digital experiences. Passionate, innovative, and dedicated to excellence.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Our mission is to empower users with intuitive and powerful tools. We believe in simplicity, performance, and accessibility.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Every line of code we write is aimed at making your life easier and your work more productive.
                        </p>
                    </div>
                    <div className="bg-gray-100 rounded-2xl h-64 md:h-80 flex items-center justify-center">
                        <span className="text-gray-400 font-medium">Mission Image Placeholder</span>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Meet the Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Team Member 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-600 font-bold text-xl">
                                JD
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-1">John Doe</h3>
                            <p className="text-blue-600 text-center text-sm mb-4">CEO & Founder</p>
                            <p className="text-gray-500 text-center text-sm">
                                Visionary leader with 10+ years of experience in tech.
                            </p>
                        </div>

                        {/* Team Member 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-indigo-600 font-bold text-xl">
                                JS
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-1">Jane Smith</h3>
                            <p className="text-indigo-600 text-center text-sm mb-4">CTO</p>
                            <p className="text-gray-500 text-center text-sm">
                                Tech enthusiast and architect of our core systems.
                            </p>
                        </div>

                        {/* Team Member 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center text-purple-600 font-bold text-xl">
                                MJ
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-1">Mike Johnson</h3>
                            <p className="text-purple-600 text-center text-sm mb-4">Lead Designer</p>
                            <p className="text-gray-500 text-center text-sm">
                                Creative mind behind our beautiful user interfaces.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
