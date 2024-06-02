"use client";
import { ConfigProduct, Product } from "@/payload-types";
import Link from "next/link";
import React, { useState } from "react";
import ConfigProductCard from "./ConfigProduct";
import { Check, Shield } from "lucide-react";
import ImageSlider from "./ImageSlider";
import AddToCartButton from "./AddToCartButton";
import { CurrentProduct } from "@/type/type";

const BREADCRUMBS = [
  { id: 1, name: "Trang chủ", href: "/" },
  { id: 2, name: "Sản phẩm", href: "/products" },
];

const SubProductPage = ({
  product,
  configProducts,
  label,
  validUrls,
}: {
  product: Product;
  configProducts: ConfigProduct[];
  label: string;
  validUrls: string[];
}) => {
  const [currentProduct, setCurrentProduct] = useState<Product>(product);

  return (
    <>
      {/* Product Details */}
      <div className="lg:max-w-lg lg:self-end">
        <ol className="flex items-center space-x-2">
          {BREADCRUMBS.map((breadcrumb, i) => (
            <li key={breadcrumb.href}>
              <div className="flex items-center text-sm">
                <Link
                  href={breadcrumb.href}
                  className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                >
                  {breadcrumb.name}
                </Link>
                {i !== BREADCRUMBS.length - 1 ? (
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4">
          <div className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {currentProduct.name}
          </div>
        </div>

        <section className="mt-4">
          <div className="flex items-center">
            <div className=" border-gray-300">{label}</div>
            <p className=" ml-4 border-l font-medium text-red-400  text-muted-foreground pl-4">
              {(
                currentProduct.price -
                currentProduct.price * (currentProduct.discount / 100)
              ).toLocaleString("vn")}
              đ
            </p>

            <span className="ml-4 border-l font-medium line-clamp-1 text-sm line-through text-gray-400">
              {currentProduct.price.toLocaleString("vn")}đ
            </span>
          </div>

          {/* Config product */}
          {!!configProducts && (
            <div>
              {configProducts.length > 0 && (
                <p className="mt-4 text-sm text-muted-foreground">Cấu hình:</p>
              )}
              <div className="mt-4 w-1/2 grid grid-cols-12 gap-x-4 gap-y-16 sm:gap-x-44 md:grid-cols-3 md:gap-y-6 lg:gap-x-44">
                {configProducts.map((configProduct, i) => {
                  const name = !!configProduct.color
                    ? product.name +
                      " " +
                      configProduct.config +
                      " màu " +
                      configProduct.color
                    : product.name + " " + configProduct.config;

                  const current = {
                    ...product,
                    price: configProduct.price,
                    discount: configProduct.discount,
                    name,
                  };

                  return (
                    <ConfigProductCard
                      onCardClick={() => setCurrentProduct(current)}
                      key={`configProduct-${i}`}
                      configProduct={configProduct}
                    />
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center ">
            <Check
              aria-hidden="true"
              className="h-5 w-5 flex-shrink-0 text-green-500"
            />
            <p className="ml-2 text-sm text-muted-foreground">
              Đủ điều kiện để giao hàng ngay lập tức
            </p>
            <p className="text-sm text-muted-foreground ml-16">
              Sản phẩm có sẵn: {product?.totalAvailable}
            </p>
          </div>
        </section>
      </div>
      {/* Product images */}
      <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
        <div className="aspect-square rounded-lg">
          <ImageSlider urls={validUrls} />
        </div>
      </div>
      {/* add to cart part */}
      <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
        <div>
          <AddToCartButton product={currentProduct} />
          <div className="mt-6 text-center">
            <div className="group inline-flex text-sm text-medium">
              <Shield
                aria-hidden="true"
                className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
              />
              <span className="text-muted-foreground hover:text-gray-700">
                Đảm bảo hoàn trả lại trong vòng 30 ngày
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubProductPage;
