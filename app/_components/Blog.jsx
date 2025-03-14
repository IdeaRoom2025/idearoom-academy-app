import Image from "next/image";
import Headline from "./Headline";
import blogPicture from "../../public/blogPicture.png";
import { Button } from "../../components/ui/button";
import SeeAllButton from "./SeeAllButton";

export default function Blog() {
  return (
    <section className="mt-12 sm:mt-16 md:mt-20 lg:mt-[96px]">
      <Headline text="ბლოგი" />
      <div className="container mx-auto max-sm:max-w-[90%] mt-8 sm:mt-10 md:mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-4 sm:p-5 rounded-[20px]">
          <Image
            quality={100}
            className="w-full object-cover"
            src={blogPicture}
            alt="blog-1"
          />
          <div className="py-4 sm:py-6">
            <h4 className="caps-text text-[#282525] font-bold text-base">
              ხელოვნური ინტელექტი რობოტების წინააღმდეგ – AI VS RPA
            </h4>
            <p className="text-sm leading-[1.65] font-regular mt-3 sm:mt-4 mb-6 sm:mb-8 text-secondary-500">
              ხელოვნური ინტელექტი და რობოტები, ისინი ერთად ქმნიან ჩვენს
              წარმატებას და COVID-19 ამის ნათელი მაგალით იყო
            </p>
            <div className="flex justify-end">
              <Button className="w-full sm:w-[152px] text-sm rounded-[12px] h-[48px]">
                გაიგე მეტი
                {/* <Image
                  className="mt-[-2px] ml-1 sm:mt-[-3px] max-sm:mt-[-4px] w-3 h-3"
                  src={arrowRight}
                  alt="arrowRight-svg"
                  width={20}
                  height={20}
                /> */}
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-[20px]">
          <Image
            quality={100}
            className="w-full object-cover"
            src={blogPicture}
            alt="blog-1"
          />
          <div className="py-4 sm:py-6">
            <h4 className="caps-text text-[#282525] font-bold text-base">
              ხელოვნური ინტელექტი რობოტების წინააღმდეგ – AI VS RPA
            </h4>
            <p className="text-sm leading-[1.65] font-regular mt-3 sm:mt-4 mb-6 sm:mb-8 text-secondary-500">
              ხელოვნური ინტელექტი და რობოტები, ისინი ერთად ქმნიან ჩვენს
              წარმატებას და COVID-19 ამის ნათელი მაგალით იყო
            </p>
            <div className="flex justify-end">
              <Button className="w-full sm:w-[152px] text-sm rounded-[12px] h-[48px]">
                გაიგე მეტი
                {/* <Image
                  className="mt-[-2px] ml-1 sm:mt-[-3px] max-sm:mt-[-4px] w-3 h-3"
                  src={arrowRight}
                  alt="arrowRight-svg"
                  width={20}
                  height={20}
                /> */}
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-[20px] sm:col-span-2 lg:col-span-1">
          <Image
            quality={100}
            className="w-full object-cover"
            src={blogPicture}
            alt="blog-1"
          />
          <div className="py-4 sm:py-6">
            <h4 className="caps-text text-[#282525] font-bold text-base">
              ხელოვნური ინტელექტი რობოტების წინააღმდეგ – AI VS RPA
            </h4>
            <p className="text-sm leading-[1.65] font-regular mt-3 sm:mt-4 mb-6 sm:mb-8 text-secondary-500">
              ხელოვნური ინტელექტი და რობოტები, ისინი ერთად ქმნიან ჩვენს
              წარმატებას და COVID-19 ამის ნათელი მაგალით იყო
            </p>
            <div className="flex justify-end">
              <Button className="w-full sm:w-[152px] text-sm rounded-[12px] h-[48px]">
                გაიგე მეტი
                {/* <Image
                  className="mt-[-2px] ml-1 sm:mt-[-3px] max-sm:mt-[-4px] w-3 h-3"
                  src={arrowRight}
                  alt="arrowRight-svg"
                  width={20}
                  height={20}
                /> */}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <SeeAllButton buttonText="ყველას ნახვა" />
      </div>
    </section>
  );
}
