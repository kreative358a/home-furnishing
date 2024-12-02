import { formatPrice } from "../utils";
import { useState } from "react";
const FormRangeHF = ({
  label,
  name,
  size,
  price,
  onChange,
  value,
  selectedMaxPrice,
  step,
}) => {
  // const step = 1000;
  const maxPrice = 5000;
  //  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>${value.toFixed(2)}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={5000}
        // value={value || selectedMaxPrice}
        value={value || maxPrice}
        onChange={onChange || none}
        // onChange={(e) => setSelectedPrice(e.target.value)}
        // style={{ boxShadow: "0px 0px 2px 2px red" }}
        className={`range range-primary ${size} focus:border-none focus:outline-none box-shadow-around-sm-blue`}
        step={50}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-base">0</span>
        <span className="font-bold text-base">
          Max : ${maxPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
export default FormRangeHF;
