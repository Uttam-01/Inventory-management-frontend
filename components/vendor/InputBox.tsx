type Props = {
  label: string;
  placeholder: string;
  name: string;
  error?: string;
};

export default function InputBox({ label, placeholder, name, error }: Props) {
  return (
    <div className="relative flex flex-col">
      <label className="text-[#343A40] text-[14px] font-normal">{label}</label>
      <input
        className="h-[50px] w-[338px] border border-[#D1D5DB] rounded-[6px] px-3 shadow"
        placeholder={placeholder}
        name={name}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}