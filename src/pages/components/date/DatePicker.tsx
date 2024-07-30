import React, { useEffect, useState } from "react";

interface DatePickerProps {
  date: String;
  dayOfWeek: String;
}

const DatePicker = (props) => {
  const { clickDate, numDays = 60, showItemNum = 10 } = props;
  const [dates, setDates] = useState<DatePickerProps[]>([]);
  const [showDate, setShowDate] = useState<DatePickerProps[]>([]);
  const [clickIndex, setClickIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMax, setIsMax] = useState<boolean>(false);

  // 假设我们要获取未来3个月的日期
  useEffect(() => {
    const currentDate = new Date();
    const futureDates: DatePickerProps[] = [];

    // 循环遍历未来几个月的每一天
    // for (let m = 0; m < numMonths; m++) {
    //   let year = currentDate.getFullYear();
    //   let month = currentDate.getMonth();
    //   let daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let d = 0; d < numDays; d++) {
      const dayOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
        currentDate.getDay()
      ];

      // 格式化日期字符串
      const formattedDate = `${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;

      // 将日期和星期几添加到数组中
      futureDates.push({ date: formattedDate, dayOfWeek });

      // 移动到下一天
      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log("futureDates", futureDates);
    setShowDate(futureDates.slice(0, showItemNum));
    // 设置状态以重新渲染组件
    setDates(futureDates);
  }, []); // 空依赖数组表示这个effect只在组件挂载时运行一次

  const clickLeft = () => {
    if (currentIndex === 0) return;
    setIsMax(false);
    console.log('clickLeft',dates.slice((currentIndex - 1) * showItemNum, currentIndex * showItemNum));
        
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
    <div className="flex justify-left items-center   text-[#00558C] text-base bg-[#F1F2F5]">
      <div
        className="border-2 cursor-pointer border-black p-2 w-20 text-center"
        onClick={() => {
          clickLeft();
        }}
      >
        左箭头
      </div>
      <div className=" flex">
        {showDate.map((item, index) => {
          return (
            <div
              key={index}
              className={`m-1 px-3 py-2 bg-white flex flex-col justify-center items-center cursor-pointer w-20 ${clickIndex === index ? "" : "bg-[#FAFAFA]"}`}
              onClick={() => {
                setClickIndex(index);
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
        className="border-2 cursor-pointer border-black p-2 w-20 text-center"
        onClick={() => {
          clickRight();
        }}
      >
        右箭头
      </div>
    </div>
  );
};
export default DatePicker;
