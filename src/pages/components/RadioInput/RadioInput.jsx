import { useField } from "formik";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import radio from "./../../../assets/radio.svg";
import radio1 from "./../../../assets/radio1.svg";

export default function RadioInput({
  label,
  name,
  radioList,
  isOption = false,
}) {
  const [field, meta, helper] = useField(name);
  const isError = meta.error && meta.touched;

  return (
    <div>
      <div className="text-sm leading-6 flex">
        {label}
        {!isOption && <span className="text-[#FA8C16]">*</span>}
      </div>
      <div className="flex gap-x-2 mt-2">
        {
          radioList.map((i,index) => {
            return <div className="flex gap-x-2 text-sm" onClick={() => helper.setValue(i.value)} key={index}>
              <img src={i.value === field.value ? radio1 : radio } alt="" />
              <p>{i.label}</p>
            </div>
          })
        }
      </div>
      
      {isError && <ErrorMessage text={meta.error} />}
    </div>
  );
}
