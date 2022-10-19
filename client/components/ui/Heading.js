import React from "react";

const Heading = ({ children }) => {
  return (
    <h3 className="text-sm sm:text-base font-bold uppercase mb-3 text-gray-500">
      {children}
    </h3>
  );
};

export default Heading;
