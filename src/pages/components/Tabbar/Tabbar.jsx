import React from 'react'

export default function Tabbar() {
  return (
    <div className='mt-[1px] w-full grid grid-cols-4 gap-x-[1px] text-center text-white text-sm'>
      <div className='w-full bg-[#a08a59] py-1'>Home</div>
      <div className='w-full bg-[#a08a59] py-1'>Special Discount</div>
      <div className='w-full bg-[#a08a59] py-1'>My itinerary</div>
      <div className='w-full bg-[#a08a59] py-1'>Cart</div>
    </div>
  )
}
