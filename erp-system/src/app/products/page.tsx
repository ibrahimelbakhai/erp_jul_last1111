import React from "react";
import { ProductControls } from "./_components/product-controls";
import { ProductsTable } from "./_components/products-table";

const ProductsPage = () => {
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <ProductControls />
      <div className="px-4 py-3">
        <div className="flex overflow-hidden rounded-lg border border-[#dbdfe6] bg-white">
          <ProductsTable />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
