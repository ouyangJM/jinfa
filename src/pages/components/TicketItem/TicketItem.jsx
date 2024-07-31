import React from 'react'
import Moon from './../../../assets/Moon.svg'
import SwapRight from './../../../assets/SwapRight.svg'
import smallSun from './../../../assets/smallSun.svg'

export default function TicketItem({data,isFirst,deleteTicket}) {
  return (
    <div>
      {!isFirst && < div className='my-8'>
          <div className='h-[1px] bg-gray-200' />
        </div>
      }

      <div className={('w-full flex justify-between items-center')}>
        
        <div>
          <div className='flex items-center gap-2'>
            <div className='flex flex-col items-center'>
                <p className="text-xl leading-7 font-medium">{data.from}</p>
                <p className="leading-5 text-xs">{data.fromTerminal}</p>
            </div>
            <img src={SwapRight} alt='SwapRight' />
            <div className='flex flex-col items-center'>
                <p className="text-xl leading-7 font-medium">{data.to}</p>
                <p className="leading-5 text-xs">{data.toTerminal}</p>

            </div>
          </div>
          <div className='flex gap-x-2 text-sm leading-4'>
            {data.date} {data.dayOfWeek}
            <img src={data.timeFlag === "NIGHT"? Moon:smallSun} className='w-4' alt="smallSun" />
            {data.startTime.split(' ')[1].slice(0,5)}
            </div>
        </div>

        <div className='flex flex-col justify-center'>
          <div className='text-xs text-[#333]'>{data.seatType}</div>
          <div className="text-base">Adult HK${data.auditPrice} <span className='text-[#00558C]'>x{data.count}</span></div>
        </div>

        {/* <div className='text-[#00558C] text-base leading-6 font-bold'>
          Add Promotion code
        </div> */}

        <div className='text-[#00558C] text-base leading-6 font-bold cursor-pointer' onClick={()=>{deleteTicket(data.newId)}}>
          Delete
        </div>
      </div>
    </div>
  )
}
