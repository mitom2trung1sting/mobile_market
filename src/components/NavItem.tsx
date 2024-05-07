"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { Button, buttonVariants } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  close: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({
  isAnyOpen,
  category,
  handleOpen,
  close,
  isOpen,
}: NavItemProps) => {
  const onMouseMove = (index: number): void => {
    const element = document.getElementById(`buy-now-${index}`);
    if (element) {
      element.style.display = "block";
    }
  };

  const onMouseLeave = (index: number): void => {
    const element = document.getElementById(`buy-now-${index}`);
    if (element) {
      element.style.display = "none";
    }
  };

  return (
    <div className="flex ">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5 text-orange-900"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          onClick={() => close()}
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        >
          <div className="relative bg-orange-800 rounded-md w-2/3 left-1/2 right-1/2 -translate-x-1/2 max-h-[500px] overflow-auto">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-10 gap-y-10 p-5 pt-10 pb-10">
                  {category.featured.map((item, index) => (
                    <div
                      onClick={() => close}
                      key={item.name + index}
                      className="group relative text-base sm:text-sm"
                    >
                      <Link
                        id={"nav-item-" + index}
                        href={item.href}
                        className=" block font-medium text-white"
                      >
                        <div
                          className="relative aspect-video overflow-hidden rounded-lg bg-gray-100"
                          onMouseMove={() => onMouseMove(index)}
                          onMouseLeave={() => onMouseLeave(index)}
                        >
                          <Image
                            src={item.imageSrc}
                            alt="product category image"
                            fill
                            className="object-cover object-center group-hover:opacity-40"
                          />

                          <div
                            id={"buy-now-" + index}
                            className="absolute hidden top-1/2 rounded-sm left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-15 p-2 bg-blue-600 text-white"
                          >
                            Mua ngay
                          </div>
                        </div>
                        <div className="flex w-full justify-center mt-2">
                          {" "}
                          {item.name}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
