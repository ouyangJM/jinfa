import React from "react";

export default function Item({ item, clickIndex }) {
  console.log(item)
  return (
    <div className="embla__slide w-full flex">
      {item.map((i, index) => {
        return (
          <div
            key={index}
            className={`m-1 py-2 bg-white flex-1 flex flex-col justify-center items-center cursor-pointer ${clickIndex === i.date ? "text-[#00558C]" : "bg-[#FAFAFA]"}`}
            onClick={() => {
              // setClickIndex(i.date);
              // setClickDate(i);
              // chooseDate(i);
              // clickDate();
            }}
          >
            <div className="text-sm">{i.date}</div>
            <div className="text-sm">{i.dayOfWeek}</div>
          </div>
        );
      })}
    </div>
  );
}
