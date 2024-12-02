import { useState } from "react";
const FormInputHF = ({
  label,
  name,
  type,
  defaultValue,
  size,
  placeholder,
  onChange,
  value,
  // ref,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="text-base sm:text-lg capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        // defaultValue={defaultValue || ""}
        placeholder={placeholder || ""}
        className={`input input-bordered ${size} focus:border-none focus:outline-none box-shadow-around-sm-blue`}
        onChange={onChange || none}
        value={value || ""}
        // onChange={useState(defaultValue)}
        // ref={ref || null}
      />
    </div>
  );
};
export default FormInputHF;
