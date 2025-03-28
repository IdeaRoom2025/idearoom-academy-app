import Image from "next/image";
import information from "../../public/information.png";

export default function Information() {
  return (
    <section className="bg-white mt-8 sm:mt-12 md:mt-16 lg:mt-[64px] py-8 sm:py-12 md:py-16 lg:py-[64px] mb-12 sm:mb-16 md:mb-24">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-0 gap-6 sm:gap-8 md:gap-12 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center lg:block">
          <div className="w-full sm:max-w-md md:max-w-xl lg:max-w-none">
            <Image
              src={information}
              alt="information-image"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="mt-8 lg:mt-0">
          <h2 className="text-xl sm:text-[20px] md:text-[22px] lg:text-[24px] mb-8 md:mb-10 lg:mb-[40px] font-bold text-secondary-500 max-w-full sm:max-w-[90%] md:max-w-[80%] 2xl:max-w-[50%]  caps-text leading-[1.4] sm:leading-[1.5] md:leading-[1.6] lg:leading-[1.6] my-4 sm:my-6 md:my-8 lg:my-6">
            რატომ უნდა ისწავლოთ იდეა რუმის აკადემიაში
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 md:gap-9">
            <div className="flex gap-4 items-start bg-secondary-50 p-5 rounded-lg shadow-sm md:bg-transparent md:p-0 md:rounded-none md:shadow-none">
              <div>
                <div className="bg-[#D9D9D9] w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[41px] md:h-[41px] rounded-full flex-shrink-0"></div>
              </div>
              <div>
                <h4 className="font-bold caps-text mt-[6px] sm:mt-[10px] md:mt-[11px]">
                  სერთიფიკატი
                </h4>
                <p className="text-[15px] sm:text-sm leading-[1.6] mt-3 sm:mt-3">
                  ყველა კურსდამთავრებულს გადაეცემა ორენოვანი სერთიფიკატი
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-secondary-50 p-5 rounded-lg shadow-sm md:bg-transparent md:p-0 md:rounded-none md:shadow-none">
              <div>
                <div className="bg-[#D9D9D9] w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[41px] md:h-[41px] rounded-full flex-shrink-0"></div>
              </div>
              <div>
                <h4 className="font-bold caps-text mt-[6px] sm:mt-[10px] md:mt-[11px]">
                  სერთიფიკატი
                </h4>
                <p className="text-[15px] sm:text-sm leading-[1.6] mt-3 sm:mt-3">
                  ყველა კურსდამთავრებულს გადაეცემა ორენოვანი სერთიფიკატი
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-secondary-50 p-5 rounded-lg shadow-sm md:bg-transparent md:p-0 md:rounded-none md:shadow-none">
              <div>
                <div className="bg-[#D9D9D9] w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[41px] md:h-[41px] rounded-full flex-shrink-0"></div>
              </div>
              <div>
                <h4 className="font-bold caps-text mt-[6px] sm:mt-[10px] md:mt-[11px]">
                  სერთიფიკატი
                </h4>
                <p className="text-[15px] sm:text-sm leading-[1.6] mt-3 sm:mt-3">
                  ყველა კურსდამთავრებულს გადაეცემა ორენოვანი სერთიფიკატი
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-secondary-50 p-5 rounded-lg shadow-sm md:bg-transparent md:p-0 md:rounded-none md:shadow-none">
              <div>
                <div className="bg-[#D9D9D9] w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[41px] md:h-[41px] rounded-full flex-shrink-0"></div>
              </div>
              <div>
                <h4 className="font-bold caps-text mt-[6px] sm:mt-[10px] md:mt-[11px]">
                  სერთიფიკატი
                </h4>
                <p className="text-[15px] sm:text-sm leading-[1.6] mt-3 sm:mt-3">
                  ყველა კურსდამთავრებულს გადაეცემა ორენოვანი სერთიფიკატი
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
