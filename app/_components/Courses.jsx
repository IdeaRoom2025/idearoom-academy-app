import Image from "next/image";
import Headline from "./Headline";
import course1 from "../../public/course1.png";
import course2 from "../../public/course2.png";
import course3 from "../../public/course3.png";
import { Button } from "../../components/ui/button";
import SeeAllButton from "./SeeAllButton";

export default function Courses() {
  const courses = [
    {
      id: 1,
      image: course1,
      title: "ფოტოგრაფიის შემსწავლელი კურსი",
      trainer: "ნათია დადეშკელიანი",
      currentPrice: "450.00 ₾",
      originalPrice: "560.00 ₾",
      showButton: true,
    },
    {
      id: 2,
      image: course2,
      title: "მოუშენ დიზაინი (Adobe After Effects) - კურსი",
      trainer: "ნათია დადეშკელიანი",
      currentPrice: "450.00 ₾",
      originalPrice: "650.00 ₾",
      showButton: false,
    },
    {
      id: 3,
      image: course2,
      title: "საოფისე პროგრამების (MS Office) კურსი",
      trainer: "ნათია დადეშკელიანი",
      currentPrice: "450.00 ₾",
      originalPrice: "490.00 ₾",
      showButton: false,
    },
    {
      id: 4,
      image: course3,
      title: "ვიდეო მონტაჟი (Adobe Premiere Pro) - კურსი",
      trainer: "ნათია დადეშკელიანი",
      currentPrice: "450.00 ₾",
      originalPrice: "540.00 ₾",
      showButton: false,
    },
  ];

  return (
    <section className="container px-4 md:px-6 py-8 max-md:py-9 md:py-6">
      <Headline text="აირჩიე სასურველი კურსი და დარეგისტრირდი" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 mt-8 md:mt-12 mb-5">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white card-shadow rounded-[16px] flex flex-col h-full"
          >
            <div className="relative w-full pt-[65%] overflow-hidden rounded-t-[16px]">
              <Image
                className="object-cover absolute top-0 left-0 w-full h-full rounded-tl-[16px] rounded-tr-[16px]"
                quality={100}
                src={course.image}
                alt={`course-image-${course.id}`}
                layout="fill"
              />
            </div>
            <div className="p-3 md:p-4 flex flex-col flex-grow">
              <h3 className="text-base mt-2 font-bold text-secondary-500 caps-text line-clamp-2">
                {course.title}
              </h3>
              <p className="mt-4 md:mt-6 text-secondary-500 font-regular text-xs md:text-sm mb-3 md:mb-4">
                ტრენერი: {course.trainer}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center flex-wrap">
                  <p className="font-bold text-secondary-500 text-base md:text-lg">
                    {course.currentPrice}
                  </p>
                  <span className="ml-2 line-through text-xs md:text-sm text-[#838383] font-bold">
                    {course.originalPrice}
                  </span>
                </div>
                {course.showButton && (
                  <Button className="caps-text text-[10px] md:text-[12px] h-[26px] md:h-[32px] max-sm:text-[11px] w-[110px] md:w-[124px]">
                    რეგისტრაცია
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center text-center">
        <SeeAllButton buttonText="ყველას ნახვა" />
      </div>
    </section>
  );
}
