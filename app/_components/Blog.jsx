"use client";
import Image from "next/image";
import Headline from "./Headline";
import blogPicture from "../../public/blogPicture.png";
import { Button } from "../../components/ui/button";
import SeeAllButton from "./SeeAllButton";
import { useEffect, useState } from "react";
import { getBlogsLimited } from "../services/apiBlogs";
import Link from "next/link";

// BlogLoader კომპონენტი, რომელიც ხელახლა ავრცელებს spinner-ს მხოლოდ ბლოგის კონტეინერში
function BlogLoader() {
  return (
    <div className="absolute inset-0 bg-white flex items-center justify-center z-50">
      <div className="spinner animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default function Blog() {
  const [blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      const data = await getBlogsLimited();
      setBlog(data);
      setIsLoading(false);
    }
    fetchBlog();
  }, []);

  return (
    <section className="relative mt-12 sm:mt-16 md:mt-20 lg:mt-[72px]">
      <Headline text="ბლოგი" />
      <div className="relative container mx-auto max-sm:max-w-[85%] mt-8 sm:mt-10 md:mt-[36px] grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && <BlogLoader />}
        {!isLoading &&
          blog.map((singleBlog, blogIndex) => (
            <div
              key={blogIndex}
              className="bg-white blog-shadow py-4 h-[556px] px-5 relative cursor-pointer  rounded-[20px]"
            >
              <img
                className="w-full rounded-[12px] h-[250px] xl:h-[284px] object-cover"
                src={singleBlog.image}
                alt="blog-1"
              />
              <div className="py-4 sm:py-6">
                <h4 className="caps-text text-[#282525] font-bold text-base">
                  {singleBlog.title}
                </h4>
                <p className="text-sm leading-[1.65] font-regular mt-3 sm:mt-4  text-secondary-500">
                  {singleBlog.text.split(" ").slice(0, 15).join(" ") + "..."}
                </p>
                <div className="flex relative mt-[36px] mb-[72px]  justify-end">
                  <Link href={`blog/${singleBlog.id}`}>
                    <Button className="w-full pt-3 sm:w-[152px] text-sm rounded-[12px] h-[48px]">
                      გაიგე მეტი
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex items-center justify-center mt-4">
        <Link className="max-sm:w-[85%]" href={`/blog`}>
          <SeeAllButton buttonText="ყველას ნახვა" />
        </Link>
      </div>
    </section>
  );
}
