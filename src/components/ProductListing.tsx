"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { cn } from "@/lib/utils";
import { Product } from "@/payload-types";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import ImageSlider from "./ImageSlider";
import { Skeleton } from "./ui/skeleton";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  if (isVisible && product) {
    return (
      <div>
        <Link
          className={cn("invisible h-full w-full cursor-pointer group/main", {
            "visible animate-in fade-in-5": isVisible,
          })}
          href={`/product/${product.id}`}
        >
          <div className="flex flex-col w-full">
            <div className="flex">
              <p className=" text-sm text-gray-500">{label}:&nbsp;</p>
              <h3 className="font-medium text-sm text-gray-700">
                {product.name}
              </h3>
            </div>
            <ImageSlider urls={validUrls} />
            <div className="flex justify-center">
              <div>
                <p className="mt-1 mb-1 font-medium text-sm text-gray-900">
                  {product.price.toLocaleString("en")}đ
                </p>
              </div>
            </div>
          </div>
        </Link>
        <AddToCartButton product={product} />
      </div>
    );
  }
};

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

export default ProductListing;
