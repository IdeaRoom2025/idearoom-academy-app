import { Button } from "../../components/ui/button";
import React from "react";

export default function SeeAllButton({ buttonText }) {
  return (
    <>
      <Button className="caps-text w-[210px] h-[56px] mt-9 rounded-[12px] font-regular text-center justify-center items-center">
        {buttonText}
      </Button>
    </>
  );
}
