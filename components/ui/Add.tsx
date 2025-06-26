import Link from "next/link";
function AddButton(e: { text: string,to:string }) {
  return (
    <div>
      <Link href={e.to} className=" text-[#FFFFFF] text-[16px] font-sans font-bold h-[50px] px-5 rounded-[6px] bg-[#22C55E] flex justify-center items-center gap-2 my-5">
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1001 6.5H9.6001V2C9.6001 1.44781 9.15229 1 8.6001 1H7.6001C7.04791 1 6.6001 1.44781 6.6001 2V6.5H2.1001C1.54791 6.5 1.1001 6.94781 1.1001 7.5V8.5C1.1001 9.05219 1.54791 9.5 2.1001 9.5H6.6001V14C6.6001 14.5522 7.04791 15 7.6001 15H8.6001C9.15229 15 9.6001 14.5522 9.6001 14V9.5H14.1001C14.6523 9.5 15.1001 9.05219 15.1001 8.5V7.5C15.1001 6.94781 14.6523 6.5 14.1001 6.5Z"
            fill="white"
          />
        </svg>
        {e.text}
      </Link>
    </div>
  );
}
export default AddButton;
