import React, { FC } from "react";
interface DataProps {
  name: string;
  value: string;
}
interface SelectFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange: (data: DataProps) => void;
  error?: string;
  options: DataProps[];
  defaultOption: string;
}
const SelectField: FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
  name,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        // value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {options &&
          options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectField;
