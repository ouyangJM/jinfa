import DatePicker from "./components/date/DatePicker"
import { useEffect, useState } from 'react';
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
  console.log(ticks)
  
  return (
    <div className="w-full">
      
      <div className="flex flex-col w-full ">
        <div className='w-full bg-white px-6 py-5'>
          <div className='flex flex-col gap-y-3'>
            <div className="text-xl flex gap-x-4 gap-y-2">
              {/* <img src={} alt='' /> */}
              Back
            </div>
            <div className='text-sm'>Select outbound sailing：</div>
            <div className='flex gap-y-2 gap-x-3 text-xl'>
              <div>Hong Kong Macau Ferry Terminal</div>
              <div>Macau Taipa Ferry Terminal</div>
            </div>
          </div>
        </div>

      </div>
        <DatePicker></DatePicker>
    </div>
  )
}
