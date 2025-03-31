"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import location from "../../public/location.svg";
import phone from "../../public/phone.svg";
import homeIcon from "../../public/homeIcon.svg";
import rightArrow from "../../public/rightArrow.svg";
import message from "../../public/message.svg";
import Link from "next/link";

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Reset map loaded state when component mounts
  useEffect(() => {
    setMapLoaded(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xjkyyeya", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        alert("მოხდა შეცდომა, გთხოვთ სცადოთ თავიდან");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("მოხდა შეცდომა, გთხოვთ სცადოთ თავიდან");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <section className="container mt-[100px] max-sm:max-w-[90%] mx-auto py-8">
      <div className="flex max-sm:flex-col max-sm:items-center max-sm:text-center items-center gap-3 my-3">
        <Link href="/">
          <Image
            className="w-[14px] h-[12px] sm:w-[16px] sm:h-[14px]"
            src={homeIcon}
            alt="homeIcon-svg"
          />
        </Link>
        <Image
          className="mt-[2px] max-sm:rotate-90"
          src={rightArrow}
          alt="rightArrow-svg"
        />
        <div>
          <Link href="/contact">
            <p className="caps-text text-xs hover:underline sm:text-sm font-regular text-[#6A737D] mt-[5px]">
              კონტაქტი
            </p>
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[511px] mt-[45px] mb-12">
        {!mapLoaded && (
          <section className="absolute inset-0 flex items-center justify-center bg-white z-50">
            <div className="spinner"></div>
          </section>
        )}

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3632.8105894516802!2d42.70679547589608!3d42.27042390076394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c8d97bc0bc6d3%3A0x29f0590146f99622!2zSWRlYVJvb20g4oCiIOGDmOGDk-GDlOGDkOGDoOGDo-GDm-GDmA!5e1!3m2!1sen!2sge!4v1742385567170!5m2!1sen!2sge"
          className="rounded-[16px] w-full h-full border-0"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={handleMapLoad}
          title="Google Maps Location"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 mb-[20px]">
          <div className="flex items-center mb-6">
            <span className="border-[2px] xl:ml-[-16px] w-[36px] rotate-90 border-primary-500 rounded-[3px]"></span>
            <p className="text-lg ml-[-3px] text-[#282525] caps-text pt-2 font-bold">
              მოგვწერე
            </p>
          </div>

          {showSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
              <span className="block sm:inline">
                თქვენი წერილი წარმატებით გაიგზავნა!
              </span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-[65px] pl-[18px] rounded-[14px] p-3 text-sm text-[#282525] caps-text focus:ring-primary-500 placeholder:text-[#282525]"
                  required
                  placeholder="სახელი და გვარი *"
                />
              </div>
              <div className="w-full md:w-1/2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-[65px] pl-[18px] rounded-[14px] p-3 text-sm text-[#282525] caps-text focus:ring-primary-500 placeholder:text-[#282525]"
                  required
                  placeholder="ელ-ფოსტა *"
                />
              </div>
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full h-[350px] pl-[18px] rounded-[14px] p-3 text-sm text-[#282525] caps-text focus:ring-primary-500 placeholder:text-[#282525]"
                required
                placeholder="წერილი *"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-500 text-white py-3 px-8 rounded-lg hover:bg-[#6f59d9] transition duration-300 disabled:opacity-70"
            >
              {isSubmitting ? "იგზავნება..." : "გაგზავნა"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="flex items-center mb-6">
            <span className="border-[2px] xl:ml-[-16px] w-[36px] rotate-90 border-primary-500 rounded-[3px]"></span>
            <p className="text-lg ml-[-3px] text-[#282525] caps-text pt-2 font-bold">
              კონტაქტი
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex ml-[-4px] items-center gap-4">
              <Image src={location} alt="location svg" />
              <p className="text-sm text-[#282525]">კოსტავა N38, ქუთაისი</p>
            </div>
            <div className="flex items-center gap-4">
              <Image className="" src={phone} alt="phone svg" />
              <p className="text-sm text-[#282525]">+995 551 25 13 14</p>
            </div>
            <div className="flex items-center gap-4">
              <Image className="" src={message} alt="message svg" />
              <p className="text-sm text-[#282525]">idearoom@info.ge</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
