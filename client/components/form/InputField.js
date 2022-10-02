import React from "react";

const InputField = ({
  name,
  register,
  placeholder,
  type,
  labelText,
  errors,
}) => {
  return (
    <label>
      <div className="text-sm font-bold text-colorBlack mb-1">{labelText}</div>
      <input
        className={`input ${
          errors[name] ? "border-red-500" : "border-gray-200"
        }`}
        type={type}
        placeholder={placeholder}
        name={name}
        {...register(name)}
      />
    </label>
  );
};

export default InputField;
