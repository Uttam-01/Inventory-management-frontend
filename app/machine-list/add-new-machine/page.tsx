import AddVendorForm from "@/components/vendor/AddVendorForm";

export default function AddVendorPage() {
  return (
    <div className="w-[766px] mx-auto p-8 bg-white rounded-[8px]" style={{ boxShadow: "0px 10px 15px -3px #0000001A" }}>
      <div className="text-[#0F4C81] font-bold text-[20px] mb-4">Add New Vendor</div>
      <AddVendorForm />
    </div>
  );
}
