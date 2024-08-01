import React from "react";
import Moon from "./../../../assets/Moon.svg";
import SwapRight from "./../../../assets/SwapRight.svg";
import smallSun from "./../../../assets/smallSun.svg";
import returnImg from "./../../../assets/Return.svg";
import outbound from "./../../../assets/Outbound.svg";

export default function MobileTicketItem({ data, isFirst, deleteTicket }) {
  const image = data.from === "Hong Kong" ? outbound : returnImg;

  return (
    <div>
      {!isFirst && (
        <div className="my-8">
          <div className="h-[1px] bg-gray-200" />
        </div>
      )}
      <div className="w-full flex justify-start">
        <img src={image} alt="" />
      </div>
      <div className={"w-full flex justify-between items-start"}>
        <div>
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <p className="text-sm  font-bold">{data.from}</p>
              {/* <p className="leading-5 text-xs">{data.fromTerminal}</p> */}
            </div>
            <img src={SwapRight} alt="SwapRight" className="h-6 px-1" />
            <div className="flex">
              <p className="text-sm font-bold">{data.to}</p>
              {/* <p className="leading-5 text-xs">{data.toTerminal}</p> */}
            </div>
          </div>
          <div className="flex gap-x-2 text-sm leading-4 justify-between">
            <div>{data.date}</div>
            <div>{data.dayOfWeek}</div>
            <img src={data.timeFlag === "NIGHT" ? Moon : smallSun} className="w-4" alt="smallSun" />
            {data.startTime.split(" ")[1].slice(0, 5)}
          </div>
        </div>

        <div className="flex flex-col justify-center items-end pt-1">
          <div className="text-xs">{data.seatType}</div>
          <div className="text-base">
            Adult HK${data.auditPrice} <span className="text-[#00558C]">x{data.count}</span>
          </div>
          <div
            className="text-[#00558C] text-base leading-6 font-bold cursor-pointer mt-1"
            onClick={() => {
              deleteTicket(data.newId);
            }}
          >
            Delete
          </div>
        </div>

        {/* <div className='text-[#00558C] text-base leading-6 font-bold'>
          Add Promotion code
        </div> */}
      </div>
      <div className="w-full bg-[#EBEBEB]" style={{ height: "1px" }}></div>
    </div>
  );
}
