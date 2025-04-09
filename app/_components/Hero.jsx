import { useState, useEffect } from "react";
import Image from "next/image";
import arrowRight from "../../public/arrowRight.svg";
import sliderBg from "../../public/sliderBg.png";
import rightSlider from "../../public/rightSlider.svg";
import leftSlider from "../../public/leftSlider.svg";
import { Button } from "../../components/ui/button";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch slider data from Supabase
  async function apiSlider() {
    let { data, error } = await supabase
      .from("slider")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching slider data:", error);
      return [];
    }

    return data || [];
  }

  useEffect(() => {
    const loadSlides = async () => {
      setLoading(true);
      const sliderData = await apiSlider();

      if (sliderData && sliderData.length > 0) {
        // Transform the Supabase data to match our slide format
        const formattedSlides = sliderData.map((item) => ({
          image: sliderBg, // This is static background image
          imageRight: item.image, // The main image URL from Supabase
          title: item.title,
          description: item.text,
          buttonLink: item.button_link || "#",
        }));

        setSlides(formattedSlides);
      }
      setLoading(false);
    };

    loadSlides();
  }, []);

  const nextSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  // Simplified function to handle dot navigation
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleSwipe = () => {
    const diff = startX - endX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setStartX(0);
    setEndX(0);
  };

  useEffect(() => {
    // განსაზღვრავს არის თუ არა მობილური (ან touch მოწყობილობა) ეკრანული ზომა
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Re-add the automatic slider functionality
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 9000);

    return () => clearInterval(interval);
  }, [slides.length, currentSlide]);

  // Show loading state if slides are being fetched
  if (loading) {
    return (
      <main className="relative max-lg:bg-secondary-50 max-lg:rounded-[20px] max-lg:px-5 max-lg:py-10 max-sm:py-5 max-lg:max-w-[95%] container mt-[128px]">
        <div className="flex justify-center items-center h-[300px]">
          <section className="relative z-50 w-full ">
            <div className="absolute spinner top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"></div>
          </section>
        </div>
      </main>
    );
  }

  // Show message if no slides found
  if (slides.length === 0) {
    return (
      <main className="relative max-lg:bg-secondary-50 max-lg:rounded-[20px] max-lg:px-5 max-lg:py-10 max-sm:py-5 max-lg:max-w-[95%] container mt-[128px]">
        <div className="flex justify-center items-center h-[300px]">
          <p className="caps-text">არ არის კონტენტი !</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative max-lg:bg-secondary-50 max-lg:rounded-[20px] max-lg:px-5 max-lg:py-10 max-sm:py-5 max-lg:max-w-[95%] container mt-[128px] ">
      <div className="absolute max-lg:hidden block inset-0 -z-10">
        <img src={sliderBg.src} alt="Background" />
      </div>

      <div
        className="relative w-full overflow-hidden "
        {...(isMobile
          ? {
              onTouchStart: (e) => setStartX(e.touches[0].clientX),
              onTouchMove: (e) => setEndX(e.touches[0].clientX),
              onTouchEnd: handleSwipe,
              onMouseDown: (e) => setStartX(e.clientX),
              onMouseMove: (e) => setEndX(e.clientX),
              onMouseUp: handleSwipe,
            }
          : {})}
      >
        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          className="absolute max-lg:hidden max-xl:left-4 left-7 top-[55%] -translate-y-1/2 z-10 bg-[#EFF2F580] hover:bg-white/80 rounded-full transition-all duration-300 max-sm:hidden"
          aria-label="Previous slide"
        >
          <Image
            className="max-xl:w-[36px] max-xl:h-[36px]"
            src={leftSlider}
            alt="left-slider svg"
          />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          className="absolute right-7 max-xl:right-4 max-lg:hidden top-[55%] -translate-y-1/2 z-10 bg-[#EFF2F580] hover:bg-white/80 rounded-full transition-all duration-300 max-sm:hidden"
          aria-label="Next slide"
        >
          <Image
            className="max-xl:w-[36px] max-xl:h-[36px]"
            src={rightSlider}
            alt="right-slider svg"
          />
        </button>

        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="grid max-xl:pt-[50px] pt-[85px] max-sm:pt-[50px] md:px-[70px] xl:px-[100px] grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-[32px] xl:gap-[64px] justify-between items-center">
                <div className="left order-2 text-secondary-800 lg:text-white max-sm:ml-2 lg:order-1">
                  <h1 className="text-2xl sm:text-[30px] md:text-[32px] lg:text-[30px] xl:text-[39px] max-sm:mt-6 max-lg:mt-9 max-sm:mb-[10px] max-sm:text-[22px] mb-[24px] caps-text font-bold">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[15px] xl:text-[18px] font-regular leading-[1.5] sm:leading-[1.6] md:leading-[1.7] max-w-full sm:max-w-[95%] md:max-w-[90%] mt-2">
                    {slide.description}
                  </p>
                  <Button
                    className="caps-text max-sm:mb-5 md:h-[48px] max-xl:h-[45px] max-sm:mt-8 flex items-center gap-3 sm:gap-2 pt-3 h-[48px] mt-4 sm:mt-6 md:mt-8 lg:mt-9 text-sm sm:text-[15px]"
                    onClick={() =>
                      (window.location.href = slide.buttonLink || "#")
                    }
                  >
                    გაიგე მეტი{" "}
                    <img
                      className="mt-[-2px] sm:mt-[-3px] max-sm:mt-[-4px] w-6 h-6 sm:w-[27px] sm:h-[27px]"
                      src={arrowRight.src}
                      alt="arrowRight-svg"
                      width={24}
                      height={24}
                    />
                  </Button>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-none mx-auto lg:mx-0 overflow-hidden rounded-md">
                    <img
                      quality={100}
                      className="w-full mx-auto h-auto object-cover rounded-md max-sm:mt-4"
                      src={slide.imageRight}
                      alt="slider-image"
                      width={582}
                      height={425}
                      sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 582px"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots navigation - improved with cursor pointer and cleaner click handling */}
      <div className="absolute duration-300 transition-all max-lg:bottom-[-5%] max-sm:hidden bottom-[-20px] left-0 right-0 flex justify-center gap-4 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-[11px] h-[11px] rounded-full cursor-pointer ${
              currentSlide === index
                ? "bg-[#fdb927]"
                : "border-2 border-[#fdb927]"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </main>
  );
}
