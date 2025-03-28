"use client";
import Blog from "./_components/Blog";
import Courses from "./_components/Courses";
import Feedback from "./_components/Feedback";
import Hero from "./_components/Hero";
import Information from "./_components/Information";
import InfiniteMovingCardsDemo from "./_components/InfiniteMovingCardsDemo";

export default function Home() {
  return (
    <section>
      <Hero />
      <Courses />
      <Information />
      <Blog />
      <Feedback />
      <InfiniteMovingCardsDemo />
    </section>
  );
}
