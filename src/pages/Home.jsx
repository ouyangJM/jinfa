import { useEffect, useState } from "react";
import ArrowLeft from "./../assets/ArrowLeft.svg";
import cart from "./../assets/cart.svg";
import SwapRight from "./../assets/SwapRight.svg";
import DatePicker from "./components/date/DatePicker";
import TicketList from "./components/ticketList/TicketList";
import Moon from "./../assets/Moon.svg";
import Sun from "./../assets/bigSun.svg";

export default function Home() {
  const [ticks, setTicks] = useState([]);

  useEffect(() => {
    const fetchTicks = () => {
      const data = JSON.stringify({
        direction: "Return",
        date: "2024-07-31 00:00:00",
      });
      setTicks(data);

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
          console.log(xhr.responseText);
        }
      });
      xhr.open("POST", "http://192.168.112.103:8080/api/listFerryTickets");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
    };

    fetchTicks();
  }, []);
  console.log(ticks);
  const [checkedList, setCheckedList] = useState([]);
  const chooseTicket = (e) => {
    const id = e.id;
    const index = checkedList.findIndex((item) => item.id === id);
    if (index === -1) {
      setCheckedList([...checkedList, e]);
    } else {
      const newList = checkedList.splice(index, 1);
      setCheckedList([...newList]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col w-full ">
        <div className="w-full bg-white px-6 py-5">
          <div className="flex flex-col gap-y-3">
            <div className="text-xl flex gap-x-4 gap-y-2">
              <img src={ArrowLeft} alt="ArrowLeft" />
              Back
            </div>
            <div className="text-sm">Select outbound sailing：</div>
            <div className="flex gap-y-2 gap-x-3 text-xl items-center">
              <div>Hong Kong Macau Ferry Terminal</div>
              <img src={SwapRight} alt="SwapRight" />
              <div>Macau Taipa Ferry Terminal</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-x-5 mt-4 items-start">
        <div style={{ flex: 2 }}>
          <DatePicker chooseTicket={chooseTicket} checkedList={checkedList} />
        </div>

        <div className="flex-1 flex-col">
          <div className="border-b-2 border-gray-300 pt-4 pb-2 px-6 text-2xl font-medium bg-white">
            Departure
          </div>
          {checkedList.map((item, index) => {
            console.log('item', item);
            const time = Number(item.time.split(":")[0]);
            const image = time >= 18 ? Moon : Sun;
            return (
              <div className=" bg-white flex just-center items-center flex-col" key={item.id}>
                <div className="flex justify-between items-center bg-white">
                  <div className="flex flex-col justify-center items-center pl-15">
                    <div className="text-2xl">Hong Kong</div>
                    <div className="text-sm">Macau Ferry Terminal</div>
                  </div>
                  <div className="px-5">
                    <img src={SwapRight} alt="SwapRight" />
                  </div>
                  <div className="flex flex-col justify-center items-center pr-15">
                    <div className="text-2xl">Macau</div>
                    <div className="text-sm">Taipa Ferry Terminal</div>
                  </div>
                </div>
                <div className="flex justify-center items-center bg-white pt-5">
                  <div className="mr-2 text-sm">{item.date} </div>
                  <div className="mr-2 text-sm"> {item.dayOfWeek} </div>
                  <img src={image} alt="" className="mr-2" />
                  <div className="text-sm">{item.time}</div>
                </div>
                <div className="text-sm">Cotai Class</div>
                <div className="flex">
                  <div className="mr-2 text-xl">Adult</div>
                  <div className="text-xl text-[#00558C]">{item.price}</div>
                </div>
                <div className="w-full bg-[#EBEBEB]" style={{ height: "1px" }}></div>
              </div>
            );
          })}
          <div className="flex justify-between items-center py-4 px-6 text-2xl bg-white">
            <div>Total</div>
            <div className="text-3xl font-medium">HK$0</div>
          </div>

          <div className="mt-5 text-white flex justify-between gap-x-5">
            <button className="flex-1 bg-[#7fb7db]">Add to Cart</button>
            <button className="flex-1 bg-[#00558c]">Check Out</button>
          </div>
        </div>
      </div>

      <div className="fixed right-0">
        <div className="relative">
          <img src={cart} alt="cart" />
          <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white">
            0
          </div>
        </div>
      </div>
    </div>
  );
}
