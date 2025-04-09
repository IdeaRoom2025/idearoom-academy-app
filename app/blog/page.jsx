"use client";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import SeeAllButton from "../_components/SeeAllButton";
import HeadTop from "./_components/HeadTop";
import React, { useState, useEffect } from "react";
import { getBlogs } from "../services/apiBlogs";
import Loading from "../loading";

export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "idearoom | ბლოგი";

    async function fetchBlogs() {
      try {
        const data = await getBlogs();
        console.log(data);
        setBlogs(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="container max-sm:max-w-[95%] mt-[128px] mx-auto">
        <HeadTop headText="ბლოგი" />
        <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {blogs &&
            blogs.map((blog) => {
              return (
                <div
                  className="bg-white transition-all duration-200 blog-shadow p-4 sm:p-5 rounded-[20px]"
                  key={blog.id}
                >
                  <img
                    className="rounded-[12px] object-cover h-[284px] w-full"
                    src={blog.image}
                    alt="image"
                  />
                  <h4
                    className="font-bold caps-text mt-4 max-sm:pr-6 max-sm:mt-6 sm:mt-5 mb-3 sm:mb-4 text-[15px] sm:text-base"
                    href={`/blog/${blog.id}`}
                  >
                    {blog.title}
                  </h4>
                  <p className="text-[13px] sm:text-sm text-secondary-500">
                    {blog.text.split(" ").slice(0, 15).join(" ") + "..."}
                  </p>
                  <div className="flex justify-end mt-3 sm:mt-4">
                    <Link
                      className="w-full sm:w-auto"
                      href={`/blog/${blog.id}`}
                    >
                      <Button className="text-[13px] mt-4 sm:text-sm font-medium w-full sm:w-[152px] h-[40px] max-lg:h-[40px] max-lg:mt-6 lg:h-[48px] pt-2 sm:pt-3">
                        გაიგე მეტი
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="mt-4 flex justify-center ">
          <SeeAllButton buttonText="ყველას ნახვა" />
        </div>
      </section>
    </>
  );
}
