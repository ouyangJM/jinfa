import React from "react";
import Moon from "../../../assets/Moon.svg";
import Sun from "../../../assets/bigSun.svg";

const TicketList = (props) => {
    const {date,chooseTicket,checkedList,ticketList,clickDate} = props


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
      {ticketList.map((item, index) => {
        const time = Number(item.time.split(":")[0]);
        const image = time >= 18 ? Moon : Sun;
        const id = `${date}-${item.id}`
        const isClicked = checkedList.includes(id)
        
        
        return (
          <div key={id}>
            <div className="flex flex-row justify-between items-center w-full bg-[#FAFAFA] py-3 px-2">
              <div className="flex justify-left items-center" style={{ flex: 6 }}>
                <img src={image} alt="" className="mr-1" />
                <div>{item.time}</div>
              </div>
              <div className="flex justify-between items-center" style={{ flex: 6 }}>
                <div className="text-[#00558C]">{item.price}</div>
              </div>
              <div className="flex justify-between items-center" style={{ flex: 6 }}>
                <div className={`${item.remaining.indexOf(">") > -1 ? "" : "text-[#FF0000]"}`}>
                  {item.remaining}
                </div>
              </div>
              <div className="flex justify-between items-center" style={{ flex: 1 }}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  defaultChecked={isClicked}
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
