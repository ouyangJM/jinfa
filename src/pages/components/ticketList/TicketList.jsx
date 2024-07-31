import React from "react";
import Moon from "../../../assets/Moon.svg";
import Sun from "../../../assets/bigSun.svg";

const TicketList = (props) => {
    const {date,chooseTicket,ticketList,clickDate} = props

  return (
    <div className="flex flex-col w-full">
      {/* head */}
      <div className="flex flex-row justify-between items-center w-full bg-[#FAFAFA] py-3 px-2">
        <div className="flex justify-between items-center" style={{ flex: 6 }}>
          <div>Time</div>
          <div className="px-2 text-[#EBEBEB]">|</div>
        </div>
        <div className="flex justify-between items-center" style={{ flex: 6 }}>
          <div className="text-[#00558C]">Adult Price</div>
          <div className="px-2 text-[#EBEBEB]">|</div>
        </div>
        <div className="flex justify-between items-center" style={{ flex: 6 }}>
          <div>Remaining Tickets</div>
          <div className="px-2 text-[#EBEBEB]">|</div>
        </div>
        <div className="flex justify-between items-center" style={{ flex: 1 }}>
          <div> </div>
        </div>
      </div>
      {/* line */}
      <div className="w-full bg-[#EBEBEB]" style={{ height: "1px" }}></div>
      {/* list */}
      {ticketList && ticketList.map((item, index) => {
        const time = item.startTime.split(' ')[1];
        const image = item.timeFlag=== 'NIGHT' ? Moon : Sun;
        const id = `${date}-${item.id}`
        
        return (
          <div key={id}>
            <div className="flex flex-row justify-between items-center w-full bg-[#FAFAFA] py-3 px-2">
              <div className="flex justify-left items-center" style={{ flex: 6 }}>
                <img src={image} alt="" className="mr-1" />
                <div>{time.slice(0,5)}</div>
              </div>
              <div className="flex justify-between items-center" style={{ flex: 6 }}>
                <div className="text-[#00558C]">{item.auditPrice}</div>
              </div>
              <div className="flex justify-between items-center" style={{ flex: 6 }}>
                <div className={`${item.stockText.indexOf(">") > -1 ? "" : "text-[#FF0000]"}`}>
                  {item.stockText}
                </div>
              </div>
              <div className="flex justify-between items-center" style={{ flex: 1 }}>
                <input
                  type="radio"
                  name="tickets"
                  id=""
                  onClick={() => {
                    chooseTicket({...item,id,...clickDate});
                  }}
                />
              </div>
            </div>
            <div className="w-full bg-[#EBEBEB]" style={{ height: "1px" }}></div>
          </div>
        );
      })}
    </div>
  );
};
export default TicketList;
