import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import TextInput from './components/TextInput/TextInput';
import TicketItem from './components/TicketItem/TicketItem';

export default function Detail() {
  const data = [
    {
      id:0,
      time:"11:30",
      date:"JUL 15 Mon",
      money:175,
      class:"Cotai",
      from:"Hong Kong",
      to:"Macau"
    },
    {
      id:1,
      time:"11:30",
      date:"JUL 15 Mon",
      money:175,
      class:"Cotai",
      from:"Hong Kong",
      to:"Macau"
    },
  ];

  const formik = useFormik({
    initialValues:{
      email:"",
      phone:""
    },
    validationSchema:null,
    onSubmit:()=>{}
  })

  return (
    <div className='w-full'>
        <div className='flex flex-col bg-white px-6 py-5'>
          {
            data.map((item,index) => {
              return <TicketItem data={item} key={item.id} isFirst={index === 0} />
            })
          }
        </div>

      <div className='w-full bg-white p-5 mt-5'>
        <div className='w-2/3'>
          <div className='text-[#333] text-base leading-6 font-bold'>Contact information</div>
          <div className='w-1/2 mt-3'>
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                <div className='flex flex-col gap-y-5'>
                  <TextInput name="email" label={"Email address"} placeholder={"Type here"} />
                  <TextInput name="phone" label={"Phone Number"} isOption={true} placeholder={"Type here"} />
                </div>
                
                <div className='mt-10'>
                  <div>Use your mobile number or e-mail address to <span className='text-[#00558C] text-sm leading-6'>connect with your reservation.</span></div>
                  <div></div>
                </div>

              </form>
            </FormikProvider>

            
            
          </div>
        </div>
        <div className='w-1/3'>
          right
        </div>
      </div>
    </div>
    
  )
}
