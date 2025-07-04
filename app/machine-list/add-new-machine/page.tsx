"use client";
import Delete from "@/components/ui/Delete";
import AddButton from "@/components/ui/Add";
import { useEffect, useState } from "react";
import { useAddMachines } from "@/lib/api/addMachines";
import { machineSchema } from "@/lib/schemas";
import { useComponents } from "@/lib/api/useComponents";

function AddNewMachine() {
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
    component.name.toLowerCase().includes(search.toLowerCase())
  );
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const addMachineMutation = useAddMachines();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );

    const result = machineSchema.safeParse(formData);

    if (!result.success) {
      const errors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    addMachineMutation.mutate(result.data);
  };

  if (addMachineMutation.isSuccess) return <div>Vendor saved!</div>;
  if (addMachineMutation.isError) return <div>Error saving vendor.</div>;

  return (
    <div className="w-[766px] mx-auto p-8 bg-[#ffffff] rounded-[8px]">
      <div className="text-[#0F4C81] font-bold text-[20px]">
        Add New Machine
      </div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[94px] items-center">
        Define the machine details and specify the materials required for its
        maintenance or assembly. This list helps in forecasting inventory
        availability and does not impact actual stock levels.
      </div>
      <div className="mt-[25px]">
        <div className="text-[#1F2937] text-[16px] font-semibold">
          Machine Details
        </div>
        <form onSubmit={() => console.log("submitted")}>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-[10px]">
            <input
              className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3"
              type="text"
              placeholder="Machine Name"
            />
            <input
              className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3"
              type="text"
              placeholder="Machine Category"
            />
            <input
              className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3"
              type="text"
              placeholder="Model"
            />
            <input
              className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3"
              type="text"
              placeholder="Model No."
            />
            <input
              className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3"
              type="text"
              placeholder="Weight"
            />
            <input
              className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3"
              type="text"
              placeholder="Price"
            />
            <input
              className="h-[50px] w-full border-[1px] border-[#D1D5DB]  rounded-[6px] px-3"
              type="text"
              placeholder="Description"
            />
          </div>
          <div className="text-[#1F2937] text-[16px] font-semibold mt-6">
            Required Spare Parts
          </div>
          <div>
            
          </div>

          <div className="flex gap-x-4 gap-y-3 mt-[10px] items-center ">
            <div className="relative flex flex-col  w-[338px]">
              <button
                onClick={() => setIsOpen(isOpen ? false : true)}
                className="h-[50px] w-full border-[1px] border-[#D1D5DB] flex items-center justify-between  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
              >
                {selected ? selected.name : "Component Name"}
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
                          {component.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <input
              required
              className="h-[50px] w-[200px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3"
              type="number"
              placeholder="Quantity Required"
            />
            <Delete to="/" />
          </div>
          <div className="w-[181px]">
            <AddButton to="/" text="Add Material" />
          </div>
          <div className="mt-[25px]">
            <div className="w-full flex h-[42px] items-center justify-end gap-4">
              <div className="border-[#6B7280] h-[42px] text-emoji border-[1px] rounded-[8px] w-[81px]  text-[#6B7280] text-[16px] font-normal flex items-center justify-center">
                Cancel
              </div>
              <button className=" h-[42px]  rounded-[8px] w-[124px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
                Save Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddNewMachine;
