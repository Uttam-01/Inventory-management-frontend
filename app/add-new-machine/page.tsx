import Delete from "@/components/ui/Delete";
import AddButton from "@/components/ui/Add";
function AddNewMachine() {
  return (
    <div className="w-[766px] mx-auto p-8 bg-[#ffffff] rounded-[8px]">
      <div className="text-[#0F4C81] font-bold text-[20px]">Add New Machine</div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[94px] items-center">
       Define the machine details and specify the materials required for its maintenance or assembly. This list helps in forecasting inventory availability and does not impact actual stock levels.
      </div>
      <div className="mt-[25px]">
        <div className="text-[#1F2937] text-[16px] font-semibold">Machine Details</div>
        
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-[10px]">
            <input className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3" type="text" placeholder="Machine Name" />
            <input className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3" type="text" placeholder="Machine Category" />
            <input className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3" type="text" placeholder="Model" />
            <input className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3" type="text" placeholder="Model No." />
        </div>
      </div>
      <div className="mt-[25px]">
        <div className="text-[#1F2937] text-[16px] font-semibold">Required Spare Parts</div>
        
        <div className="flex gap-x-4 gap-y-3 mt-[10px] items-center ">
            <input className="h-[50px] w-[478px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3" type="text" placeholder="" />
            <input className="h-[50px] w-[160px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3" type="text" placeholder="Quantity Required" />
            <Delete to="/"/>
        </div>
        <div className="w-[181px]">
            <AddButton to="/" text="Add Material"/>
        </div>
        <div className="w-full flex h-[42px] items-center justify-end gap-4">
            <div className="border-[#6B7280] h-[42px] text-emoji border-[1px] rounded-[8px] w-[81px]  text-[#6B7280] text-[16px] font-normal flex items-center justify-center">Cancel</div>
            <div className=" h-[42px]  rounded-[8px] w-[124px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center" >Save Product </div>
        </div>
        
      </div>
    </div>
  );
}
export default AddNewMachine;
