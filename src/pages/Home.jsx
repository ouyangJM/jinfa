import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "./../assets/ArrowLeft.svg";
import Sun from "./../assets/bigSun.svg";
import cart from "./../assets/cart.svg";
import Moon from "./../assets/Moon.svg";
import SwapRight from "./../assets/SwapRight.svg";
import DatePicker from "./components/date/DatePicker";
import cart1 from "../assets/cart1.svg";
import Left from "../assets/Left.svg";
import MobileTicketList from "./components/mobileTicketList/MobileTicketList";

export default function Home() {
  const navigate = useNavigate();
  const [ticks, setTicks] = useState([]);
  const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem("cartList")) || []);
  const [cartCount, setCartCount] = useState(0);

  const [ticketList, setTicketList] = useState([]);
  const fetchTicks = (newDate) => {
    const dateParams = `2024-${newDate.date} 00:00:00`;
    const data = JSON.stringify({
      direction: "Return",
      date: dateParams,
    });
    console.log("newDate", data);
    setTicks(data);

    const xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        console.log("respond", xhr.responseText);
        setTicketList(JSON.parse(xhr.responseText));
      }
    });
    xhr.open("POST", "http://192.168.112.210:8080/api/listFerryTickets");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  };
  useEffect(() => {
    const newCartList = JSON.parse(localStorage.getItem("cartList")) || [];
    let newCount = 0;
    newCartList.forEach((item) => {
      if (item.count) {
        newCount += item.count;
      } else {
        newCount += 1;
      }
    });
    console.log("-useeffect", newCartList, newCount);
    setCartCount(newCount);
  }, []);

  const [checkedList, setCheckedList] = useState();
  const chooseTicket = (e) => {
    console.log("chooseTicket", e);
    setCheckedList(e);
  };
  const checkOut = () => {
    if (!checkedList && cartList.length < 1) return;
    if (cartList.length < 1 && checkedList) {
      localStorage.setItem("cartList", JSON.stringify([checkedList]));
      navigate("/detail");
      return;
    }
    localStorage.setItem("cartList", JSON.stringify(cartList));
    navigate("/detail");
  };

  return (
    <>
      <div className="sm:block hidden w-full">
        <div className="flex flex-col w-full">
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

        <div className="flex lg:flex-row flex-col gap-x-5 mt-4 items-start">
          <div className="lg:flex-[2] w-full">
            <DatePicker
              ticketList={ticketList}
              chooseTicket={chooseTicket}
              checkedList={checkedList}
              chooseDate={fetchTicks}
              clickItem={checkedList?.id}
            />
          </div>

          <div className="lg:flex-1 w-full mt-5 lg:mt-0 flex-col">
            <div className="border-b-2 border-gray-300 pt-4 pb-2 px-6 text-2xl font-medium bg-white">
              Departure
            </div>
            {checkedList && (
              <div className=" bg-white flex just-center items-center flex-col pt-3">
                <div className="flex justify-between items-center bg-white">
                  <div className="flex flex-col justify-center items-center pl-15">
                    <div className="text-2xl">{checkedList.from}</div>
                    <div className="text-sm">{checkedList.fromTerminal}</div>
                  </div>
                  <div className="px-5">
                    <img src={SwapRight} alt="SwapRight" />
                  </div>
                  <div className="flex flex-col justify-center items-center pr-15">
                    <div className="text-2xl">{checkedList.to}</div>
                    <div className="text-sm">{checkedList.toTerminal}</div>
                  </div>
                </div>
                <div className="flex justify-center items-center bg-white pt-5">
                  <div className="mr-2 text-sm">{checkedList.date} </div>
                  <div className="mr-2 text-sm"> {checkedList.dayOfWeek} </div>
                  <img
                    src={checkedList.timeFlag === "NIGHT" ? Moon : Sun}
                    alt=""
                    className="mr-2"
                  />
                  <div className="text-sm">{checkedList?.startTime?.split(" ")[1]}</div>
                </div>
                <div className="text-sm">{checkedList.seatType}</div>
                <div className="flex">
                  <div className="mr-2 text-xl">Adult</div>
                  <div className="text-xl text-[#00558C]">HK${checkedList.auditPrice}</div>
                </div>
                <div className="w-full bg-[#EBEBEB] mt-3" style={{ height: "1px" }}></div>
              </div>
            )}
            <div className="flex justify-between items-center py-4 px-6 text-2xl bg-white">
              <div>Total</div>
              <div className="text-3xl font-medium">HK${checkedList?.auditPrice || 0}</div>
            </div>

            <div className="mt-5 text-white flex justify-between gap-x-5">
              <button
                className="flex-1 bg-[#7fb7db]"
                onClick={() => {
                  if (!checkedList) return;
                  setCartCount(cartCount + 1);
                  setCartList([...cartList, checkedList]);
                }}
              >
                Add to Cart
              </button>
              <button
                className={`flex-1 bg-[#00558c]`}
                onClick={() => {
                  checkOut();
                }}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>

        <div className="fixed right-0" style={{ top: 300 }} onClick={() => navigate("/detail")}>
          <div className="relative">
            <img src={cart} alt="cart" />
            <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white">
              {cartCount}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden flex-1 flex flex-col justify-between w-full bg-[#F4F8FB]">
        <div className="flex items-center justify-between bg-[#00558c] px-5 pt-6 pb-3">
          <img src={Left} alt="left" />
          <div className="text-white font-bold">Outbound</div>
          <img src={cart1} alt="cart" />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex bg-white px-5 py-3">
            <div className="flex justify-between items-center bg-white">
              <div className="flex flex-col justify-center items-center pl-15 text-center">
                <div className="text-xl">Hong Kong</div>
                <div className="text-sm">Macau Ferry Terminal</div>
              </div>
              <div className="px-5">
                <img src={SwapRight} alt="SwapRight" />
              </div>
              <div className="flex flex-col justify-center items-center pr-15 text-center">
                <div className="text-xl">Macau</div>
                <div className="text-sm">Taipa Ferry Terminal</div>
              </div>
            </div>
          </div>

          <div className="flex bg-white px-5 py-3 border-t-[2px] ">datePicker</div>
                <MobileTicketList ticketList={ticketList}></MobileTicketList>
        </div>

        <div className="bg-white py-3 px-5 flex justify-center">
          <button className="w-full bg-[#00558c] rounded-full text-white font-bold" type="button">
            Check out
          </button>
        </div>
      </div>
    </>
  );
}
