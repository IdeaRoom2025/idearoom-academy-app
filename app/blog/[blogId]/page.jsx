import React from "react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import Icons from "../../_components/Icons";
import calendar from "../../../public/calendar.svg";
import { getBlogs } from "../../services/apiBlogs";
import HeadTop from "../_components/HeadTop";

// Fixed signature and ensuring static generation
export async function generateMetadata({ params }) {
  const blogId = params.blogId;
  const blogs = await getBlogs();
  const blog = blogs.find((item) => item.id === parseInt(blogId));

  if (!blog) {
    return {
      title: "ბლოგი ვერ მოიძებნა",
      description: "მოთხოვნილი ბლოგი არ არსებობს ან წაშლილია",
    };
  }

  return {
    title: `${blog.title}`,
    description: blog.text,
    openGraph: {
      images: [
        {
          url: blog.image,
        },
      ],
    },
    robots: {
      follow: false,
      index: true,
    },
  };
}

function formatDateGeorgian(dateString) {
  const date = new Date(dateString);
  const georgianMonths = [
    "იანვარი",
    "თებერვალი",
    "მარტი",
    "აპრილი",
    "მაისი",
    "ივნისი",
    "ივლისი",
    "აგვისტო",
    "სექტემბერი",
    "ოქტომბერი",
    "ნოემბერი",
    "დეკემბერი",
  ];
  const day = date.getDate();
  const month = georgianMonths[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

// Force static rendering
export const dynamic = "force-static";
export const revalidate = false;

export default async function BlogPage({ params }) {
  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.id === parseInt(params.blogId));

  // Loading component
  if (!blog) {
    return (
      <div className="container max-sm:max-w-[95%] mx-auto py-10">
        <HeadTop headText="ბლოგი" />
        <div className="bg-white h-[475px] rounded-[20px] p-8">
          <h1 className="text-2xl font-bold">ბლოგი ვერ მოიძებნა</h1>
          <Link href="/blog">
            <Button className="mt-4">უკან დაბრუნება</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="container max-sm:max-w-[90%] mt-[128px] mx-auto">
      <div className="max-sm:mb-12">
        <HeadTop headText="ბლოგი" blogTitle={blog.title} />
      </div>
      <div className="bg-white relative rounded-[20px] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between min-h-[475px]">
        <div className="w-full  md:w-auto md:mt-[-40px] mb-6 md:mb-0">
          <h3 className="text-lg sm:text-xl text-secondary-500 font-bold caps-text max-w-[500px] mb-3 sm:mb-5">
            {blog.title}
          </h3>
          <div className="text-secondary-500 flex items-center gap-2 mb-4 text-[12px] max-sm:mb-8">
            <Image src={calendar} alt="calendar-icon" />{" "}
            {formatDateGeorgian(blog.created_at)}
          </div>
          <div className="flex md:absolute md:bottom-[30px] gap-4 items-center mt-4 md:mt-0">
            <Icons />
          </div>
        </div>
        <div className="w-full md:w-auto mt-4 md:mt-0">
          <img
            className="w-full h-auto md:h-[403px] md:w-[539px] object-cover rounded-[12px]"
            src={blog.image}
            width={539}
            quality={100}
            height={403}
            alt={blog.title}
          />
        </div>
      </div>
      <div className="my-6 sm:my-10 max-sm:mt-12">
        <div className="prose max-w-none">
          <p className="text-base max-sm:text-sm text-secondary-500">
            {blog.text.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
      <div>
        <div className="border-t border-[#EBF0F6] my-6 sm:my-10"></div>
        <div className="caps-text flex gap-2 flex-wrap items-center font-medium text-secondary-500">
          <p className="mr-1 mt-[3px]">ტეგები: </p>
          {blog.tags &&
            blog.tags.map((tag, i) => (
              <div className="mb-1" key={i}>
                <p className="text-[12px] text-secondary-500 bg-[#EAEFF4] p-1 px-3 pt-2 rounded-[4px]">
                  {tag}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const blogs = await getBlogs();

  return blogs.map((blog) => ({
    blogId: blog.id.toString(),
  }));
}
