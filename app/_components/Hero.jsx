import { useState, useEffect } from "react";
import Image from "next/image";
import premier from "../../public/premier.png";
import arrowRight from "../../public/arrowRight.svg";
import sliderBg from "../../public/sliderBg.png";
import { Button } from "../../components/ui/button";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const slides = [
    {
      image: sliderBg,
      imageRight: premier,
      title: "ვიდეო მონტაჟის კურსი",
      description:
        "ვიდეო მონტაჟის კურსის პერიოდში ისწავლი რეჟისურასა და მსოფლიო მასშტაბით ერთ-ერთი წამყვან სამონტაჟო პროგრამას Adobe Premiere Pro-ს.",
    },
    {
      image: sliderBg,
      imageRight: premier,
      title: "ვიდეო მონტაჟის კურსი",
      description:
        "შეისწავლე ვიდეო მონტაჟის ტექნიკები პროფესიონალების დახმარებით და დაიწყე საკუთარი პროექტების შექმნა.",
    },
    {
      image: sliderBg,
      imageRight: premier,
      title: "ვიდეო მონტაჟის კურსი",
      description:
        "გახდი პროფესიონალი ვიდეო რეჟისორი და დაიწყე კარიერა ციფრული მედიის სფეროში.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative max-lg:bg-secondary-50 max-lg:rounded-[20px] max-lg:px-5 max-lg:py-10 max-sm:py-5  max-lg:max-w-[95%] container mt-[128px] ">
      <div className="absolute max-lg:hidden block inset-0 -z-10">
        <Image className="" src={sliderBg} alt="Background" />
      </div>

      {/* სლაიდების კონტეინერი */}
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
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="grid max-xl:pt-[50px] pt-[70px] max-sm:pt-[50px] md:px-[40px] grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-[32px] xl:gap-[64px] justify-between items-center">
                <div className="left order-2 text-secondary-800 lg:text-white max-sm:ml-2 lg:order-1">
                  <h1 className="text-2xl sm:text-[30px] md:text-[32px] lg:text-[30px] xl:text-[39px] max-sm:mt-6 max-lg:mt-9 max-sm:mb-[10px] max-sm:text-[22px] mb-[24px] caps-text font-bold">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[15px] xl:text-[18px] font-regular leading-[1.5] sm:leading-[1.6] md:leading-[1.7] max-w-full sm:max-w-[95%] md:max-w-[90%] mt-2">
                    {slide.description}
                  </p>
                  <Button className="caps-text max-sm:mb-5 max-sm:mt-8 flex items-center gap-3 sm:gap-2 pt-3 h-[48px] mt-4 sm:mt-6 md:mt-8 lg:mt-9 text-sm sm:text-[15px]">
                    გაიგე მეტი{" "}
                    <Image
                      className="mt-[-2px] sm:mt-[-3px] max-sm:mt-[-4px] w-6 h-6 sm:w-[27px] sm:h-[27px]"
                      src={arrowRight}
                      alt="arrowRight-svg"
                      width={24}
                      height={24}
                    />
                  </Button>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-none mx-auto lg:mx-0 overflow-hidden rounded-md">
                    <Image
                      quality={100}
                      className="w-full mx-auto h-auto object-cover rounded-md max-sm:mt-4"
                      src={slide.imageRight}
                      alt="premier-png"
                      width={582}
                      height={425}
                      priority
                      sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 582px"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute duration-300 transition-all max-lg:bottom-[-5%] max-sm:hidden bottom-[6px] left-0 right-0 flex justify-center gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-[11px] h-[11px] rounded-full ${
              currentSlide === index
                ? "bg-[#fdb927]"
                : "border-2 border-[#fdb927] max-lg:bg-secondary-900"
            }`}
          />
        ))}
      </div>
    </main>
  );
}
