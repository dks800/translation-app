const Dropdown = ({ data, value, valueUpdate }) => {
  return (
    <>
      <select
        onChange={(e) => valueUpdate(e.target.value)}
        defaultValue={value}
      >
        <option value="">Select a language</option>
        {data.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
