import React from "react";
import Moon from "../../../assets/Moon.svg";
import Sun from "../../../assets/bigSun.svg";

const MobileTicketList = (props) => {
  const { ticketList, date, clickDate, chooseTicket ,clickItem} = props;
  const [showDetailId, setShowDetailId] = React.useState("");
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
                  src={Moon}
                  alt=""
                  onClick={() => {
                    setShowDetailId("1");
                  }}
                />
              </div>
            </div>
            {showDetailId === item.id && (
              <div>
                <div className="w-full bg-[#EBEBEB]" style={{ height: "1px" }}></div>
                <div className="flex justify-between w-full  px-4 py-3">
                  <div className="flex flex-col items-center justify-center">
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
                      type="radio"
                      name="tickets"
                      onClick={() => {
                        chooseTicket({ ...item, id, ...clickDate });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default MobileTicketList;
