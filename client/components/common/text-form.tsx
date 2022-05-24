import React, { useState } from "react";

interface DataProps {
  name: string;
  value: string;
}
interface TextFormProps {
  label: string;
  name: string;
  value: string;
  onChange: (data: DataProps) => void;
}
const TextForm: React.FC<TextFormProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="py-3">
      <label htmlFor={name}>{label}</label>
      <div className="input-group">
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default TextForm;
