import Image from "next/image";
import premier from "../../public/premier.png";
import arrowRight from "../../public/arrowRight.svg";
import { Button } from "../../components/ui/button";

export default function Hero() {
  return (
    <main className="container mt-4 sm:mt-5 md:mt-[20px] py-6 sm:py-8 md:py-10 lg:py-[32px] xl:py-[64px] px-4 sm:px-6 md:px-8 lg:px-[32px] xl:px-[64px] w-full max-sm:max-w-[95%] mx-auto bg-white rounded-[12px] sm:rounded-[16px] md:rounded-[20px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-[32px] xl:gap-[64px] justify-between items-center">
        <div className="left order-2 max-sm:ml-2 lg:order-1">
          <h1 className="text-2xl sm:text-[30px] md:text-[32px] lg:text-[30px] xl:text-[40px] max-sm:mt-6 max-lg:mt-9 max-sm:mb-[10px] max-sm:text-[22px] mb-[24px] caps-text font-bold">
            ვიდეო მონტაჟის კურსი
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-[15px] xl:text-[18px] font-regular leading-[1.5] sm:leading-[1.6] md:leading-[1.7] max-w-full sm:max-w-[95%] md:max-w-[90%] mt-2 max-sm:max-w-[95%]">
            ვიდეო მონტაჟის კურსის განმავლობაში ისწავლი რეჟისურასა და მსოფლიოს
            მასშტაბით ერთ-ერთ წამყვან სამონტაჟო პროგრამას Adobe Premiere Pro-ს.{" "}
          </p>
          <Button className="caps-text max-sm:mb-5 max-sm:mt-8 flex items-center gap-3 sm:gap-2 mt-4 sm:mt-6 md:mt-8 lg:mt-9 text-sm sm:text-[15px]">
            გაიგე მეტი{" "}
            <Image
              className="mt-[-2px] sm:mt-[-3px] max-sm:mt-[-4px] w-4 h-4 sm:w-[27px] sm:h-[27px]"
              src={arrowRight}
              alt="arrowRight-svg"
              width={24}
              height={24}
            />
          </Button>
        </div>
        <div className="order-1 lg:order-2">
          <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-none mx-auto lg:mx-0">
            <Image
              quality={100}
              className="w-full max-w-[90%] mx-auto h-auto object-cover rounded-md max-sm:mt-4"
              src={premier}
              alt="premier-png"
              width={582}
              height={425}
              priority
              sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 582px"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
