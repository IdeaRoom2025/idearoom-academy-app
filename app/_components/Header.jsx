"use client";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../_components/Logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav className="container max-sm:max-w-[95%] mx-auto flex items-center justify-between py-4 pl-7 pr-5 nav-shadow rounded-[16px] bg-white mt-6">
        <Logo />

        <ul className="hidden lg:flex caps-text gap-[36px] font-medium max-xl:text-[14px] max-xl:gap-[32px] text-base items-center">
          {/* შესაცვლელი: mt-[2px] უწერია რომ ცენტრში გამოჩნდეს */}
          <li className="mt-[4px]">
            <Link href="/" className="leading-[24px]">
              კურსები
            </Link>
          </li>
          {/* შესაცვლელი: mt-[2px] უწერია რომ ცენტრში გამოჩნდეს */}
          <li className="mt-[4px]">
            <Link href="/" className="leading-[24px]">
              შეთავაზება{" "}
            </Link>
          </li>
          {/* შესაცვლელი: mt-[2px] უწერია რომ ცენტრში გამოჩნდეს */}
          <li className="mt-[4px]">
            <Link href="/" className="leading-[24px]">
              ბლოგი
            </Link>
          </li>
          {/* შესაცვლელი: mt-[2px] უწერია რომ ცენტრში გამოჩნდეს */}
          <li className="mt-[4px]">
            <Link href="/" className="leading-[24px]">
              ჩვენს შესახებ
            </Link>
          </li>
          {/* შესაცვლელი: mt-[2px] უწერია რომ ცენტრში გამოჩნდეს */}
          <li className="mt-[4px]">
            <Link href="/" className="leading-[24px]">
              კონტაქტი
            </Link>
          </li>
          <li>
            {/* შესაცვლელი: mt-[2px] უწერია რომ ცენტრში გამოჩნდეს */}
            <Link href="/" className=" leading-[24px]">
              <Button>რეგისტრაცია</Button>
            </Link>
          </li>
        </ul>

        {/* მობილურის მენიუ */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* მობილურის ნავიგაცია */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-sm:max-w-[95%] mx-auto container mt-2 bg-white rounded-[16px] nav-shadow p-4">
          <ul className="flex caps-text flex-col gap-4 font-medium">
            <li>
              <Link href="/" className="block py-2 text-[14px] leading-[20px]">
                კურსები
              </Link>
            </li>
            <li>
              <Link href="/" className="block py-2 text-[14px] leading-[20px]">
                შეთავაზება
              </Link>
            </li>
            <li>
              <Link href="/" className="block py-2 text-[14px] leading-[20px]">
                ბლოგი
              </Link>
            </li>
            <li>
              <Link href="/" className="block py-2 text-[14px] leading-[20px]">
                ჩვენს შესახებ
              </Link>
            </li>
            <li>
              <Link href="/" className="block py-2 text-[14px] leading-[20px]">
                კონტაქტი
              </Link>
            </li>
            <li className="py-2">
              <Link href="/" className="block">
                <Button className="w-full text-[14px]">რეგისტრაცია</Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
