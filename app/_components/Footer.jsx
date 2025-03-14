import Image from "next/image";
import Logo from "./Logo";
import facebook from "../../public/facebook.svg";
import youtube from "../../public/youtube.svg";
import instagram from "../../public/instagram.svg";
import linkedin from "../../public/linkedin.svg";

export default function Footer() {
  return (
    <footer>
      <div className="container max-sm:max-w-[90%] mx-auto px-4 pt-10 flex flex-col justify-center items-center text-center mt-24 bg-white rounded-[16px] min-h-[300px] md:min-h-[441px] mb-12">
        {/* ეს ჩავამატოთ? */}
        {/* <Logo /> */}
        <div>
          <div className="mb-4">
            <h4 className="uppercase text-sm font-medium text-secondary-500 mb-[5px] mt-24">
              ACADEMY OF IDEAROOM
            </h4>
            <h4 className="uppercase caps-text text-sm mb-4 font-medium text-secondary-500">
              იდეარუმის აკადემია
            </h4>
          </div>
          <p className="text-secondary-500 text-sm mb-5">
            © 2024. საქართველო, ქუთაისი | ყველა უფლება დაცულია
          </p>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="bg-[#F9FAFB] hover:bg-secondary-50 duration-300 transition-all cursor-pointer w-12 h-12 flex items-center justify-center rounded-full p-3">
              <Image
                src={facebook}
                alt="facebook-icon"
                className="object-contain"
              />
            </div>
            <div className="bg-[#F9FAFB] hover:bg-secondary-50 duration-300 transition-all cursor-pointer w-12 h-12 flex items-center justify-center rounded-full p-3">
              <Image
                src={youtube}
                alt="youtube-icon"
                className="object-contain"
              />
            </div>
            <div className="bg-[#F9FAFB] hover:bg-secondary-50 duration-300 transition-all cursor-pointer w-12 h-12 flex items-center justify-center rounded-full p-3">
              <Image
                src={instagram}
                alt="instagram-icon"
                className="object-contain"
              />
            </div>
            <div className="bg-[#F9FAFB] cursor-pointer hover:bg-secondary-50 duration-300 transition-all w-12 h-12 flex items-center justify-center rounded-full p-3">
              <Image
                src={linkedin}
                alt="linkedin-icon"
                className="object-contain"
              />
            </div>
          </div>
          <p className="uppercase caps-text mt-8 text-sm cursor-pointer hover:underline mb-8">
            წესები და პირობები
          </p>
        </div>
      </div>
    </footer>
  );
}
