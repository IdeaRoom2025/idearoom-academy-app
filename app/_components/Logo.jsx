import Image from "next/image";
import logo from "../../public/logo.svg";

export default function Logo() {
  return (
    <Image
      className="w-[93px] h-[36px] object-cover"
      src={logo}
      alt="ideaRoom-logo"
    />
  );
}
