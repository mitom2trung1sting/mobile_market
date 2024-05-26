import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from "../../config";
import { Product, User } from "../../payload-types";

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
  const user = req.user;

  return { ...data, user: user.id };
};

// const syncUser: AfterChangeHook<Product> = async ({ req, doc }) => {

//     await req.payload.update({
//       collection: "configProduct",
//       id: fullUser.id,
//       data: {
//         products: dataToUpdate,
//       },
//     });
//   }
// };

const isAdmin =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;
    if (user) {
      return Boolean(user?.role === "admin");
    }
    return false;
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
    read: isAdmin(),
    update: isAdmin(),
    delete: isAdmin(),
  },
  hooks: {
    beforeChange: [addUser],
  },
  // hooks: {
  //   afterChange: [syncUser],
  //   beforeChange: [
  //     addUser,
  //     async (args) => {
  //       if (args.operation === "create") {
  //         const data = args.data as Product;

  //         const createdProduct = await stripe.products.create({
  //           name: data.name,
  //           default_price_data: {
  //             currency: "VND",
  //             unit_amount: Math.round(data.price * 100),
  //           },
  //         });

  //         const updated: Product = {
  //           ...data,
  //           stripeId: createdProduct.id,
  //           priceId: createdProduct.default_price as string,
  //         };

  //         return updated;
  //       } else if (args.operation === "update") {
  //         const data = args.data as Product;

  //         const updatedProduct = await stripe.products.update(data.stripeId!, {
  //           name: data.name,
  //           default_price: data.priceId!,
  //         });

  //         const updated: Product = {
  //           ...data,
  //           stripeId: updatedProduct.id,
  //           priceId: updatedProduct.default_price as string,
  //         };

  //         return updated;
  //       }
  //     },
  //   ],
  // },
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
