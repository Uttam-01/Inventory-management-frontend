type Props = {
  label: string;
  placeholder: string;
  name: string;
};

export default function TextAreaBox({ label, placeholder, name }: Props) {
  return (
    <div className="relative flex flex-col">
      <label className="text-[#343A40] text-[14px] font-normal">{label}</label>
      <textarea
        name={name}
        className="h-[98px] resize-none w-[338px] border border-[#D1D5DB] rounded-[6px] px-3 pt-2 shadow"
        placeholder={placeholder}
      />
    </div>
  );
}
