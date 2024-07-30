import classNames from "classnames";
import { useField } from "formik";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

// interface CheckboxProps {
//   label: string;
//   name: string;
//   placeholder?: string;
//   maxLength?: number;
//   isOption?: boolean;
//   trim?: boolean;
// }
export default function TextInput({
  label,
  name,
  isOption = false,
  trim = false,
  ...props
}) {
  const [field, meta, helper] = useField(name);
  const isError = meta.error && meta.touched;

  return (
    <div>
      <div className="text-sm leading-6">
        {label}
        {!isOption && <span className="text-[#FA8C16]">*</span>}
      </div>
      <input
        {...field}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        className={classNames(
          isError ? "border-red-600" : "border-[##b8b8b8]",
          "w-full h-10 mt-2 border rounded-md px-3 text-1-2 leading-6 text-[#858585]",
        )}
        onBlur={(e) => {
          trim && helper.setValue(e.target.value.trim());
        }}
      />
      {isError && <ErrorMessage text={meta.error} />}
    </div>
  );
}
