import React from "react";
import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-[#111318]">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-[#111318] text-lg font-bold leading-tight tracking-[-0.015em]">StockWise</h2>
        </div>
        <div className="flex items-center gap-9">
          <a className="text-[#111318] text-sm font-medium leading-normal" href="#">Dashboard</a>
          <a className="text-[#111318] text-sm font-medium leading-normal" href="#">Inventory</a>
          <a className="text-[#111318] text-sm font-medium leading-normal" href="#">Orders</a>
          <a className="text-[#111318] text-sm font-medium leading-normal" href="#">Customers</a>
          <a className="text-[#111318] text-sm font-medium leading-normal" href="#">Reports</a>
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <label className="flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-[#616f89] flex border-none bg-[#f0f2f4] items-center justify-center pl-4 rounded-l-lg border-r-0">
              <Search size={24} />
            </div>
            <input
              placeholder="Search"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-full placeholder:text-[#616f89] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            />
          </div>
        </label>
        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f4] text-[#111318] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
          <Bell size={20} />
        </button>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAfCXhssrQxcz2BhgW1aUUfy8OX2kgz_FuDxFRbepT5C5vvCAA9myxbqtBu1gnZ1CvZOnLDypeX0d53kkOijBTJc-kL_nMcRl7S7fyWKweofLUhvlcn40w3msukshcbwkHd8RdAJtwwzVLp0jZxvoeAegGHPGv39ETV0JKvYZ4QeGZjFOxpoxxDh0d4JDbyJHFOAmb567Ld5nRkkY7jukm1wAvAbiqAottadV-bXVOctlXhZVsaZP8F6nLmBOCnUvEvs7F-jxWT60QK")'}}
        ></div>
      </div>
    </header>
  );
};

export default Header;
