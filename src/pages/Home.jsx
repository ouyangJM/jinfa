import { useEffect, useState } from 'react';
import ArrowLeft from './../assets/ArrowLeft.svg';
import cart from './../assets/cart.svg';
import SwapRight from './../assets/SwapRight.svg';
import DatePicker from "./components/date/DatePicker";
import TicketList from "./components/ticketList/TicketList";

export default function Home() {
  const [ticks,setTicks] = useState([])

  useEffect(()=>{
    const fetchTicks = ()=>{
      const data = JSON.stringify({
        "direction": "Return",
        "date": "2024-07-31 00:00:00"
      });
      setTicks(data)

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function() {
        if(xhr.readyState === 4) {
          console.log(xhr.responseText);
        }
      });
      xhr.open("POST", "http://192.168.112.103:8080/api/listFerryTickets");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
    };

    fetchTicks()
  },[])
  console.log(ticks);
  
  return (
    <div className="w-full">
      
      <div className="flex flex-col w-full ">
        <div className='w-full bg-white px-6 py-5'>
          <div className='flex flex-col gap-y-3'>
            <div className="text-xl flex gap-x-4 gap-y-2">
              <img src={ArrowLeft} alt='ArrowLeft' />
              Back
            </div>
            <div className='text-sm'>Select outbound sailing：</div>
            <div className='flex gap-y-2 gap-x-3 text-xl items-center'>
              <div>Hong Kong Macau Ferry Terminal</div>
              <img src={SwapRight} alt='SwapRight'/>
              <div>Macau Taipa Ferry Terminal</div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-x-5 mt-4 items-start'>
        <div>
          <DatePicker />
          <TicketList></TicketList>
        </div>
        

        <div className='flex-1 flex-col'>
          <div className='border-b-2 border-gray-300 pt-4 pb-2 px-6 text-2xl font-medium bg-white'>Departure</div>
          <div className='flex justify-between items-center py-4 px-6 text-2xl bg-white'>
            <div>Total</div>
            <div className="text-3xl font-medium">HK$0</div>
          </div>
         
          <div className='mt-5 text-white flex justify-between gap-x-5'>
          <button className='flex-1 bg-[#7fb7db]'>Add to Cart</button>
          <button className="flex-1 bg-[#00558c]">Check Out</button>
        </div>
        </div>
      </div>

      <div className='fixed right-0'>
          <div className='relative'>
            <img src={cart} alt='cart' />
            <div className='absolute -left-3 -top-3 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white'>0</div>
          </div>
        </div>
    </div>
  )
}
