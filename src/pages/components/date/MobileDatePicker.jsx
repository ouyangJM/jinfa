import React, { useEffect, useState } from "react";
import EmblaCarousel from "../EmblaCarousel/EmblaCarousel";
import MobileTicketList from "../mobileTicketList/MobileTicketList";

const MobileDatePicker = (props) => {
  const { numDays = 60, showItemNum, chooseTicket, chooseDate, ticketList,status } = props;

  const [dates, setDates] = useState([]);
  // const [showDate, setShowDate] = useState([]);
  const [clickIndex, setClickIndex] = useState("");
  const [clickDate, setClickDate] = useState("");
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [isMax, setIsMax] = useState(false);
  // const [startX, setStartX] = useState(0);
  // const [currentX, setCurrentX] = useState(0);
  // const [distance, setDistance] = useState(0);

  // const handleTouchStart = (e) => {
  //   // 记录触摸开始的位置
  //   setStartX(e.touches[0].clientX);
  //   setCurrentX(e.touches[0].clientX);
  // };

  // const handleTouchMove = (e) => {
  //   // 更新当前位置
  //   setCurrentX(e.touches[0].clientX);
  //   setDistance(e.touches[0].clientX - startX);
  // };

  // const handleTouchEnd = () => {
  //   // 处理触摸结束后的逻辑
  //   console.log("Swiped distance:", distance);
  // };

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
      const dayOfWeek = ["SUN", "MON", "THE", "WED", "THU", "FRI", "SAT"][currentDate.getDay()];

      // 格式化日期字符串
      const formattedDate = `${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;

      // 将日期和星期几添加到数组中
      futureDates.push({ date: formattedDate, dayOfWeek });

      // 移动到下一天
      currentDate.setDate(currentDate.getDate() + 1);
    }
    status !==1 && chooseDate(futureDates[0]);
    // setShowDate(futureDates.slice(0, showItemNum));
    setClickIndex(futureDates[0].date);
    setClickDate(futureDates[0]);
    // 设置状态以重新渲染组件
    setDates(futureDates);
  }, []);

  //   if (data.length < showItemNum) {
  //     const num = showItemNum - data.length;
  //     setIsMax(true);
  //     for (let i = 0; i < num; i++) {
  //       data.push({ date: "", dayOfWeek: "" });
  //     }
  //   }
  //   setShowDate(data);
  //   console.log("right", data);
  // };

  // useEffect(() => {
  //   if(distance > 50){
  //     clickRight()
  //   }
  //   if(distance < -50){
  //     clickLeft()
  //   }
  // }, [distance])

  return (
    <div className="w-full">
      <div className="flex justify-left items-center text-base bg-white">
        <div className="flex w-full">
          <EmblaCarousel
            slides={dates.reduce((result, value, index) => {
              const chunkIndex = Math.floor(index / showItemNum);
              if (!result[chunkIndex]) {
                result[chunkIndex] = []; // 初始化新的块
              }
              result[chunkIndex].push(value);
              return result;
            }, [])}
            options={{}}
            clickIndex={clickIndex}
            setClickIndex={setClickIndex}
            setClickDate={setClickDate}
            chooseDate={chooseDate}
            clickDate={clickDate}
          />
        </div>
      </div>
      {ticketList && (
        <MobileTicketList
          date={clickIndex}
          chooseTicket={(e) => chooseTicket({ ...e })}
          ticketList={ticketList}
          clickDate={clickDate}
        ></MobileTicketList>
      )}
    </div>
  );
};
export default MobileDatePicker;
