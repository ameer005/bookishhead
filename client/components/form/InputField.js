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
      <div className="text-sm font-bold text-gray-600 mb-1">{labelText}</div>
      <input
        className={`input ${
          errors[name] ? "border-red-500" : "border-gray-200"
        }`}
        type={type}
        placeholder={placeholder}
        name={name}
        {...register(name)}
      />
      <div className="flex justify-end mt-1">
        {errors[name] && (
          <div className="text-xs text-colorPrimary">
            {errors[name].message}
          </div>
        )}
      </div>
    </label>
  );
};

export default InputField;
