import React from "react";

export const metadata = {
  title: "404 გვერდი ვერ მოიძებნა",
};

export default function notFound() {
  return (
    <section className="container max-md:max-w-[80%] text-center items-center justify-center mt-[200px]">
      <h2 className="text-[36px] lg:text-[48px] xl:text-[64px]  text-primary-500 font-bold">
        404
      </h2>
      <p className="max-sm:text-base max-lg:text-lg caps-text font-bold text-secondary-500 text-xl mt-4">
        უპს! გვერდი რომელსაც ეძებ, არ არსებობს!
      </p>
    </section>
  );
}
