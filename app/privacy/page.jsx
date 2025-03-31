import Image from "next/image";
import Link from "next/link";
import HomeIcon from "../../public/homeIcon.svg";
import rightArrow from "../../public/rightArrow.svg";
import React from "react";

export const metadata = {
  title: "წესები და პირობები",
};

export default function page() {
  return (
    <div className="container text-secondary-500 max-sm:max-w-[90%] mx-auto max-sm:text-sm mt-[138px]">
      <div className="flex max-sm:flex-col max-sm:items-center max-sm:text-center items-center gap-3 my-5 sm:my-7">
        <Link href="/">
          <Image
            className="w-[14px] h-[12px] sm:w-[16px] sm:h-[14px]"
            src={HomeIcon}
            alt="homeIcon-svg"
          />
        </Link>
        <Image
          className="mt-[2px]  max-sm:rotate-90"
          src={rightArrow}
          alt="rightArrow-svg"
        />
        <Link href="/privacy">
          <p className="caps-text text-xs sm:text-sm font-regular text-[#6A737D] mt-[5px]">
            წესები და პირობები
          </p>
        </Link>
      </div>
      <p className="mb-4">
        კონფიდენციალურობის პოლიტიკა ბოლო განახლება: 27.03.2025
      </p>
      <p className="mb-4">
        იდეარუმის აკადემია დიდ მნიშვნელობას ანიჭებს მომხმარებელთა
        კონფიდენციალურობის დაცვას. აღნიშნული კონფიდენციალურობის პოლიტიკა
        განმარტავს, თუ როგორ ვაგროვებთ, ვიყენებთ და ვიცავთ თქვენს პერსონალურ
        მონაცემებს.
      </p>

      <p className="mb-4">
        **1. შეგროვებული ინფორმაცია** როდესაც დარეგისტრირდებით ჩვენს ვებგვერდზე,
        ვაგროვებთ შემდეგ ინფორმაციას: სახელი, გვარი ელ.ფოსტა ტელეფონის ნომერი
        ნებისმიერი სხვა ინფორმაცია, რომელსაც თავად მოგვაწვდით (მაგალითად,
        კომენტარები, შეფასებები და ა.შ.)
      </p>

      <p className="mb-4">
        **2. მონაცემთა გამოყენება** თქვენი მონაცემები გამოიყენება შემდეგი
        მიზნით: თქვენი რეგისტრაციისა და ანგარიშის მართვა სასწავლო პროცესთან
        დაკავშირებული ინფორმაციის მიწოდება ტექნიკური მხარდაჭერის გაწევა სერვისის
        გაუმჯობესება და პერსონალიზაცია
      </p>

      <p className="mb-4">
        **3. მონაცემთა გაზიარება** ჩვენ არ ვყიდით და არ ვაქირავებთ თქვენს
        პერსონალურ მონაცემებს მესამე პირებზე.
      </p>

      <p className="mb-4">
        **4. მონაცემთა დაცვა** ჩვენ ვიყენებთ უსაფრთხოების შესაბამის ზომებს
        თქვენი მონაცემების დაცვისთვის და არასანქცირებული წვდومის თავიდან
        აცილებისთვის.
      </p>

      <p className="mb-4">
        **5. თქვენი უფლებები** თქვენ გაქვთ უფლება: მოითხოვოთ წვდომა თქვენს
        მონაცმებზე მოითხოვოთ მონაცემთა განახლება ან წაშლა
      </p>

      <p className="mb-4">
        **6. კონტაქტი** თუ გაქვთ შეკითხვები კონფიდენციალურობის პოლიტიკის
        შესახებ, შეგიძლიათ დაგვიკავშირდეთ: idearoom.ge@gmail.com (+995) 598 95
        57 95
      </p>

      <p>გმადლობთ, რომ ენდობით ჩვენს აკადემიას!</p>
    </div>
  );
}
