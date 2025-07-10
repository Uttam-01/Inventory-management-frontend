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
import { usePathname } from "next/navigation";
import { useUpdateInventory } from "@/lib/api/inventoryApi/useUpdateInventory";
import { useRouter } from "next/navigation";

function InputBox(e: {
  label: string;
  placeholder: string;
  name: string;
  defaultValue?: number;
  error?: string;
  onChange?: any;
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
        defaultValue={e.defaultValue}
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
  const updateInventoryMutation = useUpdateInventory();
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [inventoryInfo, setInventoryInfo] = useState<any>();
  const [status, setStatus] = useState<string>();
  const pathname = usePathname();
  const router = useRouter();

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
    const getInfo = async () => {
      const pathParts = pathname.split("/").filter(Boolean);
      const inventoryId = pathParts[pathParts.length - 1];

      try {
        const data = await authRequest({
          url: `${API_ROUTES.INVENTORY}/${inventoryId}`,
          method: "GET",
        });

        console.log("Fetched Inventory info:", data);
        setInventoryInfo(data);
        setStatus(()=>data.status)
      } catch (err) {
        console.error("Failed to fetch Machine info:", err);
      }
    };

    if (pathname) {
      getInfo();
    }
  }, [pathname]);

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
  useEffect(() => {
    if (updateInventoryMutation.isSuccess) {
      const timeout = setTimeout(() => {
        router.push("/material-in");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [updateInventoryMutation.isSuccess]);

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
    let finalData = {};
    if (!selected && !selectedVendor) {
      finalData = {
        ...formData,
        componentId: inventoryInfo?.componentId,
        vendorId: inventoryInfo?.vendorId,
      };
    } else if (!selected) {
      setFormErrors({ component: "Component is Required." });
      return;
    } else if (!selectedVendor) {
      setFormErrors({ vendor: "Vendor is required." });
      return;
    } else {
      finalData = {
        ...formData,
        componentId: selected.id ?? selected.componentId,
        vendorId: selectedVendor.id ?? selectedVendor.vendorId,
      };
    }
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
    const pathParts = pathname.split("/").filter(Boolean);
    const inventoryId = pathParts[pathParts.length - 1];
    updateInventoryMutation.mutate({
      reqData: result.data,
      id: Number(inventoryId),
    });
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
                <div>Component Name - ({inventoryInfo?.componentName})</div>
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
                              {component.displayName ?? component.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {formErrors.component && (
                  <span className="text-red-500 text-xs">
                    {formErrors.component}
                  </span>
                )}
              </div>
              <InputBox
                onChange={(e: any) => setQuantity(e.target.value)}
                name="quantity"
                label="Quantity"
                placeholder="0"
                error={formErrors.quantity}
                defaultValue={inventoryInfo?.quantity}
              />
              <InputBox
                onChange={(e: any) => setUnitPrice(e.target.value)}
                name="unitPrice"
                label="Unit Price"
                placeholder="0"
                error={formErrors.unitPrice}
                defaultValue={inventoryInfo?.unitPrice}
              />
              <div className="flex flex-col gap-1.5">
                <div>Vendor Name - ({inventoryInfo?.vendorName})</div>
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
                {formErrors.vendor && (
                  <span className="text-red-500 text-xs">
                    {formErrors.vendor}
                  </span>
                )}
              </div>

              <InputBox
                name="gstPercentage"
                label="GST %"
                placeholder="0"
                error={formErrors.gstPercentage}
                defaultValue={inventoryInfo?.gstPercentage}
              />
              <InputBox
                name="packingCharges"
                label="Packing Charges"
                placeholder="0"
                error={formErrors.packingCharges}
                defaultValue={inventoryInfo?.packingCharges}
              />
              <InputBox
                name="transportCharge"
                label="Transport Charges"
                placeholder="0"
                error={formErrors.transportCharge}
                defaultValue={inventoryInfo?.transportCharge}
              />

              <div className="flex flex-col gap-1.5">
                <label htmlFor="">Remarks</label>
                <textarea
                  name="remarks"
                  defaultValue={inventoryInfo?.remarks}
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
                defaultValue={inventoryInfo?.billNo}
              />
              <div className="flex flex-col gap-1.5">
                <div>Status</div>
                <select
                  className="h-[41px] w-[430px] border-[1px] border-[#E5E7EB] px-3 rounded-[8px]"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  id=""
                >
                  <option value="ORDERED">ORDERED</option>
                  <option value="LOADED">LOADED</option>
                  <option value="IN_TRANSIT">IN_TRANSIT</option>
                  <option value="RECEIVED">RECEIVED</option>
                </select>
              </div>
              <div className="w-[430px]"></div>
            </div>
          </div>
          <div className="text-[#0F4C81] bg-[#E0F2F7] flex justify-center rounded-[8px] my-6 text-[16px] font-bold  font-emoji h-[56px] items-center">
            Total Effective Price: ₹{unitPrice * quantity}
          </div>
          <button className=" mb-20px hover:cursor-pointer h-[42px]  rounded-[8px] w-full   text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
            Update
          </button>
          {updateInventoryMutation.isSuccess && (
            <div className="text-green-600 w-full">
              Component Updated Successfully.
            </div>
          )}
          {updateInventoryMutation.isError && (
            <div>Error updating machine.</div>
          )}
        </form>
      </div>
    </RoleProtected>
  );
}
