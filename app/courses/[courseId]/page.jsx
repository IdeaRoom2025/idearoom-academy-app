// app/courses/[courseId]/page.js
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import HeadTop from "../../blog/_components/HeadTop";
import HeadTopCourse from "../_components/HeadTopCourse";
import { getCourses, getCourseById } from "../../services/apiCourses";
import checkbox from "../../../public/checkbox.svg";
import lightCalendar from "../../../public/calendarLight.svg";
import tv from "../../../public/tv.svg";
import timer from "../../../public/timer.svg";
import user from "../../../public/user.svg";
import badge from "../../../public/badge.svg";
import downArrow from "../../../public/downArrow.svg";

function RelatedCoursesLoader() {
  return (
    <section className="relative z-50 w-full">
      <div className="absolute spinner top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"></div>
    </section>
  );
}

// Static AccordionItem component using client-side hydration
function AccordionItem({ title, content }) {
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
function DetailsTab({ course }) {
  return (
    <div className="bg-white overflow-x-hidden  rounded-[20px] px-4 py-6 lg:px-6 lg:py-8 mb-8 lg:mb-0">
      <p className="text-lg lg:text-xl leading-[24px] font-bold caps-text text-secondary-500 mb-5">
        კურსის აღწერა
      </p>
      <div className="overflow-x-hidden">
        {Array.isArray(course.course_details) &&
          course.course_details.map((detail, i) => (
            <div
              key={i}
              className="flex overflow-x-hidden items-start gap-3 lg:gap-4 text-sm mb-6 leading-[24px] text-secondary-500"
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

function LecturerTab({ course }) {
  return (
    <div className="bg-white rounded-[20px] px-4 py-6 lg:px-6 lg:py-8 mb-8 lg:mb-0">
      <div className="flex items-start text-sm leading-[24px] text-secondary-500 gap-3 lg:gap-4">
        {course.lecturer_details ? (
          <p>
            {course.lecturer_details.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        ) : (
          <p>ინფორმაცია ლექტორის შესახებ არ არის ხელმისაწვდომი</p>
        )}
      </div>
    </div>
  );
}

// Helper function to process data from API
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

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const courseId = params.courseId;
  const course = await getCourseById(parseInt(courseId));

  if (!course) {
    return {
      title: "კურსი არ მოიძებნა !",
      description: "მოთხოვნილი კურსი ვერ მოიძებნა",
    };
  }

  return {
    title: course.title,
    description:
      Array.isArray(course.course_details) && course.course_details.length > 0
        ? course.course_details[0]
        : "Course details",
    robots: {
      follow: true,
      index: true,
    },
  };
}

// Main component for the course page
export default async function CoursePage({ params, searchParams }) {
  const courseId = params.courseId;
  const activeTab = searchParams?.tab || "details";

  // Fetch course data
  const courseData = await getCourseById(parseInt(courseId));

  if (!courseData) {
    return (
      <div className="container max-w-[95%] mx-auto px-4 py-10">
        <HeadTop headText="კურსის დეტალები" />
        <div className="bg-white mt-5 h-[475px] rounded-[20px] p-8">
          <h1 className="text-2xl font-bold">კურსი ვერ მოიძებნა</h1>
          <Link href="/courses">
            <Button className="mt-4">უკან დაბრუნება</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Process syllabus data
  let syllabusItems = [];
  const titles = processData(courseData.syllabus_title);
  const contents = processData(courseData.syllabus_content);

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

  // Get related courses
  const allCourses = await getCourses();
  const relatedCourses = allCourses
    .filter((c) => c.id !== parseInt(courseId))
    .slice(0, 4);

  return (
    <section className="container mx-auto max-sm:max-w-[90%] max-sm:mx-auto mt-[128px]">
      <HeadTopCourse isCoursesPage={false}>
        <p className="cursor-pointer">{courseData.title}</p>
      </HeadTopCourse>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
        {/* მარცხენა კოლონა: კურსის დეტალები და სილაბუსი - ახლა უფრო ფართო */}
        <div className="lg:col-span-7">
          <img
            className="w-[100%] max-sm:h-auto rounded-[18px] h-[300px] md:h-[400px] mt-[20px] lg:h-[500px] object-cover"
            quality={100}
            width={804}
            height={500}
            src={courseData.image}
            alt="courseImage"
          />
          <h4 className="text-xl caps-text font-bold mt-6 lg:mt-8 text-secondary-500">
            {courseData.title}
          </h4>
          <p className="text-secondary-500 mt-2 text-sm caps-text">
            <span className="font-bold">ლექტორი:</span> {courseData.lecturer}
          </p>

          {/* მობილურისთვის კურსის დეტალების სექცია, მხოლოდ მცირე ეკრანებზე გამოჩნდება */}
          <div className="lg:hidden block mt-6 mb-6">
            <div className="bg-white w-full relative px-4 py-6 rounded-[20px] mb-8">
              <h3 className="text-base font-bold caps-text text-secondary-500 mb-4">
                კურსის დეტალები
              </h3>
              <div>
                <div className="flex my-1 items-center gap-3 caps-text">
                  <Image src={lightCalendar} alt="calendar icon" />
                  <p className="mt-2 text-secondary-500 font-[500] text-sm">
                    დაწყების თარიღი:{" "}
                    <span className="text-[#88919C] ml-1">
                      {courseData.start_course}
                    </span>
                  </p>
                </div>
                <div className="flex my-1 items-center gap-3 caps-text">
                  <Image src={tv} alt="tv icon" />
                  <p className="mt-2 text-secondary-500 font-[500] text-sm">
                    კურსის ხანგრძლივობა:{" "}
                    <span className="text-[#88919C] ml-1">
                      {courseData.quantity_lessons} შეხვედრა
                    </span>
                  </p>
                </div>
                <div className="flex my-1 items-center gap-3 caps-text">
                  <Image src={timer} alt="timer icon" />
                  <p className="mt-2 text-secondary-500 font-[500] text-sm">
                    შეხვედრის ხანგრძლივობა:{" "}
                    <span className="text-[#88919C] ml-1">
                      {courseData.lesson_time} საათი
                    </span>
                  </p>
                </div>
                <div className="flex my-1 items-center gap-3 caps-text">
                  <Image src={user} alt="user icon" />
                  <p className="mt-2 text-secondary-500 font-[500] text-sm">
                    სტუდენტი ჯგუფში:{" "}
                    <span className="text-[#88919C] ml-1">
                      {courseData.quantity_of_students}
                    </span>
                  </p>
                </div>
                <div className="flex my-1 items-center gap-3 caps-text">
                  <Image src={badge} alt="badge icon" />
                  <p className="mt-2 text-secondary-500 font-[500] text-sm">
                    სერთიფიკატი და სტაჟირება
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-base text-secondary-500 caps-text mt-6">
                  ფასი:{" "}
                  <span className="font-bold">{courseData.price} ლარი</span>
                </p>
                <p className="text-[14px] line-through font-[300] ml-4 caps-text text-red-500 mt-6">
                  <span className="font-bold leading-[24px]">
                    {courseData.oldprice} ლარი
                  </span>
                </p>
              </div>
              <Button className="w-full mt-4 text-[15px] pt-3 h-[48px] caps-text font-bold">
                დარეგისტრირდი
              </Button>
            </div>
          </div>

          {/* ტაბების მენიუ - Using link hrefs with search params and scroll={false} */}
          <div className="flex my-5 lg:my-7 mb-8 lg:mb-12 text-sm items-center gap-3 caps-text overflow-x-auto whitespace-nowrap">
            <Link
              href={`/courses/${courseData.id}?tab=details`}
              scroll={false}
              className={`${
                activeTab === "details"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-secondary-500"
              } pt-3 lg:pt-4 p-2 lg:p-3 px-3 lg:px-5 rounded-[8px] cursor-pointer`}
            >
              კურსის დეტალები
            </Link>
            <Link
              href={`/courses/${courseData.id}?tab=syllabus`}
              scroll={false}
              className={`${
                activeTab === "syllabus"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-secondary-500"
              } pt-3 lg:pt-4 p-2 lg:p-3 px-3 lg:px-5 rounded-[8px] cursor-pointer`}
            >
              სილაბუსი
            </Link>
            <Link
              href={`/courses/${courseData.id}?tab=lecturer`}
              scroll={false}
              className={`${
                activeTab === "lecturer"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-secondary-500"
              } pt-3 lg:pt-4 p-2 lg:p-3 px-3 lg:px-5 rounded-[8px] cursor-pointer`}
            >
              ლექტორი
            </Link>
          </div>

          {/* ტაბის კონტენტი - Conditionally render based on the active tab */}
          {activeTab === "details" && <DetailsTab course={courseData} />}
          {activeTab === "syllabus" && (
            <SyllabusTab syllabusItems={syllabusItems} />
          )}
          {activeTab === "lecturer" && <LecturerTab course={courseData} />}
        </div>

        {/* მარჯვენა კოლონა: კურსის სხვა დეტალები - ახლა უფრო ვიწრო */}
        <div className="lg:col-span-5">
          {/* დიდ ეკრანებზე კურსის დეტალების სექცია */}
          <div className="bg-white w-full relative px-4 py-6 lg:px-6 lg:py-8 rounded-[20px] mb-8 max-sm:hidden">
            <img
              className="hidden xl:block absolute max-w-[95%] bottom-[85px] right-[10px]"
              src={courseData.courseIcon}
              alt="illustration svg"
            />
            <h3 className="text-base lg:text-lg font-bold caps-text text-secondary-500 mb-4">
              კურსის დეტალები
            </h3>
            <div>
              <div className="flex my-1 items-center gap-3 caps-text">
                <Image src={lightCalendar} alt="calendar icon" />
                <p className="mt-2 text-secondary-500 font-[500] text-sm lg:text-[15px]">
                  დაწყების თარიღი:{" "}
                  <span className="text-[#88919C] ml-1">
                    {courseData.start_course}
                  </span>
                </p>
              </div>
              <div className="flex my-1 items-center gap-3 caps-text">
                <Image src={tv} alt="tv icon" />
                <p className="mt-2 text-secondary-500 font-[500] text-sm lg:text-base">
                  კურსის ხანგრძლივობა:{" "}
                  <span className="text-[#88919C] ml-1">
                    {courseData.quantity_lessons} შეხვედრა
                  </span>
                </p>
              </div>
              <div className="flex my-1 items-center gap-3 caps-text">
                <Image src={timer} alt="timer icon" />
                <p className="mt-2 text-secondary-500 font-[500] text-sm lg:text-base">
                  შეხვედრის ხანგრძლივობა:{" "}
                  <span className="text-[#88919C] ml-1">
                    {courseData.lesson_time} საათი
                  </span>
                </p>
              </div>
              <div className="flex my-1 items-center gap-3 caps-text">
                <Image src={user} alt="user icon" />
                <p className="mt-2 text-secondary-500 font-[500] text-sm lg:text-base">
                  სტუდენტი ჯგუფში:{" "}
                  <span className="text-[#88919C] ml-1">
                    {courseData.quantity_of_students}
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
                ფასი: <span className="font-bold">{courseData.price} ლარი</span>
              </p>
              <p className="text-[14px] line-through font-[300] ml-4 caps-text text-red-500 mt-6 lg:mt-8">
                <span className="font-bold leading-[24px]">
                  {courseData.oldprice} ლარი
                </span>
              </p>
            </div>
            <Button className="w-full mt-4 lg:mt-6 text-[15px] lg:text-[16px] pt-3 lg:pt-4 h-[48px] lg:h-[56px] caps-text font-bold">
              დარეგისტრირდი
            </Button>
          </div>

          <div>
            <h4 className="caps-text mt-8 lg:mt-[64px] text-secondary-500 text-base font-bold mb-4">
              სხვა კურსები
            </h4>
            <div className="bg-white p-3 lg:p-4 w-full rounded-[20px]">
              {relatedCourses.length > 0 ? (
                relatedCourses.map((relatedCourse, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row mb-4 items-start md:items-center overflow-hidden rounded-[12px] bg-[#F9FAFB]"
                  >
                    <img
                      src={relatedCourse.image}
                      alt="similar-course"
                      className="object-cover w-[200px] h-[190px] max-sm:w-full max-sm:max-w-[100%] max-sm:h-[350px] mx-auto rounded-lg md:rounded-none"
                    />

                    <div className="caps-text max-md:p-4 sm:max-md:p-8 mt-3 md:mt-0 max-lg:mb-5 md:ml-8 lg:ml-8 text-[#282525] w-full">
                      <p className="font-[500] text-base lg:text-base">
                        {relatedCourse.title}
                      </p>
                      <p className="text-xs lg:text-sm mt-3 xl:mt-1 mb-3 lg:mb-4 font-[500]">
                        ტრენერი: {relatedCourse.lecturer || "ლაზარე კალმხალიძე"}
                      </p>
                      <Link href={`/courses/${relatedCourse.id}`}>
                        <Button className="w-full max-lg:text-[13px] lg:w-[140px] xl:w-[180px] h-[44px] md:w-[140px] mt-1 lg:mt-2 text-sm">
                          კურსის ნახვა
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <RelatedCoursesLoader />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Define static paths for the generation
export async function generateStaticParams() {
  try {
    const courses = await getCourses();
    return courses.map((course) => ({
      courseId: course.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
