"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import feedbackPic from "../../public/feedbackPic.png";
import arrowRight from "../../public/arrowRight.svg";
import quotes from "../../public/quote.svg";

export default function Feedback() {
  // Sample testimonial data – replace with your actual data
  const testimonials = [
    // First set of testimonials
    [
      {
        id: 1,
        text: "We're most impressed with BurstDigital's flexibility and willingness to go the extra mile to cater to our needs to go the extra mile to cater to our needs most impressed with the extra mile to cater",
        name: "Maria Sharapova",
        title: "The Queen of Tennis",
        ctaText:
          "Become: Web Developer learn now this course and Get Job oures",
      },
      {
        id: 2,
        text: "We're most impressed with BurstDigital's flexibility and willingness to go the extra mile to cater to our needs to go the extra mile to cater to our needs most impressed with the extra mile to cater",
        name: "Maria Sharapova",
        title: "The Queen of Tennis",
        ctaText:
          "Become: Web Developer learn now this course and Get Job oures",
      },
      {
        id: 3,
        text: "We're most impressed with BurstDigital's flexibility and willingness to go the extra mile to cater to our needs to go the extra mile to cater to our needs most impressed with the extra mile to cater",
        name: "Maria Sharapova",
        title: "The Queen of Tennis",
        ctaText:
          "Become: Web Developer learn now this course and Get Job oures",
      },
    ],
    // Second set of testimonials
    [
      {
        id: 4,
        text: "We're most impressed with BurstDigital's flexibility and willingness to go the extra mile to cater to our needs to go the extra mile to cater to our needs most impressed with the extra mile to cater",
        name: "Maria Sharapova",
        title: "The Queen of Tennis",
        ctaText:
          "Become: Web Developer learn now this course and Get Job oures",
      },
      {
        id: 5,
        text: "We're most impressed with BurstDigital's flexibility and willingness to go the extra mile to cater to our needs to go the extra mile to cater to our needs most impressed with the extra mile to cater",
        name: "Maria Sharapova",
        title: "The Queen of Tennis",
        ctaText:
          "Become: Web Developer learn now this course and Get Job oures",
      },
      {
        id: 6,
        text: "We're most impressed with BurstDigital's flexibility and willingness to go the extra mile to cater to our needs to go the extra mile to cater to our needs most impressed with the extra mile to cater",
        name: "Maria Sharapova",
        title: "The Queen of Tennis",
        ctaText:
          "Become: Web Developer learn now this course and Get Job oures",
      },
    ],
    // Third set of testimonials
    [
      {
        id: 7,
        text: "We're most impressed with BurstDigital's flexibility and willingness to go the extra mile to cater to our needs to go the extra mile to cater to our needs most impressed with the extra mile to cater",
        name: "Maria Sharapova",
        title: "The Queen of Tennis",
        ctaText:
          "Become: Web Developer learn now this course and Get Job oures",
      },
      {
        id: 8,
        text: "We're most impressed with BurstDigital's flexibility and willingness to go the extra mile to cater to our needs to go the extra mile to cater to our needs most impressed with the extra mile to cater",
        name: "Maria Sharapova",
        title: "The Queen of Tennis",
        ctaText:
          "Become: Web Developer learn now this course and Get Job oures",
      },
      {
        id: 9,
        text: "We're most impressed with BurstDigital's flexibility and willingness to go the extra mile to cater to our needs to go the extra mile to cater to our needs most impressed with the extra mile to cater",
        name: "Maria Sharapova",
        title: "The Queen of Tennis",
        ctaText:
          "Become: Web Developer learn now this course and Get Job oures",
      },
    ],
  ];

  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

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
    if (diff > threshold && activeSlide < testimonials.length - 1) {
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
          <Image
            className="w-[24px] h-[24px] object-contain"
            src={quotes}
            alt="quote"
            width={24}
            height={21}
          />
        </div>
        <p className="text-[#7B7D7E] font-normal text-sm leading-relaxed">
          {testimonial.text}
        </p>
      </div>
      <div>
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 relative mr-4 rounded-full overflow-x-hidden">
            <Image
              quality={100}
              src={feedbackPic}
              alt="feedback author"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <p className="font-semibold text-secondary-500 text-sm">
              {testimonial.name}
            </p>
            <span className="text-[#706A6A] text-sm">{testimonial.title}</span>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#eeeeee] mt-6 my-5"></div>
        <div className="flex items-center cursor-pointer group mt-5">
          <div className="flex items-center justify-center mr-3  ">
            <Image
              className="bg-primary-500 transition-colors duration-300 hover:bg-primary-600 rounded-full max-md:w-[30px] max-sm:w-[45px] w-[60px] p-1"
              src={arrowRight}
              alt="arrow right"
              width={30}
              height={30}
            />
          </div>
          <p className="text-primary-500 font-bold leading-5 group-hover:text-primary-600 transition-colors duration-300">
            {testimonial.ctaText}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    // Outer section prevents overall horizontal scroll on the screen
    <section className="py-16 px-4 mt-9 bg-gray-50 overflow-x-hidden">
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
            {testimonials.map((slideGroup, slideIndex) => (
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
            <div className="invisible md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials[0].map((testimonial) =>
                renderTestimonialCard(testimonial)
              )}
            </div>
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
            {testimonials.map((slideGroup, slideIndex) => (
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
          {testimonials.map((_, index) => (
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
