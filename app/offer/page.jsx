"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiDoubleCourse } from "../services/apiDoubleCourse";
import HeadTopCourse from "../courses/_components/HeadTopCourse";

export default function Page() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "idearoom | შეთავაზება";
    async function fetchCourses() {
      try {
        const data = await apiDoubleCourse();
        // Sort courses by date (assuming there's a created_at or date field)
        // If your API doesn't return a date field, you'll need to modify this
        const sortedCourses = data.sort((a, b) => {
          // If you have a date field, use that for sorting
          // For example: return new Date(b.created_at) - new Date(a.created_at);

          // If you're using an ID that increments with newer courses
          return b.id - a.id;
        });
        setCourses(sortedCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div>
        <section className="relative z-50 bg-white w-full h-screen">
          <div className="absolute spinner top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"></div>
        </section>
      </div>
    );
  }

  if (error) {
    return <div>Error loading courses</div>;
  }

  return (
    <div className="container mx-auto max-sm:max-w-[90%] mt-[80px] py-8">
      <div className="mt-2">
        <HeadTopCourse>
          <p className="cursor-pointer">კურსები</p>
        </HeadTopCourse>
      </div>
      <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white blog-shadow relative rounded-[20px] p-6"
          >
            <div className="relative">
              <img
                className="mb-5 w-full relative"
                src={course.image}
                alt={`course-image-${course.id}`}
              />
              <p className="absolute max-sm:py-[5px] max-sm:px-4 max-sm:text-sm bg-[#FDB927] top-[10px] right-[10px] px-5 py-[5px] shadow-lg pt-[10px] rounded-full text-secondary-900 font-bold caps-text">
                -{course.discount_percentage}%
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {course.course_category.map((category, id) => {
                return (
                  <div key={id}>
                    <p className="text-sm max-lg:text-xs caps-text font-bold text-secondary-800 bg-[#EBF0F3] py-[6px] px-4 rounded-full">
                      {category}
                    </p>
                  </div>
                );
              })}
            </div>
            <h2 className="text-lg mt-4 text-[#282525] font-bold mb-2 caps-text">
              {course.title}
            </h2>
            <p className="text-[#383838] mb-6 line-clamp-2">{course.text}</p>
            <div className="w-full h-[1px] bg-[#EFF2F5] mb-6"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-primary-500 text-xl lg:mr-2 font-bold">
                  ₾ {course.price}
                </span>
                <span className="text-gray-400 line-through">
                  ₾ {course.old_price}
                </span>
              </div>
              <Link href={`/offer/${course.id}`}>
                <button className="w-full hover:translate-y-[-3px] duration-300 transition-all rounded-[12px] bg-primary-500 text-[#fff] hover:text-secondary-900 hover:bg-[#FDB927] py-2 pt-3 text-sm caps-text font-bold px-5">
                  დეტალურად
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
