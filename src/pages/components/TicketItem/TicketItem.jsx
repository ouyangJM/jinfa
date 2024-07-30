import React from 'react'
import SwapRight from './../../../assets/SwapRight.svg'
import smallSun from './../../../assets/smallSun.svg'

export default function TicketItem({data,isFirst}) {
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
                <p className="leading-5 text-xs">Macau Ferry Terminal</p>
            </div>
            <img src={SwapRight} alt='SwapRight' />
            <div className='flex flex-col items-center'>
                <p className="text-xl leading-7 font-medium">{data.to}</p>
                <p className="leading-5 text-xs">Taipa Ferry Terminal</p>

            </div>
          </div>
          <div className='flex gap-x-2 text-sm leading-4'>
            {data.date}
            <img src={smallSun} alt="smallSun" />
            {data.time}
            </div>
        </div>

        <div className='flex flex-col justify-center'>
          <div className='text-xs text-[#333]'>{data.class} Class</div>
          <div className="text-base">Adult HK${data.money} <span className='text-[#00558C]'>x1</span></div>
        </div>

        <div className='text-[#00558C] text-base leading-6 font-bold'>
          Add Promotion code
        </div>

        <div className='text-[#00558C] text-base leading-6 font-bold'>
          Delete
        </div>
      </div>
    </div>
  )
}
