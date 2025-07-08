"use client";

import { useState, useEffect } from "react";

type SearchDropdownProps<T> = {
  label: string;
  placeholder: string;
  data: T[];
  selected: T | null;
  onSelect: (item: T) => void;
  isLoading: boolean;
  error: boolean;
  formError?: string;
  nameKey?: keyof T;
};

export default function SearchDropdown<T extends { id?: number | string ; name?: string}>({
  label,
  placeholder,
  data,
  selected,
  onSelect,
  isLoading,
  error,
  formError,
  nameKey = "name",
}: SearchDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const filtered = data.filter((item) =>
    String(item[nameKey]).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative flex flex-col w-[338px]">
      <label className="text-[#343A40] text-[14px] font-normal mb-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-[50px] w-full border-[1px] border-[#D1D5DB] flex items-center justify-between rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
      >
        {selected ? String(selected[nameKey]) : placeholder}
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.55713 10L12.5571 15L17.5571 10"
            stroke="#B2B2B2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {formError && (
        <span className="text-red-500 text-xs mt-1">{formError}</span>
      )}

      {isOpen && (
        <div className="absolute top-14 bg-white z-10 w-full border-[1px] border-[#D1D5DB] h-[400px] rounded-[6px] px-3 shadow-[0px_1px_2px_0px_#0000000D]">
          {!mounted ? null : isLoading ? (
            <div className="p-2">Loading...</div>
          ) : error ? (
            <div className="p-2 text-red-500">Error loading data</div>
          ) : (
            <div className="w-full">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded h-[40px] p-2 w-full my-2"
              />
              <ul className="w-full h-[300px] overflow-y-auto bg-white">
                {filtered.length === 0 && (
                  <li className="p-2 text-gray-400">No items found</li>
                )}
                {filtered.map((item) => (
                  <li
                    key={item.id}
                    className={`p-2 cursor-pointer hover:bg-blue-100 ${
                      selected?.id === item.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      onSelect(item);
                      setIsOpen(false);
                    }}
                  >
                    {String(item[nameKey])}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
