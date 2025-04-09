import { Button } from "../../components/ui/button";
import React from "react";

export default function SeeAllButton({ buttonText }) {
  return (
    <div className="flex items-center justify-center">
      <Button className="caps-text max-sm:w-[100%] w-[210px] h-[56px] pt-3 mt-9 rounded-[12px] font-regular flex text-base text-center justify-center items-center">
        {buttonText}
      </Button>
    </div>
  );
}
