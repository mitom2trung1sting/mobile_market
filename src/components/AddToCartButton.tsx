"use client";

import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 1234);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <div>
      <Button
        onClick={() => {
          addItem(product);
          setIsSuccess(true);
        }}
        size="lg"
        className="w-full flex gap-4 mt-10"
      >
        <ShoppingCartIcon />
        {isSuccess ? "Đã thêm!" : "Thêm vào giỏ hàng"}
      </Button>
    </div>
  );
};

export default AddToCartButton;
