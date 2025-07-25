"use client";
import React from "react";

interface InputBoxProps {
  label: string;
  placeholder: string;
  name: string;
  error?: string;
  value?: any;
}

export default function InputBox({ label, placeholder, name, error, value }: InputBoxProps) {
  return (
    <div className="relative flex flex-col">
      <label htmlFor={name} className="text-[#343A40] text-[14px] font-normal">
        {label}
      </label>
      <input
        className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB] rounded-[6px] px-3 shadow-[...]"
        placeholder={placeholder}
        name={name}
        defaultValue={value ?? ""}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
