"use client";
import React from "react";

interface FormTextAreaProps {
  label: string;
  placeholder: string;
  name: string;
  error?: string;
  value?: string;
}

export default function FormTextArea({ label, placeholder, name, error, value }: FormTextAreaProps) {
  return (
    <div className="relative flex flex-col">
      <label htmlFor={name} className="text-[#343A40] text-[14px] font-normal">
        {label}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        className="h-[98px] resize-none w-[338px] border border-[#D1D5DB] pt-2 px-3 rounded-[6px] shadow-[...]"
        defaultValue={value ?? ""}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
