import React, { useEffect, useState } from "react";
import ArrowLeft from './../../../assets/ArrowLeft.svg';
import ArrowRight from './../../../assets/ArrowRight.svg';

// interface DatePickerProps {
//   date: String;
//   dayOfWeek: String;
// }

const DatePicker = (props) => {
  const { clickDate, numMonths = 2, showItemNum = 10 } = props;
  const [dates, setDates] = useState([]);
  const [showDate, setShowDate] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMax, setIsMax] = useState(false);

  // 假设我们要获取未来3个月的日期
  useEffect(() => {
    const currentDate = new Date();
    const futureDates = [];

    // 循环遍历未来几个月的每一天
    for (let m = 0; m < numMonths; m++) {
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth();
      let daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let d = 1; d <= daysInMonth; d++) {
        currentDate.setDate(d);

        // 获取星期几，JavaScript的getDay()返回0-6（周日-周六）
        const dayOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
          currentDate.getDay()
        ];

        // 格式化日期字符串
        const formattedDate = `${("0" + (month + 1)).slice(-2)}-${("0" + d).slice(-2)}`;
        // const formattedDate = `${currentDate.getFullYear()}-${("0" + (month + 1)).slice(-2)}-${("0" + d).slice(-2)}`;

        // 将日期和星期几添加到数组中
        futureDates.push({ date: formattedDate, dayOfWeek });

        // 如果需要，可以在这里添加更多的逻辑，比如跳过周末等
      }

      // 移动到下一个月
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    console.log("futureDates", futureDates);
    setShowDate(futureDates.slice(0, showItemNum));
    // 设置状态以重新渲染组件
    setDates(futureDates);
  }, []); // 空依赖数组表示这个effect只在组件挂载时运行一次

  const clickLeft = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
    setShowDate(dates.slice((currentIndex - 1) * showItemNum, currentIndex * showItemNum));
  };
  const clickRight = () => {
    if (isMax) return;
    setCurrentIndex(currentIndex + 1);
    const data = dates.slice((currentIndex + 1) * showItemNum, (currentIndex + 2) * showItemNum);

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
    <div className="flex justify-left items-center text-[#00558C] text-base bg-[#F1F2F5]">
      <div
        className="p-3 w-10 bg-white flex items-center justify-center shadow-sm mr-1"
        onClick={() => {
          clickLeft();
        }}
      >
        <img src={ArrowLeft} alt="ArrowLeft" />
      </div>
      <div className="flex">
        {showDate.map((item, index) => {
          return (
            <div
              key={index}
              className="m-1 px-3 py-2 bg-white flex flex-col justify-center items-center cursor-pointer w-20 shadow-sm"
              onClick={() => {
                clickDate(item);
              }}
            >
              <div className="text-[#00558C]">{item.date}</div>
              <div>{item.dayOfWeek}</div>
            </div>
          );
        })}
      </div>
      <div
        className="p-3 w-10 flex items-center justify-center bg-white shadow-sm ml-1"
        onClick={() => {
          clickRight();
        }}
      >
        <img src={ArrowRight} alt="ArrowRight" />
      </div>
    </div>
  );
};
export default DatePicker;
