"use client";

import React from "react";
import { InfiniteMovingCards } from "../_components/InfiniteMovingCards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-auto py-8 flex flex-col antialiased   items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards direction="right" speed="slow" />
    </div>
  );
}
