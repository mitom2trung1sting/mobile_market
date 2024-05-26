"use client";
import { Product } from "@/payload-types";
import { PlusIcon, MinusIcon } from "lucide-react";

const ButtonQuantity = ({
  quantity,
  increase,
  decrease,
  product,
}: {
  quantity: number;
  increase: () => void;
  decrease: () => void;
  product: Product;
}) => {
  return (
    <div className="flex space-x-10">
      <div className="flex gap-4">
        <MinusIcon onClick={decrease} className="cursor-pointer" />
        <p className="text-sm text-muted-foreground">Số lượng: {quantity}</p>
        <PlusIcon onClick={increase} className="cursor-pointer" />
      </div>
      <p className="text-sm text-muted-foreground">
        Sản phẩm có sẵn: {product?.totalAvailable}
      </p>
    </div>
  );
};

export default ButtonQuantity;
