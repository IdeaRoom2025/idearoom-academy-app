"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { getCourses } from "../services/apiCourses";
import { useParams } from "next/navigation";
import HeadTopCourse from "./_components/HeadTopCourse";

export default function page() {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "idearoom | კურსები";
    async function fetchCourse() {
      try {
        const data = await getCourses();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);
  return (
    <section className="container max-sm:max-w-[90%] mt-[128px] mx-auto">
      <HeadTopCourse>
        <p className="cursor-pointer">კურსები</p>
      </HeadTopCourse>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 mt-8 mb-5">
        {course
          .slice()
          .reverse()
          .map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <div className="bg-white blog-shadow rounded-[16px] flex flex-col h-full">
                <div className="relative w-full pt-[65%] overflow-hidden rounded-t-[16px]">
                  <img
                    className="object-cover absolute top-0 left-0 w-full h-full rounded-tl-[16px] rounded-tr-[16px]"
                    quality={100}
                    src={course.image}
                    alt={`course-image-${course.id}`}
                    layout="fill"
                  />
                </div>
                <div className="p-3 md:p-4 flex flex-col flex-grow">
                  <h3 className="text-lg mt-2 font-bold text-secondary-500 caps-text line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-secondary-500 caps-text font-regular text-xs md:text-sm mb-3 md:mb-5">
                    ტრენერი: {course.lecturer}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center flex-wrap">
                      <p className="font-bold text-secondary-500 text-base md:text-lg bg-primary-50 pb-[2px] pt-[0px] px-4 rounded-[20px]">
                        ₾ {course.price}
                      </p>
                      <p className="font-400 text-secondary-400 text-sm line-through ml-4">
                        ₾ {course.oldprice}
                      </p>
                    </div>
                    <div>
                      <Button>დეტალურად</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
