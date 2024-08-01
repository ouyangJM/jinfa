import classNames from "classnames";
import React from "react";
import Moon from "../../../assets/Moon.svg";
import Sun from "../../../assets/bigSun.svg";
import down from "../../../assets/down.svg";


const MobileTicketList = (props) => {
  const { ticketList, date, clickDate, chooseTicket, clickItem } = props;
  const [showDetailId, setShowDetailId] = React.useState("");
  const [selectId, setSelectId] = React.useState("");

  return (
    <div>
      {ticketList.map((item, index) => {
        const time = item.startTime.split(" ")[1];
        const image = item.timeFlag === "NIGHT" ? Moon : Sun;
        const id = `${date}-${item.id}`;
        return (
          <div
            onClick={() => {
              setShowDetailId(item.id);
            }}
            key={index}
            style={{ boxShadow: "0px 2px 8px 0px #00000026" }}
            className="bg-[#ffffff] my-2 mx-5  flex flex-col rounded-lg"
          >
            <div className="flex justify-between w-full  px-3 py-3 rounded-t-lg">
              <div className="flex items-center ">
                <img src={image} alt="" className="h-6 mr-6" />
                <div className="text-xl">{time.slice(0, 5)}</div>
              </div>
              <div className="flex items-center">
                <div className="text-[#9C9C9C] text-sm mr-3">From</div>
                <div className="text-[#00558C] text-xl mr-3">HK${item.auditPrice}</div>
                <img
                  src={down}
                  alt=""
                  className={classNames(showDetailId === item.id? "transition duration-300 rotate-180" : "")}
                />
              </div>
            </div>
            {/* checkbox */}
            <div style={{ display: (showDetailId === item.id || selectId === item.id) ? "block" : "none" }}>
              <div className="w-full bg-[#EBEBEB]" style={{ height: "1px" }}></div>
              <div className="flex justify-between w-full  px-5 py-4">
                <div className="flex flex-col items-start justify-center">
                  <div className="text-sm">{item.seatType}</div>
                  <div className="flex">
                    <div className="mr-2">Adult</div>
                    <div className="text-[#00558C]">HK${item.auditPrice}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {!(item.stockText.indexOf(">") > -1) && (
                    <div className="text-[#FF4D4F] text-sm">{item.stockText}</div>
                  )}
                  <input
                    className="w-5 h-5"
                    type="radio"
                    name="tickets"
                    onClick={() => {
                      chooseTicket({ ...item, id, ...clickDate });
                      setSelectId(item.id)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default MobileTicketList;
