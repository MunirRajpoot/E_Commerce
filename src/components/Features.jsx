"use client"
import React from "react"
import { FaCheckCircle, FaShippingFast, FaBoxOpen, FaStar } from "react-icons/fa";

const features = [
    {
        title: "Quality Assurance",
        description: "We ensure top-notch quality in every product you receive.",
        icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
    },
    {
        title: "Free Shipping",
        description: "Enjoy free shipping on all your orders, no hidden costs.",
        icon: <FaShippingFast className="text-green-600 text-4xl" />,
    },
    {
        title: "Delivered with Care",
        description: "Your orders are packed and delivered with the utmost care.",
        icon: <FaBoxOpen className="text-orange-600 text-4xl" />,
    },
    {
        title: "Excellent Service",
        description: "We’re here 24/7 to provide you with the best service possible.",
        icon: <FaStar className="text-yellow-500 text-4xl" />,
    },
];

const Features = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Why Choose Us
                </h2>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-2">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Features;