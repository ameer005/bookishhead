import React from "react";

const Heading = ({ children }) => {
  return (
    <h3 className="text-base font-bold uppercase mb-3 text-gray-500/70">
      {children}
    </h3>
  );
};

export default Heading;
