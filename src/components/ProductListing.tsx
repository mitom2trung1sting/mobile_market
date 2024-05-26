"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { cn } from "@/lib/utils";
import { Product } from "@/payload-types";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import ImageSlider from "./ImageSlider";
import { Skeleton } from "./ui/skeleton";
import { Card, IconButton } from "@mui/material";
import { Heart, Star } from "lucide-react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

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
      <Card
        className="p-3 min-h-[400px] min-w-[300px] rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer"
        elevation={24}
      >
        <Link
          className={cn(" invisible h-full w-full cursor-pointer group/main", {
            "visible animate-in fade-in-5": isVisible,
          })}
          href={`/product/${product.id}`}
        >
          <div className="gap-y-6 flex flex-col w-full">
            <div className="flex">
              <p className=" text-sm text-gray-500">{label}:&nbsp;</p>
              <h3 className="font-medium text-sm text-gray-700">
                {product.name}
              </h3>
            </div>
            <ImageSlider urls={validUrls} />
            <div className="flex space-x-2">
              <p className="text-xl font-medium text-red-400">
                {(
                  product.price -
                  product.price * (product.discount / 100)
                ).toLocaleString("vn")}
                đ
              </p>
              <p className="text-xl line-through text-gray-300">
                {product.price}đ
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <StarIcon className="text-yellow-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" />
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <p className="text-sm text-gray-500">Yêu thích</p>
                <FavoriteIcon className="text-red-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" />
              </div>
            </div>
          </div>
        </Link>
      </Card>
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
