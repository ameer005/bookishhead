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
      <div className="text-sm font-semibold text-colorBlack mb-1">
        {labelText}
      </div>
      <input
        className={`input ${
          errors[name] ? "border-red-500" : "border-colorSecondary2/40"
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
