import { ConfigProduct } from "@/payload-types";
import { Card } from "@mui/material";
import React from "react";

const ConfigProductCard = ({
  configProduct,
  onCardClick,
}: {
  configProduct: ConfigProduct;
  onCardClick?: () => void;
}) => {
  return (
    <Card
      onClick={onCardClick}
      elevation={8}
      sx={{
        padding: 1,
        minHeight: 80,
        justifyItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        minWidth: 160,
      }}
      className="rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer"
    >
      {!!configProduct.color && (
        <div className="flex justify-center">
          <div>{configProduct.color}</div>
        </div>
      )}

      {!!configProduct.config && (
        <div className="flex justify-center">
          <div>{configProduct.config}</div>
        </div>
      )}

      <div className="flex justify-between">
        <span className="ml-auto line-clamp-1 text-sm text-red-400">
          {(
            configProduct.price -
            configProduct.price * (configProduct.discount / 100)
          ).toLocaleString("vn")}
          đ
        </span>

        <span className="ml-auto line-clamp-1 text-sm line-through text-gray-300">
          {configProduct.price.toLocaleString("vn")}đ
        </span>
      </div>
    </Card>
  );
};

export default ConfigProductCard;
