import React, { useState, useRef, useEffect } from "react";
import { GoTriangleDown } from "react-icons/go";

export default function Dropdown({ options, value, handleSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  //   useEffect(() => {
  //     const handler = (e) => {
  //       if (!divEl.current.contains(e.target)) {
  //         setIsOpen(false);
  //       }
  //     };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    handleSelect(option.value);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p1"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className="w-48 relative">
      <div
        className="flex mb-6 justify-between items-center cursor-pointer border rounded p-3 shadow bg-white w-full"
        onClick={handleClick}
        // ref={divEl}
      >
        {value || "Select..."}
        {/* <GOChevronDown /> */}
        <GoTriangleDown className="text-md text-gray-400" />
      </div>
      {isOpen && (
        <div className="absolute top-full border rounded p-3 shadow bg-white w-full">
          {renderedOptions}
        </div>
      )}
    </div>
  );
}
