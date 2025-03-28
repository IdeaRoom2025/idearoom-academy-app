import React from "react";

export default function Loading() {
  return (
    <section className="relative z-50 bg-white w-full h-screen">
      <div className="absolute spinner top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"></div>
    </section>
  );
}
