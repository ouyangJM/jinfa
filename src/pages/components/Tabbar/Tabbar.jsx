import classNames from 'classnames';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Tabbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className='mt-[1px] w-full grid grid-cols-4 gap-x-[1px] text-center text-white text-sm items-center'>
      <div className={classNames('w-full bg-[#a08a59] py-1',location?.pathname === "/" && "text-base font-bold")} onClick={()=> navigate("/")}>Home</div>
      <div className='w-full bg-[#a08a59] py-1'>Special Discount</div>
      <div className='w-full bg-[#a08a59] py-1'>My itinerary</div>
      <div className={classNames('w-full bg-[#a08a59] py-1',location?.pathname === "/detail" && "text-base font-bold")} onClick={()=> navigate("/detail")}>Cart</div>
    </div>
  )
}
