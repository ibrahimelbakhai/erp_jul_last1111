"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ChevronDown } from "lucide-react";

export function ProductControls() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#111318] tracking-light text-[32px] font-bold leading-tight min-w-72">Products</p>
        <Button>Add Product</Button>
      </div>
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search products" className="pl-10" />
        </div>
      </div>
      <div className="flex gap-3 p-3 flex-wrap pr-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Category <ChevronDown className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cleaning Supplies</DropdownMenuItem>
            <DropdownMenuItem>Laundry Supplies</DropdownMenuItem>
            <DropdownMenuItem>Accessories</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Warehouse <ChevronDown className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Warehouses</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Main Warehouse</DropdownMenuItem>
            <DropdownMenuItem>Retail Store</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Stock Status <ChevronDown className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Stock Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>In Stock</DropdownMenuItem>
            <DropdownMenuItem>Low Stock</DropdownMenuItem>
            <DropdownMenuItem>Out of Stock</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
