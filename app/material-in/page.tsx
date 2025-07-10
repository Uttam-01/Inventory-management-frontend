"use client";
import { useComponents } from "@/lib/api/componentApi/useComponents";
import { useInventory } from "@/lib/api/inventoryApi/useInventory";
import { useVendors } from "@/lib/api/vendorApi/useVendors";
import { useEffect, useState } from "react";
import { authRequest } from "@/lib/api/auth";
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import { materialInSchema } from "@/lib/schemas";
import { useAddInventory } from "@/lib/api/inventoryApi/useAddInventory";
import { isErrored } from "stream";
import Edit from "@/components/ui/Edit";
import RoleProtected from "@/components/RoleProtection";
import { useDeleteInventory } from "@/lib/api/inventoryApi/useDeleteInventory";

function InputBox(e: {
  label: string;
  placeholder: string;
  name: string;
  defaultValue?: number;
  error?: string;
  onChange?: any;
  max?: string
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
  const deleteInventory = useDeleteInventory();
  useEffect(() => {
    setMounted(true);
    setvendorMounted(true);
  }, []);

  useEffect(() => setMounted(true), []);
  const { data, isLoading, error } = useInventory();
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
      if (!selectedVendor && selected && selected.id) {
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
      if (!selected && selectedVendor && selectedVendor.id) {
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
  async function  handleDelete(id : number){
     deleteInventory.mutateAsync(id)
    .then(() => window.location.reload())
    .catch(err => console.error("Error deleting machine:", err));
    
  }

  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
      <div className="w-[1404px] mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
        <div className="text-[#0F4C81] font-bold text-[20px]">Material IN</div>
        <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
          Use this form to record new material entries quickly and efficiently.
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
                    {!mounted ? null : isLoading ? (
                      <div>Loading...</div>
                    ) : error ? (
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
                              jhbj
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
                      {formErrors.vendor}
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

              <InputBox
                name="gstPercentage"
                label="GST %"
                placeholder="0"
                error={formErrors.gstPercentage}
              />
              <InputBox
                name="packingCharges"
                label="Packing Charges"
                placeholder="0"
                error={formErrors.packingCharges}
              />
              <InputBox
                name="transportCharge"
                label="Transport Charges"
                placeholder="0"
                error={formErrors.transportCharge}
              />

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
            Total Effective Price: ₹{unitPrice * quantity}
          </div>
          <button className=" hover:cursor-pointer h-[42px]  rounded-[8px] w-full   text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
            Record Material IN
          </button>
        </form>
        <div className="text-[#343A40] text-[18px] font-bold  mt-6">
          Recent Material IN Entries
        </div>

        {isLoading ? (
          <div>Loading....</div>
        ) : error ? (
          <div>Error occured.</div>
        ) : (
          <div className="border-[1px] rounded-[6px] border-[#D1D5DB] mt-1 mb-6">
            <div className="flex justify-center bg-[#E5E7EB] h-[41px] border-b-[1px] border-[#D1D5DB] items-center">
              <div className="w-[11%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
                Date
              </div>
              <div className="w-[11%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
                Bill No
              </div>
              <div className="w-[26%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
                Product Name
              </div>
              <div className="w-[11%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
                Vendor
              </div>
              <div className="w-[11%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
                Quantity
              </div>
              <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
                Total Effective Price
              </div>
              <div className="w-[11%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
                Status
              </div>

              <div className="w-[11%] flex justify-center items-center   text-[16px] text-[#6B7280] font-bold h-full">
                Remarks
              </div>
            </div>
            {data.map((item: any, index: number) => (
              <div
                key={index}
                className={`flex justify-evenly  items-center h-[50px] ${
                  index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F3F4F6]"
                }  ${
                  index === data.length - 1
                    ? ""
                    : "border-b-[1px] border-[#D1D5DB]"
                } `}
              >
                <div className="w-[11%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
                  {item.updatedAt.substring(0, 10)}
                </div>
                <div className="w-[11%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
                  {item.billNo}
                </div>
                <div className="w-[26%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
                  {item.componentName}
                </div>
                <div className="w-[11%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
                  {item.vendorName}
                </div>
                <div className="w-[11%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
                  {item.quantity}
                </div>
                <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
                  ₹{item.totalPrice}
                </div>
                <div className="w-[11%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
                  {item.status}
                </div>
                <div className="w-[11%] flex justify-center items-center gap-4">
                  <Edit to={`/material-in/edit-material-in/${item.id}`} />
                  <button
                    // onClick={() => {handleDelete(item.id)}}
                    type="button"
                    className="hover:cursor-pointer w-[35px] h-[40px] rounded-[5px] bg-[#E0F2F7] flex items-center justify-center"
                  >
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_16_2934)">
                        <path
                          d="M14.6433 1.00001H10.8933L10.5996 0.41563C10.5373 0.290697 10.4415 0.185606 10.3228 0.11218C10.2041 0.0387537 10.0673 -9.46239e-05 9.92769 5.47897e-06H6.35581C6.21655 -0.00052985 6.07996 0.0381736 5.96169 0.111682C5.84341 0.18519 5.74823 0.290529 5.68706 0.41563L5.39331 1.00001H1.64331C1.5107 1.00001 1.38353 1.05268 1.28976 1.14645C1.19599 1.24022 1.14331 1.3674 1.14331 1.50001V2.50001C1.14331 2.63261 1.19599 2.75979 1.28976 2.85356C1.38353 2.94733 1.5107 3.00001 1.64331 3.00001H14.6433C14.7759 3.00001 14.9031 2.94733 14.9969 2.85356C15.0906 2.75979 15.1433 2.63261 15.1433 2.50001V1.50001C15.1433 1.3674 15.0906 1.24022 14.9969 1.14645C14.9031 1.05268 14.7759 1.00001 14.6433 1.00001ZM2.80581 14.5938C2.82966 14.9746 2.99774 15.332 3.27583 15.5932C3.55392 15.8545 3.92112 16 4.30269 16H11.9839C12.3655 16 12.7327 15.8545 13.0108 15.5932C13.2889 15.332 13.457 14.9746 13.4808 14.5938L14.1433 4.00001H2.14331L2.80581 14.5938Z"
                          fill="#DC3545"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_16_2934">
                          <rect
                            width="16"
                            height="16"
                            fill="white"
                            transform="translate(0.143311)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RoleProtected>
  );
}
