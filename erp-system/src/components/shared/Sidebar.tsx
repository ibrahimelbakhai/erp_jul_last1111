import React from "react";
import {
  Gauge,
  Package,
  List,
  Warehouse,
  ArrowDown,
  ArrowUp,
  ArrowLeftRight,
  BarChart,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="layout-content-container flex flex-col w-80">
      <div className="flex h-full min-h-[700px] flex-col justify-between bg-white p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <Gauge size={24} />
              <p className="text-[#111318] text-sm font-medium leading-normal">Dashboard</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2">
              <Package size={24} />
              <p className="text-[#111318] text-sm font-medium leading-normal">Inventory</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#f0f2f4]">
              <Package size={24} />
              <p className="text-[#111318] text-sm font-medium leading-normal">Products</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2">
              <List size={24} />
              <p className="text-[#111318] text-sm font-medium leading-normal">Category</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2">
              <Warehouse size={24} />
              <p className="text-[#111318] text-sm font-medium leading-normal">Warehouse</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2">
              <ArrowDown size={24} />
              <p className="text-[#111318] text-sm font-medium leading-normal">Receipt</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2">
              <ArrowUp size={24} />
              <p className="text-[#111318] text-sm font-medium leading-normal">Disbursement</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2">
              <ArrowLeftRight size={24} />
              <p className="text-[#111318] text-sm font-medium leading-normal">Transfer</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2">
              <BarChart size={24} />
              <p className="text-[#111318] text-sm font-medium leading-normal">Reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
