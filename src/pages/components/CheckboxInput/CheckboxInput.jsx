import { useField } from "formik";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import checkbox from "./../../../assets/checkbox-input.svg";
import checkbox1 from "./../../../assets/checkbox-input1.svg";

export default function CheckboxInput({ label, name, isOption = false }) {
  const [field, meta, helper] = useField(name);
  const isError = meta.error && meta.touched;

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <div
          onClick={() => {
            helper.setValue(!field.value);
          }}
        >
          <img src={field.value ? checkbox : checkbox1} alt="" className="h-4" />
        </div>
        <div className="text-sm leading-6 flex">
          {label}
          {!isOption && <span className="text-[#FA8C16]">*</span>}
        </div>
      </div>
      {isError && <ErrorMessage text={meta.error} />}
    </div>
  );
}
