"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import cancel from "../../public/whiteCancel.svg";
import Headline from "./Headline";
import { getAllLecturers } from "../services/apiLecturer";
import Image from "next/image";

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
    return <div className="text-center p-8">ვერ მოიძებნა ლექტორები</div>;
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
            "flex w-max min-w-full shrink-0 flex-nowrap gap-4 ",
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
              className="relative justify-center text-center items-center w-[336px] flex h-[400px] max-w-full rounded-[16px] shrink-0 bg-white duration-300 transition-all  cursor-pointer"
              key={lecturer.fullName + idx}
              data-index={idx}
              onClick={(e) => handleCardClick(lecturer, e)}
            >
              <div className="flex relative justify-center items-center">
                <img
                  className="w-[312px] rounded-[12px] h-[376px] object-cover"
                  src={lecturer.lecturer_image}
                  alt="lecturer_image"
                />
                <div className="bg-[#8471D9E5] w-[296px] h-[103px] rounded-[12px] mb-[6px] flex flex-col items-center text-center absolute bottom-0 text-white">
                  <h4 className="text-base mt-[30px] text-center justify-center items-center caps-text font-bold">
                    {lecturer.fullName}
                  </h4>
                  <p className="caps-text text-sm">{lecturer.field}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="text-secondary-500 max-h-[90vh] overflow-y-auto max-sm:max-w-[90%] min-w-[800px] outline-none  border-none bg-transparent shadow-none rounded-[30px]  max-sm:mr-auto">
          <DialogHeader className="max-sm:items-start">
            <DialogTitle className="flex max-sm:text-left mb-5 sm:mb-7 items-center gap-2 max-sm:justify-start w-full"></DialogTitle>
            <div className="relative">
              <Image
                onClick={() => setIsDialogOpen(!isDialogOpen)}
                className="absolute cursor-pointer w-[35px] h-[35px] z-50 right-[2%] top-[4%]"
                src={cancel}
                alt="cancel-svg"
              />
              {selectedItem && (
                <video
                  controls
                  muted={false}
                  autoPlay={true}
                  playsInline
                  className="w-full border-none outline-none rounded-[16px] relative h-full"
                  onLoadStart={() => console.log("Video is loading")}
                  onLoadedData={() => console.log("Video loaded successfully")}
                  onError={(e) => console.error("Video failed to load", e)}
                >
                  <source src={selectedItem.lecturer_video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
