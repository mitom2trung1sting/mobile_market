import { Access, CollectionConfig } from "payload/types";
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from "../../config";
import { User } from "../../payload-types";

const isAdmin =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;
    if (user) {
      return Boolean(user?.role === "admin");
    }
    return false;
  };

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    id: {
      equals: user.id,
    },
  };
};

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    hidden: !isAdmin(),
    useAsTitle: "Sản phẩm",
    description: "Các sản phẩm của bạn trên Tuấn Minh iStore.",
    defaultColumns: [
      "type",
      "name",
      "price",
      "totalAvailable",
      "productStatus",
    ],
  },
  access: {
    read: () => true,
    update: isAdmin(),
    delete: isAdmin(),
  },
  // hooks: {  },
  fields: [
    {
      name: "config_product",
      label: "Products",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "config_product",
      hasMany: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Tên sản phẩm",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Mô tả sản phẩm",
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
      name: "totalAvailable",
      label: "Số sản phẩm đang có sẵn",
      min: 0,
      max: 999999999999999,
      type: "number",
      required: true,
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
      },
    },
    {
      name: "type",
      label: "Tên thương hiệu, loại sản phẩm",
      type: "select",
      options: PRODUCT_TYPES.map(({ label, value }) => ({
        label,
        value,
      })),
      required: true,
    },
    {
      name: "category",
      label: "Danh mục",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
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
    {
      name: "productStatus",
      label: "Trạng thái sản phẩm",
      required: true,
      hasMany: false,
      type: "select",
      defaultValue: "selling",
      options: [
        {
          label: "Sale",
          value: "sale",
        },
        {
          label: "Đang bán",
          value: "selling",
        },
        {
          label: "Ngưng bán",
          value: "stopped",
        },
      ],
    },
    {
      name: "priceId",
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Hình ảnh minh họa cho sản phẩm",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
