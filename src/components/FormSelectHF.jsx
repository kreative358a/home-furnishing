import { useState } from "react";
const FormSelectHF = ({
  label,
  name,
  list,
  defaultValue,
  size,
  onChange,
  value,
  // ref,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="text-base sm:text-lg capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size} focus:border-none focus:outline-none box-shadow-around-sm-blue`}
        // defaultValue={defaultValue}
        value={value || "all"}
        // onChange={useState(defaultValue)}
        onChange={onChange || none}
        // ref={ref}
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelectHF;
