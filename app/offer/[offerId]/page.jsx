"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import HeadTopCourse from "../../courses/_components/HeadTopCourse";
import checkbox from "../../../public/checkbox.svg";
import lightCalendar from "../../../public/calendarLight.svg";
import tv from "../../../public/tv.svg";
import timer from "../../../public/timer.svg";
import user from "../../../public/user.svg";
import badge from "../../../public/badge.svg";
import downArrow from "../../../public/downArrow.svg";

function AccordionItem({ title, content }) {
  useEffect(() => {
    document.title = "idearoom | შეთავაზება";
  }, []);

  return (
    <div className="py-2">
      <details className="group">
        <summary className="w-full rounded-[12px] px-6 bg-[#f9fafb] py-5 text-left font-medium text-secondary-500 caps-text flex justify-between items-center list-none cursor-pointer">
          <span className="mt-2 max-md:text-sm">{title}</span>
          <span>
            <Image
              className="group-open:rotate-180 transition-transform"
              src={downArrow}
              alt="dropdown-arrow"
            />
          </span>
        </summary>
        <div className="mt-3 text-secondary-500">
          <div className="xl:ml-12 xl:py-5">
            <ul className="list-disc pl-5">
              {Array.isArray(content) && content.length > 0 ? (
                content.map((item, i) => (
                  <li className="mb-2 text-[#535960]" key={i}>
                    {String(item)}
                  </li>
                ))
              ) : (
                <li className="mb-2 text-[#535960]">
                  {typeof content === "string" ? content : "კურსი მიუწვდომელია"}
                </li>
              )}
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}

// Tab content components for cleaner code organization
function DetailsTab({ course_details }) {
  return (
    <div className="bg-white rounded-[20px] px-4 py-6 lg:px-6 lg:py-8 mb-8 lg:mb-0">
      <p className="text-lg lg:text-xl leading-[24px] font-bold caps-text text-secondary-500 mb-5">
        კურსის აღწერა
      </p>
      <div>
        {Array.isArray(course_details) &&
          course_details.map((detail, i) => (
            <div
              key={i}
              className="flex items-start gap-3 lg:gap-4 text-sm mb-6 leading-[24px] text-secondary-500"
            >
              <Image
                src={checkbox}
                alt="checkbox"
                className="min-w-[20px] mt-1"
              />
              <p>{detail}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

function SyllabusTab({ syllabusItems }) {
  return (
    <div className="bg-white rounded-[20px] px-4 py-6 lg:px-6 lg:py-8 mb-8 lg:mb-0">
      <p className="text-lg lg:text-xl leading-[24px] font-bold caps-text text-secondary-500 mb-5">
        სილაბუსი
      </p>
      {syllabusItems.length > 0 ? (
        syllabusItems.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title || `ლექცია ${index + 1}`}
            content={item.content || []}
          />
        ))
      ) : (
        <p className="text-secondary-500">სილაბუსი არ არის ხელმისაწვდომი</p>
      )}
    </div>
  );
}

function LecturerTab({ lecturers, lecturers_details }) {
  return (
    <div className="bg-white rounded-[20px] px-4 py-6 lg:px-6 lg:py-8 mb-8 lg:mb-0">
      <div className="flex flex-col gap-6">
        {Array.isArray(lecturers) &&
          lecturers.map((lecturer, i) => (
            <div key={i} className="text-sm leading-[24px] text-secondary-500">
              <p className="font-bold caps-text mb-2 text-lg">{lecturer}</p>
              {Array.isArray(lecturers_details) && lecturers_details[i] && (
                <div className="flex items-start gap-3 lg:gap-4">
                  <p className="text-[#535960]">{lecturers_details[i]}</p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

// Helper function to process data
function processData(data) {
  if (Array.isArray(data)) return data;
  if (data == null) return [];
  if (typeof data === "string") {
    try {
      const trimmedData = data.trim();
      if (
        (trimmedData.startsWith("[") && trimmedData.endsWith("]")) ||
        (trimmedData.startsWith("{") && trimmedData.endsWith("}"))
      ) {
        return JSON.parse(trimmedData);
      }
      return [trimmedData];
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return [];
    }
  }
  return [];
}

// Helper function to ensure syllabus content is properly formatted
function validateSyllabusContent(content) {
  if (!Array.isArray(content)) return [String(content)];
  return content.map((item) => String(item));
}

function RelatedOffersLoader() {
  return (
    <section className="relative z-50 w-full">
      <div className="absolute spinner top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"></div>
    </section>
  );
}

export default function OfferPage({ params }) {
  // Unwrap params to get the offerId
  const unwrappedParams = React.use(params);
  const offerId = unwrappedParams.offerId;

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [relatedOffers, setRelatedOffers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the offer by ID using the unwrapped offerId
        const response = await fetch(`/api/offer?id=${offerId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch offer");
        }
        const data = await response.json();
        // Ensure start_course field exists
        if (!data.start_course) {
          data.start_course = "მალე დაიწყება"; // Default value if not present
        }
        setOffer(data);
        console.log("Offer data:", data); // Debug log to see actual data
        console.log("Start course field:", data.start_course); // Specifically check start_course field

        // Fetch related offers
        const allOffersResponse = await fetch("/api/offers");
        if (!allOffersResponse.ok) {
          throw new Error("Failed to fetch related offers");
        }
        const allOffers = await allOffersResponse.json();
        setRelatedOffers(
          allOffers.filter((o) => o.id !== parseInt(offerId)).slice(0, 4)
        );
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [offerId]);

  if (loading) {
    return (
      <div>
        <section className="relative z-50 bg-white w-full h-screen">
          <div className="absolute spinner top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"></div>
        </section>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="container max-w-[95%] mx-auto px-4 py-10 mt-[128px]">
        <HeadTopCourse isCoursesPage={false}>
          <p className="cursor-pointer">შეთავაზება</p>
        </HeadTopCourse>
        <div className="bg-white h-[475px] rounded-[20px] p-8">
          <h1 className="text-2xl font-bold">შეთავაზება ვერ მოიძებნა</h1>
          <Link href="/offer">
            <Button className="mt-4">უკან დაბრუნება</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Process syllabus data
  let syllabusItems = [];
  const titles = processData(offer.syllabus_title);
  const contents = processData(offer.syllabus_content);

  if (Array.isArray(titles) && titles.length > 0) {
    syllabusItems = titles.map((title, index) => {
      let contentArray = [];
      if (Array.isArray(contents) && contents.length > index) {
        contentArray = validateSyllabusContent(contents[index]);
      }
      return {
        title: `ლექცია ${index + 1}: ${title}`,
        content: contentArray,
      };
    });
  } else if (Array.isArray(contents) && contents.length > 0) {
    syllabusItems = contents.map((contentArray, index) => ({
      title: `ლექცია ${index + 1}`,
      content: validateSyllabusContent(contentArray),
    }));
  }

  if (syllabusItems.length === 0) {
    syllabusItems = [
      {
        title: "ლექცია 1",
        content: ["შინაარსი 1", "შინაარსი 2"],
      },
    ];
  }

  const course_details = processData(offer.course_details);
  const lecturers = processData(offer.lecturers);
  const lecturers_details = processData(offer.lecturers_details);

  return (
    <section className="container mx-auto max-sm:max-w-[90%] max-sm:mx-auto mt-[128px]">
      <HeadTopCourse isCoursesPage={false}>
        <p className="cursor-pointer ">{offer.title}</p>
      </HeadTopCourse>
      <div className="grid grid-cols-1 max-sm:mt-7 lg:grid-cols-12 gap-8 xl:gap-12">
        {/* მარცხენა კოლონა: კურსის დეტალები და სილაბუსი */}
        <div className="lg:col-span-7">
          <img
            className="w-[100%] max-sm:h-auto rounded-[18px] h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            quality={100}
            src={offer.image}
            alt={offer.title}
          />
          <h4 className="text-xl caps-text font-bold mt-6 lg:mt-8 text-secondary-500">
            {offer.title}
          </h4>
          <p className="text-secondary-500 mt-2 text-sm caps-text">
            <span className="font-bold">ლექტორები:</span>{" "}
            {Array.isArray(lecturers) && lecturers.length > 0
              ? lecturers.join(", ")
              : ""}
          </p>

          {/* ტაბების მენიუ */}
          <div className="flex my-5 lg:my-7 mb-8 lg:mb-12 text-sm items-center gap-3 caps-text overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setActiveTab("details")}
              className={`${
                activeTab === "details"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-secondary-500"
              } pt-3 lg:pt-4 p-2 lg:p-3 px-3 lg:px-5 rounded-[8px] cursor-pointer`}
            >
              კურსის დეტალები
            </button>
            <button
              onClick={() => setActiveTab("syllabus")}
              className={`${
                activeTab === "syllabus"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-secondary-500"
              } pt-3 lg:pt-4 p-2 lg:p-3 px-3 lg:px-5 rounded-[8px] cursor-pointer`}
            >
              სილაბუსი
            </button>
            <button
              onClick={() => setActiveTab("lecturer")}
              className={`${
                activeTab === "lecturer"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-secondary-500"
              } pt-3 lg:pt-4 p-2 lg:p-3 px-3 lg:px-5 rounded-[8px] cursor-pointer`}
            >
              ლექტორები
            </button>
          </div>

          {/* ტაბის კონტენტი */}
          {activeTab === "details" && (
            <DetailsTab course_details={course_details} />
          )}
          {activeTab === "syllabus" && (
            <SyllabusTab syllabusItems={syllabusItems} />
          )}
          {activeTab === "lecturer" && (
            <LecturerTab
              lecturers={lecturers}
              lecturers_details={lecturers_details}
            />
          )}
        </div>

        {/* მარჯვენა კოლონა: კურსის სხვა დეტალები */}
        <div className="lg:col-span-5">
          <div className="bg-white w-full relative px-4 py-6 lg:px-6 lg:py-8 rounded-[20px] mb-8">
            {offer.courseIcon && (
              <img
                className="hidden xl:block absolute max-w-[95%] bottom-[85px] right-[10px]"
                src={offer.courseIcon}
                alt="illustration svg"
              />
            )}
            <h3 className="text-base lg:text-lg font-bold caps-text text-secondary-500 mb-4">
              კურსის დეტალები
            </h3>
            <div>
              <div className="flex my-1 items-center gap-3 caps-text">
                <Image src={lightCalendar} alt="calendar icon" />
                <p className="mt-2 text-secondary-500 font-[500] text-sm lg:text-[15px]">
                  დაწყების თარიღი:{" "}
                  <span className="text-[#88919C] ml-1">
                    {offer.start_course || "მალე დაიწყება"}
                  </span>
                </p>
              </div>
              <div className="flex my-1 items-center gap-3 caps-text">
                <Image src={tv} alt="tv icon" />
                <p className="mt-2 text-secondary-500 font-[500] text-sm lg:text-base">
                  კურსის ხანგრძლივობა:{" "}
                  <span className="text-[#88919C] ml-1">
                    {offer.qunatity_of_lessons || offer.quantity_of_lessons}{" "}
                    შეხვედრა
                  </span>
                </p>
              </div>
              <div className="flex my-1 items-center gap-3 caps-text">
                <Image src={timer} alt="timer icon" />
                <p className="mt-2 text-secondary-500 font-[500] text-sm lg:text-base">
                  შეხვედრის ხანგრძლივობა:{" "}
                  <span className="text-[#88919C] ml-1">
                    {offer.lesson_time} საათი
                  </span>
                </p>
              </div>
              <div className="flex my-1 items-center gap-3 caps-text">
                <Image src={user} alt="user icon" />
                <p className="mt-2 text-secondary-500 font-[500] text-sm lg:text-base">
                  სტუდენტები ჯგუფში:{" "}
                  <span className="text-[#88919C] ml-1">
                    {offer.qunatity_of_students || offer.quantity_of_students}
                  </span>
                </p>
              </div>
              <div className="flex my-1 items-center gap-3 caps-text">
                <Image src={badge} alt="badge icon" />
                <p className="mt-2 text-secondary-500 font-[500] text-sm lg:text-base">
                  სერთიფიკატი და სტაჟირება
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-base lg:text-lg text-secondary-500 caps-text mt-6 lg:mt-8">
                ფასი: <span className="font-bold">₾ {offer.price}</span>
              </p>
              <p className="text-[14px] line-through font-[300] ml-4 caps-text text-red-500 mt-6 lg:mt-8">
                <span className="font-bold leading-[24px]">
                  ₾ {offer.old_price}
                </span>
              </p>
            </div>
            <div className="space-y-4 mt-4 lg:mt-6">
              <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white text-[15px] lg:text-[16px] pt-3 lg:pt-4 h-[48px] lg:h-[56px] caps-text font-bold">
                დარეგისტრირდი
              </Button>
            </div>
          </div>

          {/* Related offers section */}
          <div>
            <h4 className="caps-text mt-8 lg:mt-[64px] text-secondary-500 text-base font-bold mb-4">
              სხვა შეთავაზებები
            </h4>
            <div className="bg-white p-3 lg:p-4 w-full rounded-[20px]">
              {relatedOffers.length > 0 ? (
                relatedOffers.map((relatedOffer, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row mb-4 items-start md:items-center overflow-hidden rounded-[12px] bg-[#F9FAFB]"
                  >
                    <img
                      src={relatedOffer.image}
                      alt={`offer-image-${relatedOffer.id}`}
                      className="object-cover w-[200px] h-[190px] max-sm:w-full max-sm:max-w-[100%] max-sm:h-[350px] mx-auto rounded-lg md:rounded-none"
                    />

                    <div className="caps-text max-md:p-4 sm:max-md:p-8 mt-3 md:mt-0 max-lg:mb-5 md:ml-8 lg:ml-8 text-[#282525] w-full">
                      <p className="font-[500] text-base">
                        {relatedOffer.title}
                      </p>
                      <p className="text-sm my-2 font-[500] leading-[24px]">
                        {Array.isArray(relatedOffer.lecturers) &&
                        relatedOffer.lecturers.length > 1
                          ? "ტრენერები: "
                          : "ტრენერი: "}
                        {Array.isArray(relatedOffer.lecturers)
                          ? relatedOffer.lecturers.join(", ")
                          : relatedOffer.lecturers}
                      </p>

                      <Link href={`/offer/${relatedOffer.id}`}>
                        <Button className="w-full max-lg:text-[13px] lg:w-[140px] xl:w-[180px] h-[44px] md:w-[140px] mt-1 lg:mt-2 text-sm">
                          დეტალურად
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <RelatedOffersLoader />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
