import Link from "next/link";
export default function () {
  return (
    <div className="h-full w-full flex items-start bg-[#ffffff] rounded-[8px]">
      <div className="flex gap-8 flex-col p-7">
        <div>
          <div className="font-bold text-[24px] mb-4">
            Welcome, Administrator!
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="h-[92px] flex flex-col items-start justify-center px-5 bg-[#DBEAFE] rounded-[8px] shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_3px_0px_#0000001A,0px_1px_2px_-1px_#0000001A] ">
              <div className="font-semibold text-[18px]">Total Components</div>
              <div className="font-bold text-[24px]">500</div>
            </div>
            <div className="h-[92px] flex flex-col items-start justify-center px-5 bg-[#DCFCE7] rounded-[8px] shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_3px_0px_#0000001A,0px_1px_2px_-1px_#0000001A] ">
              <div className="font-semibold text-[18px]">
                Recent User Logins
              </div>
              <div className="font-bold text-[24px]">12</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Link
            href={"/user-account-management"}
            className="w-[344px] h-[60px] px-5 flex items-center rounded-[8px] bg-[#ffffff] shadow font-semibold text-[18px]"
          >
            User Account Management
          </Link>
          <div className="w-[344px] h-[60px] px-5 flex items-center rounded-[8px] bg-[#ffffff] shadow font-semibold text-[18px]">
            Product Price Comparison Master
          </div>
          <div className="w-[344px] h-[60px] px-5 flex items-center rounded-[8px] bg-[#ffffff] shadow font-semibold text-[18px]">
            Rejected/Scrap Material List
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md w-full">
          <table className="min-w-full w-full border border-gray-300 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  S.N.
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Modal
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Modal No.
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Associated Spares Count
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-3 border border-gray-300">1.</td>
                <td className="px-6 py-3 border border-gray-300">Modal</td>
                <td className="px-6 py-3 border border-gray-300">Modal</td>
                <td className="px-6 py-3 border border-gray-300">Modal</td>
                <td className="px-6 py-3 border border-gray-300">Modal</td>
                <td className="px-6 py-3 border border-gray-300">Modal</td>
                <td className="px-6 py-3 border border-gray-300">Modal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
