import React, { useEffect, useState } from "react";
import TicketList from "../ticketList/TicketList";
import ArrowLeft from "./../../../assets/ArrowLeft.svg";
import ArrowRight from "./../../../assets/ArrowRight.svg";

const DatePicker = (props) => {
  const { numDays = 60, showItemNum = 10, chooseTicket, chooseDate,ticketList } = props;

  const [dates, setDates] = useState([]);
  const [showDate, setShowDate] = useState([]);
  const [clickIndex, setClickIndex] = useState("");
  const [clickDate, setClickDate] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMax, setIsMax] = useState(false);


  // 假设我们要获取未来3个月的日期
  useEffect(() => {
    const currentDate = new Date();
    const futureDates = [];

    // 循环遍历未来几个月的每一天
    // for (let m = 0; m < numMonths; m++) {
    //   let year = currentDate.getFullYear();
    //   let month = currentDate.getMonth();
    //   let daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let d = 0; d < numDays; d++) {
      const dayOfWeek = ["SUN", "MON", "THE", "WED", "THU", "FRI", "SAT"][
        currentDate.getDay()
      ];

      // 格式化日期字符串
      const formattedDate = `${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;

      // 将日期和星期几添加到数组中
      futureDates.push({ date: formattedDate, dayOfWeek });

      // 移动到下一天
      currentDate.setDate(currentDate.getDate() + 1);
      
    }
    chooseDate(futureDates[0]);
    setShowDate(futureDates.slice(0, showItemNum));
    setClickIndex(futureDates[0].date);
    setClickDate(futureDates[0])
    // 设置状态以重新渲染组件
    setDates(futureDates);
  }, []); 
  const clickLeft = () => {
    if (currentIndex === 0) return;
    setIsMax(false);
    console.log(
      "clickLeft",
      dates.slice((currentIndex - 1) * showItemNum, currentIndex * showItemNum)
    );

    setCurrentIndex(currentIndex - 1);
    setShowDate(dates.slice((currentIndex - 1) * showItemNum, currentIndex * showItemNum));
  };
  const clickRight = () => {
    if (isMax) return;
    setCurrentIndex(currentIndex + 1);
    const data = dates.slice((currentIndex + 1) * showItemNum, (currentIndex + 2) * showItemNum);
    if (data.length === 0) {
      setIsMax(true);
      setCurrentIndex(currentIndex - 1);
      return;
    }

    if (data.length < showItemNum) {
      const num = showItemNum - data.length;
      setIsMax(true);
      for (let i = 0; i < num; i++) {
        data.push({ date: "", dayOfWeek: "" });
      }
    }
    setShowDate(data);
    console.log("right", data);
  };


  return (
    <div>
      <div className="flex justify-left items-center text-base">
        <div
          className=" cursor-pointer p-3  text-center bg-[#FFFFFF]"
          onClick={() => {
            clickLeft();
          }}
        >
          <img src={ArrowLeft} alt="" />
        </div>
        <div className=" flex w-full">
          {showDate.map((item, index) => {
            return (
              <div
                key={index}
                className={`m-1 px-3 py-2 bg-white flex-1 flex flex-col justify-center items-center cursor-pointer  ${clickIndex === item.date ? "text-[#00558C]" : "bg-[#FAFAFA]"}`}
                onClick={() => {
                  setClickIndex(item.date);
                  setClickDate(item)
                  chooseDate(item)
                  // clickDate();
                }}
              >
                <div className="text-sm">{item.date}</div>
                <div className="text-sm">{item.dayOfWeek}</div>
              </div>
            );
          })}
        </div>
        <div
          className=" cursor-pointer p-3 text-center bg-[#FFFFFF]"
          onClick={() => {
            clickRight();
          }}
        >
          <img src={ArrowRight} alt="" />
        </div>
      </div>
      {ticketList && <TicketList
        date={clickIndex}
        chooseTicket={(e)=>chooseTicket({...e,})}
        ticketList={ticketList}
        clickDate={clickDate}
      ></TicketList>}
    </div>
  );
};
export default DatePicker;
