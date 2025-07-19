"use client";
import { authRequest } from "@/lib/api/auth";
import { useMachines } from "@/lib/api/machineApi/useMachines";
import { useAddWorkOrder } from "@/lib/api/wokOrderApi/useAddWorkOrder";
import { useUpdateWorkOrder } from "@/lib/api/wokOrderApi/useUpdateWorkOrder";
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function InputBox(e: {
  label: string;
  placeholder: string;
  name: string;
  defaultValue: string;
}) {
  return (
    <div className="relative flex flex-col gap-1.5">
      <label htmlFor="" className="text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label>
      <input
        className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
        type="text"
        placeholder={e.placeholder}
        defaultValue={e.defaultValue}
        name = {e.name}
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
  const [status, setStatus] = useState<string>();
  useEffect(() => setMounted(true), []);
  const { data, isLoading, error } = useMachines();
  useEffect(() => {
    if (data) setComponents(data.content);
  }, [data]);
  useEffect(() => {
    const getInfo = async () => {
      const pathParts = pathname.split("/").filter(Boolean);
      const workOrderId = pathParts[pathParts.length - 1];

      try {
        const workdata = await authRequest({
          url: `${API_ROUTES.WORKORDER}/${workOrderId}`,
          method: "GET",
        });
        setStatus(workdata?.status);

        setWorkOrderInfo(workdata);
      } catch (err) {
        console.error("Failed to fetch work-order info:", err);
      }
    };

    if (pathname) {
      getInfo();
    }
  }, [pathname]);
  useEffect(() => {
    if (components.length > 0 && workOrderInfo) {
      const sel = components.find(
        (component) => component.id === workOrderInfo.machineId
      );
      setSelected(sel);
    }
  }, [components, workOrderInfo]);

  const filteredComponents = components.filter((component) =>
    (component.name ?? component.displayName)
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const updateWorkOrderMutation = useUpdateWorkOrder();
  useEffect(() => {
    if (updateWorkOrderMutation.isSuccess) {
      const timeout = setTimeout(() => {
        router.push("/work-order-master");
      }, 1000);

      return () => clearTimeout(timeout); 
    }
  }, [updateWorkOrderMutation.isSuccess]);
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    const finaldata = {
      ...formdata,
      machineId: selected.id,
    };
    console.log("formdata" , formdata);
    console.log("finaldata.content" , finaldata );
    // const result = componentSchema.safeParse(formdata);
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
    const pathParts = pathname.split("/").filter(Boolean);
    const workOrderId = pathParts[pathParts.length - 1];
    updateWorkOrderMutation.mutate({ reqData: finaldata, id: Number(workOrderId)});
  }

      <div
      className="w-[766px] mx-auto p-8 bg-[#ffffff] rounded-[8px]"
      style={{ boxShadow: "0px 10px 15px -3px #0000001A" }}
    >
      <div className="text-[#0F4C81] font-bold text-[20px]">
        Edit Work Order
      </div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[94px] items-center">
        Edit existing work order information. Work orders are central to
        tracking material usage and project costs.
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="mt-[25px]">
          <div className="flex flex-wrap gap-x-6 gap-y-8 mt-[10px]">
            <div className="relative flex flex-col gap-1.5 w-[338px]">
              <label htmlFor="" className="text-[#343A40] text-[14px] font-normal">Select Machine</label>
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
            <div className="relative flex flex-col gap-1.5">
                <div className="text-[#343A40] text-[14px] font-normal">Status</div>
                <select
                  className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  id=""
                >
                  <option value="ORDERED">Ordered</option>
                  <option value="WORK_IN_PROGRESS">Work In Progress</option>
                  <option value="NOT_STARTED_YET">Not Started Yet</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            <InputBox
              name="agentName"
              label="Agent Name"
              placeholder="Enter Agent Name"
              defaultValue={workOrderInfo?.agentName}
            />
            
            <InputBox
              name=""
              label="Buyer Name"
              placeholder="Enter Buyer Name"
              defaultValue={workOrderInfo?.buyerName}
            />
            <InputBox
              name="buyerCountry"
              label="Buyer Country"
              placeholder="Enter Buyer Name"
              defaultValue={workOrderInfo?.buyerCountry}
            />
            <InputBox
              name="buyerState"
              label="Buyer State"
              placeholder="Enter Buyer State"
              defaultValue={workOrderInfo?.buyerState}
            />
            <InputBox
              name="buyerCity"
              label="Buyer City"
              placeholder="Enter Buyer City"
              defaultValue={workOrderInfo?.buyerCity}
            />
            <InputBox
              name="remarks"
              label="Remarks"
              placeholder="Enter Remarks (Optional)"
              defaultValue={workOrderInfo?.remarks}
            />
          </div>
        </div>
        {updateWorkOrderMutation.isSuccess && (
          <div className="text-green-600 w-full">
            Updated Work-Order Successfully.
          </div>
        )}
        {updateWorkOrderMutation.error && (
          <div className="text-red-500 text-sm mt-2">
            {(updateWorkOrderMutation.error as any)?.response?.data.content?.message ??
              (updateWorkOrderMutation.error as any)?.response?.data.content?.error ??
              updateWorkOrderMutation.error.message ??
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
            Edit Work Order
          </button>
        </div>
      </form>
    </div>
  
}
