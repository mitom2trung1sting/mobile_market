import { User } from "@/payload-types";
import { Access, CollectionConfig } from "payload/types";

const isAdmin =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;
    return Boolean(user?.role === "admin");
  };

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Đơn hàng của bạn",
    description: "Các đơn hàng của bạn trên Tuấn Minh iStore.",
  },
  access: {
    read: () => true,
    update: isAdmin(),
    delete: isAdmin(),
    create: isAdmin(),
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      access: {
        read: () => true,
        create: () => false,
        update: () => true,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      admin: {
        hidden: true,
      },
      relationTo: "users",
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
  ],
};
