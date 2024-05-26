"use client";

import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ButtonQuantity from "./ButtonQuantity";
import { Button } from "./ui/button";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(0);
  const increase = () =>
    setQuantity((val) => (val + 1 === product.totalAvailable ? val : val + 1));
  const decrease = () => setQuantity((val) => (val === 0 ? 0 : val - 1));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 1234);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <div>
      <ButtonQuantity
        product={product}
        quantity={quantity}
        increase={increase}
        decrease={decrease}
      />
      <Button
        onClick={() => {
          addItem(product, quantity);
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
