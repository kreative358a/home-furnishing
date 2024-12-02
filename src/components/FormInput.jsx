const FormInput = ({
  label,
  name,
  type,
  defaultValue,
  size,
  value,
  inputValue,
  onChange,
  readOnly,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className=" text-base sm:text-lg capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
        className={`input input-bordered ${size} focus:border-none focus:outline-none box-shadow-around-sm-blue`}
        readOnly={readOnly || false}
      />
    </div>
  );
};
export default FormInput;
