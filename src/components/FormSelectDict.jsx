const FormSelectDict = ({ label, name, list, defaultValue, size }) => {
  const keys = Object.keys(list);
  const values = Object.values(list);
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        defaultValue={defaultValue}
      >
        {values.map((item, index) => {
          return (
            <option key={index} value={item.split("_")[0]}>
              {item.split("_")[0]}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormSelectDict;
