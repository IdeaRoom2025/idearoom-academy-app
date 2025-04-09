import React from "react";
import HomeIcon from "../../../public/homeIcon.svg";
import rightArrow from "../../../public/rightArrow.svg";
import Link from "next/link";
import Image from "next/image";

export default function HeadTop({ headText, blogTitle }) {
  return (
    <div className="flex flex-wrap items-center gap-3 my-5 sm:my-7">
      <Link href="/">
        <Image
          className="w-[14px] h-[12px] sm:w-[16px] sm:h-[14px]"
          src={HomeIcon}
          alt="homeIcon-svg"
        />
      </Link>
      <Image className="mt-[2px]" src={rightArrow} alt="rightArrow-svg" />
      <Link href="/blog">
        <p className="caps-text text-xs hover:underline sm:text-sm font-regular text-[#6A737D] mt-[5px]">
          ბლოგი
        </p>
      </Link>
      {blogTitle && (
        <>
          <Image className="mt-[2px]" src={rightArrow} alt="rightArrow-svg" />
          <p className="caps-text text-xs sm:text-sm font-regular text-[#6A737D] mt-[5px]">
            {blogTitle}
          </p>
        </>
      )}
    </div>
  );
}
