import { FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Close from "../assets/Close.svg";
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
  const navigate = useNavigate();

  const [data, setData] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [isDelete, setIsDelete] = React.useState(false);
  const [discount, setDiscount] = React.useState(1);

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("cartList")) || [];
    let newTotalPrice = 0;
    const newData = Object.values(
      getData.reduce((acc, item) => {
        // 从 item.id 中提取新的 id 部分
        const newId = item.id.split("-")[2];
        const count = item.count ? item.count : 1;
        // 创建一个新的项，使用新的 id 和原始的项数据（除了 id），并设置 count 为 1
        const newItem = { ...item, newId, count };
        newTotalPrice += Number(newItem.auditPrice) * Number(newItem.count);
        // 如果累加器（acc）中已存在这个 newId，则更新其 count，否则添加这个新项
        if (acc[newId]) {
          acc[newId].count++;
        } else {
          acc[newId] = newItem;
        }

        // 返回累加器（acc），以便在下一次迭代中使用
        return acc;
      }, {})
    ); // 注意这里的第二个参数是一个空对象 {}
    console.log("-----data", newData);
    setData(newData);
    setTotalPrice(newTotalPrice);
  }, [isDelete]);
  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      connectionMethod: 0,
      agreement: true,
    },
    validationSchema: null,
    onSubmit: () => {},
  });

  const getPreferential = () => {
    if (!formik.values.promo) return;
    const paramsItems = data.map((item) => {
      return {
        ticketId: item.newId,
        quantity: item.count,
      };
    });

    var params = JSON.stringify({
      promotionCode: "9876",
      items: paramsItems,
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        setTotalPrice(JSON.parse(xhr.responseText).amount);
        console.log("detail", xhr.responseText);
        setDiscount(JSON.parse(xhr.responseText));
      }
    });

    xhr.open("POST", "http://192.168.112.210:8080/api/applyPromotionCode");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(params);
  };

  const deleteTicket = (id) => {
    const newData = data.filter((item) => item.newId !== id);
    setIsDelete(!isDelete);
    localStorage.setItem("cartList", JSON.stringify(newData));
    console.log("newData", newData);
    // setData(newData);
  };

  console.log(discount)

  return (
    <>
      <div className="sm:block hidden w-full">
        <div className="flex flex-col bg-white px-6 py-5">
          {data.map((item, index) => {
            return (
              <TicketItem
                deleteTicket={deleteTicket}
                data={item}
                key={item.id}
                isFirst={index === 0}
              />
            );
          })}
        </div>

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full bg-white p-5 mt-5 flex">
              <div className="w-2/3">
                <div className="text-[#333] text-base leading-6 font-bold">Contact information</div>

                <div className="lg:w-1/2 w-2/3 mt-3">
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
                  <button
                    onClick={() => {
                      getPreferential();
                    }}
                    className="px-4 text-sm leading-5 bg-[#A08A59] text-white mt-2 rounded-sm"
                  >
                    Apply
                  </button>
                </div>
                <div className="mt-4 h-[2px] bg-gray-100" />

                <div className="flex flex-col gap-y-2 mt-3">
                  <div className="flex justify-between text-base text-[#333] items-center">
                    <div>Subtotal</div>
                    <div className="font-bold">HK${totalPrice}</div>
                  </div>
                  <div className="flex justify-between text-base text-[#00558C] items-center">
                    <div>Carbon credit:</div>
                    <div className="font-bold">HK$6</div>
                  </div>
                  {discount !== 1 && <>
                    <div className="flex justify-between text-base text-[#00558C] items-center">
                    <div>Promo code:</div>
                    <div className="font-bold">{formik.values?.promo}</div>
                  </div>
                  <div className="flex justify-between text-base text-[#00558C] items-center">
                    <div>Discount:</div>
                    <div className="font-bold">{discount}</div>
                  </div></>}
                  <div className="flex justify-between text-[#000] font-bold items-center">
                    <div className="text-2xl">Total:</div>
                    <div className="text-3xl">HK${totalPrice}</div>
                  </div>

                  <div className="flex">
                    <CheckboxInput
                      label={
                        <p className="text-sm">
                          I agree{" "}
                          <span className="text-base text-[#00558C]">Terms & Conditions</span> and{" "}
                          <span className="text-base text-[#00558C]">Privacy Policy</span>
                        </p>
                      }
                      name="agreement"
                      isOption={true}
                    />
                  </div>

                  <div className="text-sm">Please complete payment within 10 min.</div>

                  <button
                    type="submit"
                    className="w-full rounded-sm text-white bg-[#00558C] text-sm leading-[22px]"
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </form>
        </FormikProvider>
      </div>
      <div className="sm:hidden flex-1 flex flex-col justify-between w-full">
        <div className="flex items-center justify-between bg-[#00558c] px-5 pt-6 pb-3">
          <img src={Close} alt="Close" onClick={() => navigate("/")} />
          <div className="text-white font-bold">My Cart</div>
          <div className="w-5" />
        </div>

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex-1 px-5 flex flex-col gap-y-8 my-8">
              <div>
                <div className="text-base font-bold mb-4">Apply Promo code (optional)</div>
                <div className="p-3 shadow-lg bg-white rounded-lg">
                  <div>Promo code</div>
                  <div className="flex">
                    <div className="flex-1">
                      <TextInput label="" name="promo" isOption={true} placeholder={"Type here"} />
                    </div>
                    <button
                      onClick={() => {
                        getPreferential();
                      }}
                      className="px-4 text-sm leading-5 bg-[#A08A59] text-white mt-2 rounded-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-base font-bold mb-4">Ticket Information</div>
                <div className="p-3 shadow-lg bg-white rounded-lg">
                  {data?.map((item, index) => {
                    return (
                      <TicketItem
                        deleteTicket={deleteTicket}
                        data={item}
                        key={item.id}
                        isFirst={index === 0}
                      />
                    );
                  }) || []}
                </div>
              </div>

              <div>
                <div className="text-base font-bold mb-4">Contact Information</div>
                <div className="p-3 shadow-lg bg-white rounded-lg">
                  <div className="flex flex-col gap-6 mb-2">
                    <TextInput name="email" label={"Email address"} placeholder={"Type here"} />
                    <TextInput
                      name="phone"
                      label={"Phone Number"}
                      isOption={true}
                      placeholder={"Type here"}
                    />

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
            </div>

            <div className="bg-white py-3 px-5 text-sm text-center leading-6">
              <div className="flex items-center justify-center gap-x-[10px]">
                <div className="text-base font-bold">Total:</div>
                <div className="text-3xl text-[#00558C] font-bold leading-10">HK$175</div>
              </div>
              <CheckboxInput
                label={
                  <p className="text-sm text-center">
                    I agree <span className="text-sm text-[#00558C]">Terms & Conditions</span> and{" "}
                    <span className="text-sm text-[#00558C]">Privacy Policy</span>
                  </p>
                }
                name="agreement"
                isOption={true}
              />

              <div>Please complete payment within 10 min.</div>

              <button
                className="w-full bg-[#00558c] rounded-full text-white font-bold"
                type="button"
                onClick={() => {}}
              >
                Pay
              </button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </>
  );
}
