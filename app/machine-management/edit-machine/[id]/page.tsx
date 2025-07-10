"use client";
import Delete from "@/components/ui/Delete";
import AddButton from "@/components/ui/Add";
import { useEffect, useState } from "react";
import { useUpdateMachine } from "@/lib/api/machineApi/useUpdateMachine";
import { machineSchema } from "@/lib/schemas";
import { useComponents } from "@/lib/api/componentApi/useComponents";
import { Machine } from "@/lib/schemas";
import { authRequest } from "@/lib/api/auth";
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import RoleProtected from "@/components/RoleProtection";

function InputBox(e: {
  placeholder: string;
  name: string;
  error?: string;
  defaultValue: string;
}) {
  return (
    <div className="flex flex-col">
      <input
        className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3"
        type="text"
        placeholder={e.placeholder}
        name={e.name}
        defaultValue={e.defaultValue}
      />
      {e.error && <span className="text-red-500 text-xs">{e.error}</span>}
    </div>
  );
}

export default function () {
  const router = useRouter();
  const [machineInfo, setMachineInfo] = useState<Machine>();
  const [reqComponents, setReqComponents] = useState<
    { componentName: string; quantityRequired: number; componentId: number }[]
  >([]);
  const pathname = usePathname();

  useEffect(() => {
    const getInfo = async () => {
      const pathParts = pathname.split("/").filter(Boolean);
      const machineId = pathParts[pathParts.length - 1];

      try {
        const data = await authRequest({
          url: `${API_ROUTES.MACHINES}/${machineId}`,
          method: "GET",
        });

        console.log("Fetched Machine info:", data);
        setMachineInfo(data);
        setReqComponents(data.components);
      } catch (err) {
        console.error("Failed to fetch Machine info:", err);
      }
    };

    if (pathname) {
      getInfo();
    }
  }, [pathname]);

  const [quantity, setQuantity] = useState<number>(0);
  const [components, setComponents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const { data, isLoading, error } = useComponents();
  useEffect(() => {
    if (data) setComponents(data);
  }, [data]);

  const filteredComponents = components.filter((component) =>
    component.displayName.toLowerCase().includes(search.toLowerCase())
  );
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const updateMachineMutation = useUpdateMachine();

  useEffect(() => {
    if (updateMachineMutation.isSuccess) {
      const timeout = setTimeout(() => {
        router.push("/machine-management");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [updateMachineMutation.isSuccess]);

  if (updateMachineMutation.isError) return <div>Error Updating machine.</div>;

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    const fullData = { ...formData, components: reqComponents };
    const result = machineSchema.safeParse(fullData);
    if (!result.success) {
      const errors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFormErrors(errors);
      console.log(errors);
      return;
    }
    const pathParts = pathname.split("/").filter(Boolean);
    const machineId = pathParts[pathParts.length - 1];
    const temp = {
      reqData: result.data,
      id: Number(machineId),
    };

    setFormErrors({});
    updateMachineMutation.mutate(temp);
  };

  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
      <div className="w-[766px] mx-auto p-8 bg-[#ffffff] rounded-[8px]">
        <div className="text-[#0F4C81] font-bold text-[20px]">
          Edit Machine Details
        </div>
        <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[94px] items-center">
          Edit the machine details and specify the materials required for its
          maintenance or assembly. This list helps in forecasting inventory
          availability and does not impact actual stock levels.
        </div>
        <div className="mt-[25px]">
          <div className="text-[#1F2937] text-[16px] font-semibold">
            Machine Details
          </div>
          <form onSubmit={formSubmit}>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-[10px]">
              <InputBox
                name="name"
                placeholder="Machine Name"
                error={formErrors.name}
                defaultValue={machineInfo?.name ?? ""}
              />
              <InputBox
                name="machineCategory"
                placeholder="Machine Category"
                error={formErrors.machineCategory}
                defaultValue={machineInfo?.machineCategory ?? ""}
              />
              <InputBox
                name="model"
                placeholder="Model"
                error={formErrors.model}
                defaultValue={machineInfo?.model ?? ""}
              />
              <InputBox
                name="modelNumber"
                placeholder="Model No."
                error={formErrors.modelNumber}
                defaultValue={machineInfo?.modelNumber ?? ""}
              />
              <InputBox
                name="weight"
                placeholder="Weight"
                error={formErrors.weight}
                defaultValue={machineInfo?.weight?.toString() ?? ""}
              />
              <InputBox
                name="price"
                placeholder="Price"
                error={formErrors.price}
                defaultValue={machineInfo?.price.toString() ?? ""}
              />
              <div className="flex flex-col w-full">
                <input
                  className="h-[50px] w-full border-[1px] border-[#D1D5DB]  rounded-[6px] px-3"
                  type="text"
                  placeholder="Description"
                  name="description"
                  defaultValue={machineInfo?.description ?? ""}
                />
                {formErrors.description && (
                  <span className="text-red-500 text-xs">
                    {formErrors.description}
                  </span>
                )}
              </div>
            </div>

            <div className="text-[#1F2937] text-[16px] font-semibold mt-6">
              Required Spare Parts
            </div>

            <div className="flex w-full flex-wrap flex-row gap-3 mt-3 rounded-[8px]">
              {reqComponents.map(
                (
                  component: {
                    componentName: string;
                    quantityRequired: number;
                    componentId: number;
                  },
                  i: number
                ) => {
                  if (component.quantityRequired > 0) {
                    return (
                      <div
                        className="h-[25px] text-[16px] flex justify-center items-center px-3 bg-[#DBEAFE] rounded-4"
                        key={i}
                      >
                        <p>{component.componentName}</p>
                        <p className="ml-1">({component.quantityRequired})</p>
                        <svg
                          className="ml-4 h-[10px] hover:cursor-pointer"
                          onClick={() =>
                            setReqComponents((prev) =>
                              prev.filter(
                                (c) =>
                                  component.componentName !== c.componentName
                              )
                            )
                          }
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.75 1.25L1.25 13.75"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1.25 1.25L13.75 13.75"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    );
                  } else return "";
                }
              )}
            </div>

            {/* input for parts */}
            <div className="flex gap-x-4 gap-y-3 mt-[10px] items-center ">
              <div className="relative flex flex-col  w-[450px]">
                <button
                  type="button"
                  onClick={() => setIsOpen(isOpen ? false : true)}
                  className="h-[50px] w-full border-[1px] border-[#D1D5DB] flex items-center justify-between  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                >
                  {selected ? selected.displayName : "Component Name"}
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
                            key={component.id ? component.id : i}
                            className={`p-2 cursor-pointer hover:bg-blue-100 ${
                              selected === component.id ? "bg-blue-50" : ""
                            }`}
                            onClick={() => {
                              setSelected(component);
                              setIsOpen(false);
                            }}
                          >
                            {component.displayName}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <input
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="h-[50px] w-[200px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3"
                  type="number"
                  placeholder="Quantity Required"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (
                    selected != null &&
                    selected.displayName != null &&
                    selected.displayName != "" &&
                    quantity != null &&
                    quantity != 0
                  ) {
                    const temp = reqComponents.find(
                      (comp) => comp.componentName === selected.displayName
                    );
                    if (temp) {
                      setReqComponents((prev) =>
                        prev.map((comp) =>
                          comp.componentName === selected.displayName
                            ? {
                                ...comp,
                                quantityRequired: Math.max(
                                  comp.quantityRequired - quantity,
                                  0
                                ),
                              }
                            : comp
                        )
                      );
                    }
                  }
                }}
                className="w-[35px] h-[40px] rounded-[5px] bg-[#E0F2F7] flex items-center justify-center hover:cursor-pointer"
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
            {formErrors.components && (
              <span className="text-red-500 text-xs">
                {formErrors.components}
              </span>
            )}
            {/* add material button */}
            <div
              onClick={() => {
                if (
                  selected != null &&
                  selected.displayName != null &&
                  selected.displayName != "" &&
                  quantity != null &&
                  quantity != 0
                ) {
                  const temp = reqComponents.find(
                    (comp) => comp.componentName === selected.displayName
                  );
                  if (temp) {
                    setReqComponents((prev) =>
                      prev.map((comp) =>
                        comp.componentName === selected.displayName
                          ? {
                              ...comp,
                              quantityRequired:
                                comp.quantityRequired + quantity,
                            }
                          : comp
                      )
                    );
                  } else {
                    setReqComponents((prev) => [
                      ...prev,
                      {
                        componentName: selected.displayName,
                        quantityRequired: quantity,
                        componentId: selected.id,
                      },
                    ]);
                  }
                }
              }}
              className="w-[181px]"
            >
              <button
                type="button"
                className="hover:cursor-pointer text-[#FFFFFF] text-[16px] font-sans font-bold h-[50px] px-5 rounded-[6px] bg-[#22C55E] flex justify-center items-center gap-2 my-5"
              >
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
                Add Material
              </button>
            </div>
            <div className="mt-[25px] w-full flex justify-between">
              {updateMachineMutation.isSuccess && (
                <div className="text-green-600 w-full">
                  Updated Machine Successfully
                </div>
              )}

              <div className="w-full flex h-[42px] items-center justify-end gap-4">
                <Link
                  href={"/machine-management"}
                  className="border-[#6B7280] h-[42px] text-emoji border-[1px] rounded-[8px] w-[81px]  text-[#6B7280] text-[16px] font-normal flex items-center justify-center"
                >
                  Cancel
                </Link>
                <button className=" hover:cursor-pointer h-[42px]  rounded-[8px] w-[124px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
                  {updateMachineMutation.isPending
                    ? "Saving..."
                    : "Save Machine"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </RoleProtected>
  );
}
