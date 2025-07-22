"use client";
import { useComponents } from "@/lib/hooks/componentApi/useComponents";
import { useInventory } from "@/lib/hooks/inventoryApi/useInventory";
import { useVendors } from "@/lib/hooks/vendorApi/useVendors";
import { useEffect, useState } from "react";
import { authRequest } from "@/lib/hooks/auth";
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import { materialInSchema } from "@/lib/schemas";
import { useAddInventory } from "@/lib/hooks/inventoryApi/useAddInventory";
import { isErrored } from "stream";
import Edit from "@/components/ui/Edit";
import RoleProtected from "@/components/RoleProtection";
import { useDeleteInventory } from "@/lib/hooks/inventoryApi/useDeleteInventory";
import { useRouter } from "next/navigation";
import MaterialFlowNav from "@/components/layout/MaterialFlowNav";

function InputBox(e: {
  label: string;
  placeholder: string;
  name: string;
  defaultValue?: number;
  error?: string;
  onChange?: any;
  max?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor=" font-emoji text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label>
      <input
        type="text"
        placeholder={e.placeholder}
        className="h-[41px] w-[430px] border-[1px] border-[#E5E7EB] px-3 rounded-[8px]"
        name={e.name}
        onChange={e.onChange}
        max={e.max}
      />
      {e.error && <span className="text-red-500 text-xs">{e.error}</span>}
    </div>
  );
}

export default function () {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [components, setComponents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [vendors, setVendors] = useState<any[]>([]);
  const [searchVendor, setSearchVendor] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [VendorOpen, setVendorOpen] = useState<boolean>(false);
  const [vendorMounted, setvendorMounted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const addInventoryMutation = useAddInventory();
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [gst, setGst] = useState<number>(0);
  const [packing, setPacking] = useState<number>(0);
  const [transport, setTransport] = useState<number>(0);
  useEffect(() => {
    setMounted(true);
    setvendorMounted(true);
  }, []);

  useEffect(() => setMounted(true), []);
  const {
    data: allComponents,
    isLoading: isAllComponentsLoading,
    error: allComponentsError,
  } = useComponents();
  const {
    data: allVendors,
    isLoading: isAllVendorLoading,
    error: allVendorError,
  } = useVendors();

  useEffect(() => {
    if (allComponents) setComponents(allComponents);
  }, [allComponents]);

  useEffect(() => {
    if (allVendors) setVendors(allVendors);
  }, [allVendors]);

  useEffect(() => {
    const fetchData = async () => {
      if (selected && selected.id) {
        const res = await authRequest({
          url: `${API_ROUTES.VENDOR_COMPONENT}/component/${selected.id}`,
          method: "GET",
        });
        setVendors(res);
      }
    };
    fetchData();
  }, [selected]);
  useEffect(() => {
    const fetchData = async () => {
      if (selectedVendor && selectedVendor.id) {
        const res = await authRequest({
          url: `${API_ROUTES.VENDOR_COMPONENT}/vendor/${selectedVendor.id}`,
          method: "GET",
        });
        setComponents(res);
      }
      //console.log(components);
    };
    fetchData();
  }, [selectedVendor]);
  useEffect(() => {
    if (addInventoryMutation.isSuccess) {
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [addInventoryMutation.isSuccess]);

  if (!mounted) return null;
  if (!vendorMounted) return null;
  const filteredComponents = components.filter((component) =>
    (component.displayName ?? component.name)
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchVendor.toLowerCase())
  );
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    if (!selected && !selectedVendor) {
      setFormErrors({
        component: "Component is Required.",
        vendor: "Vendor is required.",
      });
      return;
    } else if (!selected) {
      setFormErrors({ component: "Component is Required." });
      return;
    } else if (!selectedVendor) {
      setFormErrors({ vendor: "Vendor is required." });
      return;
    }
    const finalData = {
      ...formData,
      componentId: selected.id ?? selected.componentId,
      vendorId: selectedVendor.id ?? selectedVendor.vendorId,
    };
    console.log(finalData);
    const result = materialInSchema.safeParse(finalData);
    if (!result.success) {
      const errors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    addInventoryMutation.mutate(result.data);
  }

  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
      <div className="w-[1404px] mx-auto flex flex-col rounded-[8px]  justify-start">
        <div className="w-[1404px] mx-auto flex flex-col   rounded-[8px] pb-8 justify-start "><MaterialFlowNav/></div>

        <div className="w-[1404px] mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
          <div className="text-[#0F4C81] font-bold text-[20px]">
            Add Material 
          </div>
          <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
            Use this form to record new material entries quickly and
            efficiently.
          </div>
          <form onSubmit={handleFormSubmit} className="w-full flex flex-col">
            <div>
              <div className="text-[#343A40] text-[18px] font-bold mb-2.5 mt-3">
                Record New Material Entry
              </div>
              <div className="flex flex-wrap gap-y-5 justify-between">
                <div className="flex flex-col gap-1.5">
                  <div>Component Name</div>
                  <div className="relative flex flex-col  h-[41px] w-[430px]">
                    <button
                      type="button"
                      onClick={() => {
                        if (VendorOpen && !isOpen) setVendorOpen(false);
                        setIsOpen(isOpen ? false : true);
                      }}
                      className="h-[50px] w-full border-[1px] border-[#E5E7EB] px-3 rounded-[8px] flex items-center justify-between  shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                    >
                      {selected
                        ? selected.displayName ?? selected.name
                        : "Component Name"}
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
                    {formErrors.component && (
                      <span className="text-red-500 text-xs">
                        {formErrors.component}
                      </span>
                    )}

                    <div
                      className={`${
                        isOpen ? "block" : "hidden"
                      } absolute top-12 bg-[#FFFFFF] z-10 flex flex-col w-full border-[1px] border-[#D1D5DB] h-[400px]  items-start justify-between  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]`}
                    >
                      {!mounted ? null : isAllComponentsLoading ? (
                        <div>Loading...</div>
                      ) : allComponentsError ? (
                        <div>Error loading components.</div>
                      ) : (
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="Search components..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-300 rounded h-[50px] p-2 w-full my-2"
                          />
                          <ul className="  w-full h-[300px] overflow-y-auto bg-white ">
                            {filteredComponents.length === 0 && (
                              <li className="p-2 text-gray-400">
                                No components found
                              </li>
                            )}
                            {filteredComponents.map((component, i) => (
                              <li
                                key={
                                  component.id
                                    ? component.id
                                    : component.componentId
                                    ? component.componentId
                                    : i
                                }
                                className={`p-2 cursor-pointer hover:bg-blue-100 ${
                                  selected === component.id ? "bg-blue-50" : ""
                                }`}
                                onClick={() => {
                                  setSelected(component);
                                  setIsOpen(false);
                                }}
                              >
                                {component.displayName ?? component.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <InputBox
                  onChange={(e: any) => setQuantity(e.target.value)}
                  name="quantity"
                  label="Quantity"
                  placeholder="0"
                  error={formErrors.quantity}
                  max="9"
                />
                <InputBox
                  onChange={(e: any) => setUnitPrice(e.target.value)}
                  name="unitPrice"
                  label="Unit Price"
                  placeholder="0"
                  error={formErrors.unitPrice}
                />
                <div className="flex flex-col gap-1.5">
                  <div>Vendor Name</div>
                  <div className="relative flex flex-col  h-[41px] w-[430px]">
                    <button
                      type="button"
                      onClick={() => setVendorOpen(VendorOpen ? false : true)}
                      className="h-[50px] w-full border-[1px] border-[#E5E7EB] px-3 rounded-[8px] flex items-center justify-between   shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                    >
                      {selectedVendor ? selectedVendor.name : "Vendor Name"}
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
                    {formErrors.vendor && (
                      <span className="text-red-500 text-xs">
                        {formErrors.vendor}terial List
                      </span>
                    )}

                    <div
                      className={`${
                        VendorOpen ? "block" : "hidden"
                      } absolute top-12 bg-[#FFFFFF] z-10 flex flex-col w-full border-[1px] border-[#D1D5DB] h-[400px]  items-start justify-between  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]`}
                    >
                      {!vendorMounted ? null : isAllVendorLoading ? (
                        <div>Loading...</div>
                      ) : allVendorError ? (
                        <div>Error loading Vendors.</div>
                      ) : (
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="SearchVendors..."
                            value={searchVendor}
                            onChange={(e) => setSearchVendor(e.target.value)}
                            className="border border-gray-300 rounded h-[50px] p-2 w-full my-2"
                          />
                          <div className="  w-full h-[300px] overflow-y-auto bg-white ">
                            {filteredVendors.length === 0 && (
                              <div className="p-2 text-gray-400">
                                No components found
                              </div>
                            )}
                            {filteredVendors.map((k, i) => (
                              <div
                                key={k.id ? k.id : i}
                                className={`p-2 cursor-pointer hover:bg-blue-100 ${
                                  selectedVendor === k.id ? "bg-blue-50" : ""
                                }`}
                                onClick={() => {
                                  setSelectedVendor(k);
                                  setVendorOpen(false);
                                }}
                              >
                                {k.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor=" font-emoji text-[#343A40] text-[14px] font-normal">
                    GST %
                  </label>
                  <input
                    type="text"
                    placeholder="0"
                    className="h-[41px] w-[430px] border-[1px] border-[#E5E7EB] px-3 rounded-[8px]"
                    name="gstPercentage"
                    onChange={(e: any) => setGst(e.target.value)}
                  />
                  {formErrors.gstPercentage && (
                    <span className="text-red-500 text-xs">
                      {formErrors.gstPercentage}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor=" font-emoji text-[#343A40] text-[14px] font-normal">
                    Packing Charges
                  </label>
                  <input
                    type="text"
                    placeholder="0"
                    className="h-[41px] w-[430px] border-[1px] border-[#E5E7EB] px-3 rounded-[8px]"
                    name="packingCharges"
                    onChange={(e: any) => setPacking(e.target.value)}
                  />
                  {formErrors.packingCharges && (
                    <span className="text-red-500 text-xs">
                      {formErrors.packingCharges}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor=" font-emoji text-[#343A40] text-[14px] font-normal">
                    Transport Charges
                  </label>
                  <input
                    type="text"
                    placeholder="0"
                    className="h-[41px] w-[430px] border-[1px] border-[#E5E7EB] px-3 rounded-[8px]"
                    name="transportCharge"
                    onChange={(e: any) => setTransport(e.target.value)}
                  />
                  {formErrors.transportCharge && (
                    <span className="text-red-500 text-xs">
                      {formErrors.transportCharge}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor=" font-emoji text-[#343A40] text-[14px] font-normal">
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    placeholder=""
                    className="h-[41px] min-h-[41px] w-[886px] border-[1px] pt-2 border-[#E5E7EB] px-3 rounded-[8px] resize-y "
                  />
                  {formErrors.remarks}
                </div>
                <InputBox
                  label="Bill Number"
                  placeholder="0"
                  name="billNo"
                  error={formErrors.billNo}
                />
              </div>
            </div>
            <div className="text-[#0F4C81] bg-[#E0F2F7] flex justify-center rounded-[8px] my-6 text-[16px] font-bold  font-emoji h-[56px] items-center">
              Total Effective Price: ₹
              {Number(unitPrice) * Number(quantity) +
                (Number(unitPrice) * Number(quantity) * Number(gst)) / 100 +
                Number(transport) +
                Number(packing)}
            </div>
            {addInventoryMutation.isSuccess && (
              <div className="text-green-600 w-full">
                Added Material In Entry Successfully.
              </div>
            )}
            {addInventoryMutation.error && (
              <div className="text-red-500 text-sm mt-2">
                {(addInventoryMutation.error as any)?.response?.data?.message ??
                  (addInventoryMutation.error as any)?.response?.data?.error ??
                  addInventoryMutation.error.message ??
                  "Something went wrong"}
              </div>
            )}

            <button className=" hover:cursor-pointer h-[42px]  rounded-[8px] w-full   text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
              Record Material IN
            </button>
          </form>
        </div>
      </div>
    </RoleProtected>
  );
}
