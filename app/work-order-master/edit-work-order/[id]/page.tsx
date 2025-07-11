"use client";
import { authRequest } from "@/lib/api/auth";
import { useMachines } from "@/lib/api/machineApi/useMachines";
import { useAddWorkOrder } from "@/lib/api/wokOrderApi/useAddWorkOrder";
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function InputBox(e: { label: string; placeholder: string; name: string }) {
  return (
    <div className="relative flex flex-col gap-1.5">
      <label htmlFor="" className="text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label>
      <input
        className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
        type="text"
        placeholder={e.placeholder}
      />
    </div>
  );
}

export default function () {
  const router = useRouter();
  const pathname = usePathname();
  const [components, setComponents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [workOrderInfo, setWorkOrderInfo] = useState<any>();
  useEffect(() => setMounted(true), []);
  const { data, isLoading, error } = useMachines();
   useEffect(() => {
      const getInfo = async () => {
        const pathParts = pathname.split("/").filter(Boolean);
        const workOrderId = pathParts[pathParts.length - 1];
  
        try {
          const data = await authRequest({
            url: `${API_ROUTES.WORKORDER}/${workOrderId}`,
            method: "GET",
          });
  
          console.log("Fetched work-order info:", data);
          setWorkOrderInfo(data);
        } catch (err) {
          console.error("Failed to fetch work-order info:", err);
        }
      };
  
      if (pathname) {
        getInfo();
      }
    }, [pathname]);
  useEffect(() => {
    if (data) setComponents(data);
  }, [data]);
  const filteredComponents = components.filter((component) =>
    (component.name ?? component.displayName)
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const addWorkOrderMutation = useAddWorkOrder();
  useEffect(() => {
    if (addWorkOrderMutation.isSuccess) {
      const timeout = setTimeout(() => {
        router.push("/machine-management");
      }, 1000);

      return () => clearTimeout(timeout); // Cleanup if component unmounts
    }
  }, [addWorkOrderMutation.isSuccess]);
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    const finalData = {
      ...formData,
      machineId: selected.id,
    };
    // console.log(formData);
    // const result = componentSchema.safeParse(formData);
    // if (!result.success) {
    //   const errors: { [key: string]: string } = {};
    //   result.error.errors.forEach((err) => {
    //     if (err.path[0]) errors[err.path[0] as string] = err.message;
    //   });
    //   setFormErrors(errors);
    //   console.log(errors);
    //   return;
    // }
    // console.log(formErrors);

    // setFormErrors({});
    addWorkOrderMutation.mutate(finalData);
  }

  return (
    <div
      className="w-[766px] mx-auto p-8 bg-[#ffffff] rounded-[8px]"
      style={{ boxShadow: "0px 10px 15px -3px #0000001A" }}
    >
      <div className="text-[#0F4C81] font-bold text-[20px]">
        Add New Work Order
      </div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[94px] items-center">
        Define new work order details or update existing information. Work
        orders are central to tracking material usage and project costs.
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="mt-[25px]">
          <div className="flex flex-wrap gap-x-6 gap-y-8 mt-[10px]">
            <div className="relative flex flex-col gap-1 w-[338px]">
              <label htmlFor="">Select Machine</label>
              <button
                type="button"
                onClick={() => setIsOpen(isOpen ? false : true)}
                className="h-[50px] w-full border-[1px] border-[#D1D5DB] flex items-center justify-between  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
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
              {formErrors.componentId && (
                <span className="text-red-500 text-xs">
                  {formErrors.componentId}
                </span>
              )}

              <div
                className={`${
                  isOpen ? "block" : "hidden"
                } absolute top-18 bg-[#FFFFFF] z-10 flex flex-col w-full border-[1px] border-[#D1D5DB] h-[400px]  items-start justify-between  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]`}
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
                          key={component.id ? component.id : i}
                          className={`p-2 cursor-pointer hover:bg-blue-100 ${
                            selected === component.id ? "bg-blue-50" : ""
                          }`}
                          onClick={() => {
                            setSelected(component);
                            setIsOpen(false);
                          }}
                        >
                          {component.name ?? component.displayName}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <InputBox
              name="agentName"
              label="Agent Name"
              placeholder="Enter Agent Name"
            />
            <InputBox
              name=""
              label="Buyer Name"
              placeholder="Enter Buyer Name"
            />
            <InputBox
              name="buyerCountry"
              label="Buyer Country"
              placeholder="Enter Buyer Name"
            />
            <InputBox
              name="buyerState"
              label="Buyer State"
              placeholder="Enter Buyer State"
            />
            <InputBox
              name="buyerCity"
              label="Buyer City"
              placeholder="Enter Buyer City"
            />
            <InputBox
              name="remarks"
              label="Remarks"
              placeholder="Enter Remarks (Optional)"
            />
          </div>
        </div>
        {addWorkOrderMutation.isSuccess && (
          <div className="text-green-600 w-full">
            Added Machine Successfully.
          </div>
        )}
        {addWorkOrderMutation.error && (
          <div className="text-red-500 text-sm mt-2">
            {(addWorkOrderMutation.error as any)?.response?.data?.message ??
              (addWorkOrderMutation.error as any)?.response?.data?.error ??
              addWorkOrderMutation.error.message ??
              "Something went wrong"}
          </div>
        )}
        <div className="w-full flex h-[42px] items-center justify-end gap-4 mt-[25px]">
          <Link
            href={"/work-order-master"}
            className="border-[#6B7280] h-[42px] text-emoji border-[1px] rounded-[8px] w-[81px]  text-[#6B7280] text-[16px] font-normal flex items-center justify-center"
          >
            Cancel
          </Link>
          <button className="hover:cursor-pointer h-[42px]  rounded-[8px] w-[154px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
            Add Work Order
          </button>
        </div>
      </form>
    </div>
  );
}
