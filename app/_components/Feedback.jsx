"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import arrowRight from "../../public/arrowRight.svg";
import quotes from "../../public/quote.svg";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// Initialize Supabase client (you'll need to add your env variables)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Feedback() {
  const [testimonials, setTestimonials] = useState([]);
  const [groupedTestimonials, setGroupedTestimonials] = useState([]);
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("review").select("*");

      if (error) {
        console.error("Error fetching reviews:", error);
        setIsLoading(false);
        return;
      }

      if (data && data.length > 0) {
        setTestimonials(data);

        // Group testimonials into arrays of 3 for desktop view
        const grouped = [];
        for (let i = 0; i < data.length; i += 3) {
          grouped.push(data.slice(i, i + 3));
        }
        setGroupedTestimonials(grouped);
      }

      setIsLoading(false);
    };

    fetchReviews();
  }, []);

  const handleSlideChange = (index) => {
    if (isAnimating || index === activeSlide) return;
    setIsAnimating(true);
    setActiveSlide(index);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleDragStart = (e) => {
    if (isAnimating) return;
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    document.body.style.cursor = "grabbing";
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grabbing";
      sliderRef.current.style.userSelect = "none";
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    document.body.style.cursor = "";
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
      sliderRef.current.style.userSelect = "";
    }
    const diff = startX - currentX;
    const threshold = 50;
    if (diff > threshold && activeSlide < groupedTestimonials.length - 1) {
      handleSlideChange(activeSlide + 1);
    } else if (diff < -threshold && activeSlide > 0) {
      handleSlideChange(activeSlide - 1);
    }
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.cursor = "";
      if (sliderRef.current) {
        sliderRef.current.style.cursor = "grab";
        sliderRef.current.style.userSelect = "";
      }
    }
  };

  // Render a single testimonial card
  const renderTestimonialCard = (testimonial) => (
    <div
      key={testimonial.id}
      className="bg-white relative rounded-[14px] p-8 feeback-shadow duration-300"
    >
      <div className="mb-8 pt-4 relative">
        <div className="absolute top-[-44px] left-0">
          {quotes && quotes.src ? (
            <img
              className="w-[24px] h-[24px] object-contain"
              src={quotes.src}
              alt="quote"
              width={24}
              height={21}
            />
          ) : (
            <div className="w-[24px] h-[24px]"></div>
          )}
        </div>
        <p className="text-[#7B7D7E] font-normal text-sm leading-relaxed">
          {testimonial.text}
        </p>
      </div>
      <div>
        <div className="flex items-center mb-6">
          <div className="relative mr-4">
            {testimonial.student_picture ? (
              <img
                className="w-16 h-16 object-cover rounded-full"
                src={testimonial.student_picture}
                alt={`${testimonial.fullName} portrait`}
              />
            ) : (
              // Fallback avatar if no image is provided
              <div className="w-16 h-16 bg-primary-100 flex items-center justify-center text-primary-500 font-bold text-xl rounded-full">
                {testimonial.fullName?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold mb-[-6px] caps-text text-secondary-500 text-sm">
              {testimonial.fullName}
            </p>

            <span className="text-[#706A6A] regular-text text-[13px]">
              {testimonial.course}
            </span>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#eeeeee] mt-6 my-5"></div>
        <div className="flex items-center cursor-pointer group mt-5">
          <div className="flex items-center justify-center mr-3">
            {arrowRight && arrowRight.src ? (
              <img
                className="bg-primary-500 transition-colors duration-300 hover:bg-primary-600 rounded-full max-md:w-[30px] max-sm:w-[45px] w-[32px] p-1"
                src={arrowRight.src}
                alt="arrow right"
                width={30}
                height={30}
              />
            ) : (
              <div className="bg-primary-500 transition-colors duration-300 hover:bg-primary-600 rounded-full max-md:w-[30px] max-sm:w-[45px] w-[32px] h-[32px] p-1"></div>
            )}
          </div>
          <Link href={testimonial.courseLink || "#"}>
            <p className="text-primary-500 mt-[6px] caps-text font-bold leading-5 group-hover:text-primary-600 transition-colors duration-300">
              {testimonial.course}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <section className="py-16 px-4 mt-9 shadow-review bg-gray-50 overflow-x-hidden">
        <div className="container mx-auto text-center">
          <p>Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-16 px-4 mt-9 shadow-review bg-gray-50 overflow-x-hidden">
        <div className="container mx-auto text-center">
          <p>No testimonials available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    // Outer section prevents overall horizontal scroll on the screen
    <section className="py-16 px-4 mt-9 shadow-review bg-gray-50 overflow-x-hidden">
      <div className="container mx-auto">
        {/* Desktop Slider */}
        <div
          className="hidden md:block select-none"
          ref={sliderRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{ cursor: "grab" }}
        >
          <div className="relative overflow-x-visible">
            {groupedTestimonials.map((slideGroup, slideIndex) => (
              <div
                key={slideIndex}
                className={`absolute w-full transition-all duration-500 ease-in-out grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${
                  activeSlide === slideIndex
                    ? "opacity-100 translate-x-0"
                    : activeSlide > slideIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
                style={{
                  zIndex: activeSlide === slideIndex ? 10 : 1,
                }}
              >
                {slideGroup.map((testimonial) =>
                  renderTestimonialCard(testimonial)
                )}
              </div>
            ))}
            {/* Static reference div to maintain height */}
            {groupedTestimonials.length > 0 && (
              <div className="invisible md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedTestimonials[0].map((testimonial) =>
                  renderTestimonialCard(testimonial)
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Slider */}
        <div
          className="md:hidden select-none"
          ref={sliderRef}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{ cursor: "grab" }}
        >
          <div className="overflow-x-visible">
            {groupedTestimonials.map((slideGroup, slideIndex) => (
              <div
                key={slideIndex}
                className={`transition-all duration-500 ease-in-out ${
                  activeSlide === slideIndex
                    ? "opacity-100 block"
                    : "opacity-0 hidden"
                }`}
              >
                {slideGroup.map((testimonial) => (
                  <div key={testimonial.id} className="w-full mb-6">
                    {renderTestimonialCard(testimonial)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Slider Dots */}
        <div className="flex justify-center items-center mt-[40px] space-x-4">
          {groupedTestimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                activeSlide === index
                  ? "bg-primary-orange"
                  : "border-2 border-primary-orange"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
