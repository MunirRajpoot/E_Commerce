"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
    "/carousel/carousel1.avif",
    "/carousel/carousel2.avif",
    "/carousel/carousel3.avif",
    "/carousel/carousel4.avif",
    "/carousel/carousel5.avif",
    "/carousel/carousel6.avif",
];

const Carousel = () => {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // ✅ Autoplay: change slide every 5s
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 5000); // 5 seconds

        return () => clearInterval(timer); // cleanup
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden shadow-lg">
            {/* Slides */}
            <AnimatePresence mode="wait">
                <motion.img
                    key={images[current]}
                    src={images[current]}
                    alt={`Slide ${current + 1}`}
                    className="absolute w-full h-full object-cover"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6 }}
                />
            </AnimatePresence>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-6 -translate-y-1/2 bg-white text-black w-12 h-12 flex items-center justify-center rounded-full shadow-md cursor-pointer hover:bg-black hover:text-white transition"
            >
                <FaChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-6 -translate-y-1/2 bg-white text-black w-12 h-12 flex items-center justify-center rounded-full shadow-md cursor-pointer hover:bg-black hover:text-white transition"
            >
                <FaChevronRight size={20} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full transition ${idx === current ? "bg-white" : "bg-gray-600/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
