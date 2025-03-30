import Image from "next/image";
import React from "react";
import facebook from "../../public/facebook.svg";
import youtube from "../../public/youtube.svg";
import instagram from "../../public/instagram.svg";
import linkedin from "../../public/linkedin.svg";
import Link from "next/link";

export default function Icons() {
  return (
    <>
      <div className="bg-[#F9FAFB] hover:bg-secondary-50 duration-300 transition-all cursor-pointer w-12 h-12 flex items-center justify-center rounded-full p-3">
        <Link href="https://www.facebook.com/IdeaRoom.Ge" target="_blank">
          <Image
            src={facebook}
            alt="facebook-icon"
            className="object-contain"
          />
        </Link>
      </div>
      <div className="bg-[#F9FAFB] hover:bg-secondary-50 duration-300 transition-all cursor-pointer w-12 h-12 flex items-center justify-center rounded-full p-3">
        <Link href="https://www.youtube.com/@idearoom5058" target="_blank">
          <Image src={youtube} alt="youtube-icon" className="object-contain" />
        </Link>
      </div>
      <div className="bg-[#F9FAFB] hover:bg-secondary-50 duration-300 transition-all cursor-pointer w-12 h-12 flex items-center justify-center rounded-full p-3">
        <Link href="https://www.instagram.com/idearoom.ge/" target="_blank">
          <Image
            src={instagram}
            alt="instagram-icon"
            className="object-contain"
          />
        </Link>
      </div>
      <div className="bg-[#F9FAFB] cursor-pointer hover:bg-secondary-50 duration-300 transition-all w-12 h-12 flex items-center justify-center rounded-full p-3">
        <Link
          href="https://www.linkedin.com/company/idearoom.ge/"
          target="_blank"
        >
          <Image
            src={linkedin}
            alt="linkedin-icon"
            className="object-contain"
          />
        </Link>
      </div>
    </>
  );
}
