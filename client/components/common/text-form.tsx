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
    <div className="py-3 mx-3">
      <label htmlFor={name}>{label}</label>
      <div className="input-group my-2">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="form-control"
          rows={10}
          cols={25}
          style={{
            backgroundColor: "#333",
            color: "white",
            border: "none",
            resize: "none",
            minHeight: "40vh",
            width: "80%",
          }}
        />
      </div>
    </div>
  );
};

export default TextForm;
