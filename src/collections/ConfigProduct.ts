import { CustomSelectField } from "../components/CustomSelectFiield/field";
import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const isAdmin =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;
    return Boolean(user?.role === "admin");
  };

export const ConfigProduct: CollectionConfig = {
  slug: "config_product",
  admin: {
    useAsTitle: "Cấu hình sản phẩm",
    description:
      "Thêm cấu hình, thuộc tính cho sản phẩm của bạn trên Tuấn Minh iStore.",
  },
  access: {
    read: () => true,
    update: isAdmin(),
    delete: isAdmin(),
    create: isAdmin(),
  },

  fields: [
    {
      name: "products",
      label: "Products",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "products",
      hasMany: false,
    },
    CustomSelectField,
    {
      name: "config",
      label: "Cấu hình sản phẩm (vd: 128 GB, 256 GB, 512 GB,...)",
      required: false,
      type: "text",
    },
    {
      name: "color",
      label: "Màu sắc của sản phẩm (vd: Xanh , Đỏ, Vàng,...)",
      required: false,
      type: "text",
    },
    {
      name: "price",
      label: "Giá sản phẩm mặc định (VND)",
      min: 0,
      max: 999999999999999,
      type: "number",
      required: true,
    },
    {
      name: "discount",
      label: "Giảm giá (%)",
      min: 0,
      max: 100,
      type: "number",
      required: true,
    },
    {
      name: "product_files",
      label: "Tệp sản phẩm",
      type: "relationship",
      required: true,
      relationTo: "product_files",
      hasMany: false,
    },
  ],
};
