"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import profilePic from "../../public/logo.svg";
import Headline from "./Headline";
import { getAllLecturers } from "../services/apiLecturer";

export const InfiniteMovingCards = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cloneCreatedRef = useRef(false);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  // Fetch lecturers data from API
  useEffect(() => {
    async function fetchLecturers() {
      try {
        setLoading(true);
        const data = await getAllLecturers();
        setLecturers(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch lecturers:", err);
        setError("Failed to load lecturers");
        setLoading(false);
      }
    }
    fetchLecturers();
  }, []);

  // Function to handle card click
  const handleCardClick = (item, e) => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-play-state",
        "paused"
      );
    }
    e.stopPropagation();
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  // Resume animation when dialog closes
  useEffect(() => {
    if (!isDialogOpen && containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-play-state",
        "running"
      );
    }
  }, [isDialogOpen]);

  // Clone items and setup animation
  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current || lecturers.length === 0)
      return;

    if (!cloneCreatedRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      const originalItemCount = lecturers.length;
      while (scrollerRef.current.children.length > originalItemCount) {
        scrollerRef.current.removeChild(scrollerRef.current.lastChild);
      }
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.addEventListener("click", (e) => {
          const index = parseInt(duplicatedItem.getAttribute("data-index"), 10);
          if (!isNaN(index) && index >= 0 && index < lecturers.length) {
            handleCardClick(lecturers[index], e);
          }
        });
        scrollerRef.current.appendChild(duplicatedItem);
      });
      cloneCreatedRef.current = true;
    }

    const durationMap = {
      fast: "30s",
      normal: "50s",
      slow: "90s",
    };

    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
      containerRef.current.style.setProperty(
        "--animation-duration",
        durationMap[speed] || "50s"
      );
      containerRef.current.style.setProperty(
        "--animation-iteration-count",
        "infinite"
      );
      containerRef.current.style.setProperty("--animation-timing", "linear");
    }

    setStart(true);

    return () => {
      setStart(false);
    };
  }, [direction, speed, lecturers]);

  // თუ მონაცემები ჯერ ჩატვირთება, განსახილველის დროს მხოლოდ ეს ლოდერი გაიხსნება
  if (loading) {
    return (
      <section className="relative z-50 w-full h-screen">
        <div className="absolute spinner top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"></div>
      </section>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">{error}</div>;
  }

  if (lecturers.length === 0) {
    return <div className="text-center p-8">No lecturers found</div>;
  }

  return (
    <>
      <div className="mb-[20px] mt-[-50px]">
        <Headline text="ლექტორები" />
      </div>
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 max-w-7xl overflow-hidden rounded-[10px]",
          "[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          "p-4",
          className
        )}
        onMouseEnter={() => {
          if (pauseOnHover) {
            setIsHovering(true);
            if (containerRef.current) {
              containerRef.current.style.setProperty(
                "--animation-play-state",
                "paused"
              );
            }
          }
        }}
        onMouseLeave={() => {
          if (pauseOnHover) {
            setIsHovering(false);
            if (containerRef.current && !isDialogOpen) {
              containerRef.current.style.setProperty(
                "--animation-play-state",
                "running"
              );
            }
          }
        }}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-6",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]",
            "will-change-transform"
          )}
          style={{
            animationDuration: "var(--animation-duration)",
            animationTimingFunction: "var(--animation-timing)",
            animationIterationCount: "var(--animation-iteration-count)",
            animationDirection: "var(--animation-direction)",
            animationPlayState: start
              ? isHovering || isDialogOpen
                ? "paused"
                : "running"
              : "paused",
          }}
        >
          {lecturers.map((lecturer, idx) => (
            <li
              className="relative items-center flex h-[230px] w-[350px] max-w-full shrink-0 rounded-[30px] bg-white hover:-translate-y-[4px] duration-300 transition-all border border-secondary-50 px-7 py-6 cursor-pointer md:w-[450px]"
              key={lecturer.fullName + idx}
              data-index={idx}
              onClick={(e) => handleCardClick(lecturer, e)}
            >
              <blockquote>
                <div className="mb-3 flex items-center">
                  <img
                    src={lecturer.lecturer_image || profilePic.src}
                    alt={lecturer.fullName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-[700] caps-text text-secondary-500">
                      {lecturer.fullName}
                    </p>
                    <p className="text-xs caps-text text-secondary-500">
                      {lecturer.field}
                    </p>
                  </div>
                </div>
                <p className="relative mt-7 leading-[24px] text-sm text-secondary-500 line-clamp-4">
                  {lecturer.lecturer_text}
                </p>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="text-secondary-500 max-h-[90vh] overflow-y-auto max-sm:max-w-[90%] max-sm:max-h-[80vh] sm:max-w-[600px] bg-white shadow-none rounded-[30px] p-6 sm:p-10 max-sm:ml-0 max-sm:mr-auto">
          <DialogHeader className="max-sm:items-start">
            <DialogTitle className="flex max-sm:text-left mb-5 sm:mb-7 items-center gap-2 max-sm:justify-start w-full">
              <img
                src={selectedItem?.lecturer_image || profilePic.src}
                alt="profile-image"
                className="w-[60px] max-sm:w-[40px] max-sm:h-[40px] h-[60px] mr-2 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-grow min-w-0 w-full">
                <span className="caps-text max-sm:text-[15px] text-primary-500 block whitespace-normal break-words overflow-visible">
                  {selectedItem?.fullName}
                </span>
                <span className="block mt-1 caps-text text-sm text-secondary-500 whitespace-normal break-words overflow-visible">
                  {selectedItem?.field}
                </span>
              </div>
            </DialogTitle>
            <div className="pt-4 relative">
              <span className="absolute -left-1 -top-2 text-4xl text-secondary-500">
                "
              </span>
              <div className="px-3 max-sm:text-sm regular-text text-secondary-500 text-base leading-[24px] max-sm:text-left overflow-auto">
                {selectedItem?.lecturer_text}
              </div>
              <span className="absolute -right-1 bottom-[-15px] text-4xl text-secondary-500">
                "
              </span>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
