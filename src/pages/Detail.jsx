import { FormikProvider, useFormik } from "formik";
import React from "react";
import CheckboxInput from "./components/CheckboxInput/CheckboxInput";
import RadioInput from "./components/RadioInput/RadioInput";
import TextInput from "./components/TextInput/TextInput";
import TicketItem from "./components/TicketItem/TicketItem";

const radioList = [
  {
    id: 0,
    label: "Phone Number",
    value: 0,
  },
  {
    id: 1,
    label: "Email address",
    value: 1,
  },
];

export default function Detail() {
  const data = [
    {
      id: 0,
      time: "11:30",
      date: "JUL 15 Mon",
      money: 175,
      class: "Cotai",
      from: "Hong Kong",
      to: "Macau",
    },
    {
      id: 1,
      time: "11:30",
      date: "JUL 15 Mon",
      money: 175,
      class: "Cotai",
      from: "Hong Kong",
      to: "Macau",
    },
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      connectionMethod: 0,
      agreement:true
    },
    validationSchema: null,
    onSubmit: () => {},
  });

  return (
    <div className="w-full">
      <div className="flex flex-col bg-white px-6 py-5">
        {data.map((item, index) => {
          return <TicketItem data={item} key={item.id} isFirst={index === 0} />;
        })}
      </div>

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full bg-white p-5 mt-5 flex">
            <div className="w-2/3">
              <div className="text-[#333] text-base leading-6 font-bold">Contact information</div>

              <div className="w-1/2 mt-3">
                <div className="flex flex-col gap-y-5">
                  <TextInput name="email" label={"Email address"} placeholder={"Type here"} />
                  <TextInput
                    name="phone"
                    label={"Phone Number"}
                    isOption={true}
                    placeholder={"Type here"}
                  />
                </div>

                <div className="mt-10">
                  <RadioInput
                    label={
                      <div className="text-sm">
                        Use your mobile number or e-mail address to{" "}
                        <span className="text-[#00558C] text-sm leading-6 font-semibold">
                          connect with your reservation.
                        </span>
                      </div>
                    }
                    radioList={radioList}
                    name="connectionMethod"
                    isOption={true}
                  />
                </div>
              </div>

              
            </div>
            <div className="w-1/3">
                <div>Apply Promo code (optional)</div>
                <div className="flex">
                  <div className="flex-1">
                    <TextInput label="" name="promo" isOption={true} />
                  </div>
                  <button onClick={() => {}} className="px-4 text-sm leading-5 bg-[#A08A59] text-white mt-2 rounded-sm">Apply</button>
                </div>
                <div className="mt-4 h-[2px] bg-gray-100"/>

                <div className="flex flex-col gap-y-2 mt-3">
                  <div className="flex justify-between text-base text-[#333] items-center">
                    <div>Subtotal</div>
                    <div className="font-bold">HK$175</div>
                  </div>
                  <div className="flex justify-between text-base text-[#00558C] items-center">
                    <div>Carbon credit:</div>
                    <div className="font-bold">HK$6</div>
                  </div>
                  <div className="flex justify-between text-base text-[#00558C] items-center">
                    <div>Promo code:</div>
                    <div className="font-bold">-----</div>
                  </div>
                  <div className="flex justify-between text-[#000] font-bold items-center">
                    <div className="text-2xl">Total:</div>
                    <div className="text-3xl">HK$175</div>
                  </div>
                  
                  <div className="flex">
                    <CheckboxInput 
                      label={
                        <p className="text-sm">I agree <span className="text-base text-[#00558C]">Terms & Conditions</span> and <span className="text-base text-[#00558C]">Privacy Policy</span></p>
                      }
                      name="agreement"
                      isOption={true}
                    />
                    
                  </div>

                  <div className="text-sm">Please complete payment within 10 min.</div>

                  <button type="submit" className="w-full rounded-sm text-white bg-[#00558C] text-sm leading-[22px]">
                    Pay
                  </button>
                </div>
              </div>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
}
