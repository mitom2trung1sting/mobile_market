import { User } from "@/payload-types";
import { PrimaryActionEmailHtml } from "../components/emails/PrimaryActionEmail";
import { Access, CollectionConfig } from "payload/types";

const isAdmin =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;
    if (user) {
      return Boolean(user?.role === "admin");
    }
    return false;
  };

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "Xác minh tài khoản của bạn",
          buttonText: "Xác minh",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
        });
      },
    },
  },
  access: {
    read: isAdmin(),
    create: () => true,
    update: isAdmin(),
    delete: isAdmin(),
  },
  admin: {
    hidden: !isAdmin(),
    defaultColumns: ["email", "role", "created_at"],
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
      hasMany: true,
    },
    {
      name: "product_files",
      label: "Product files",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "product_files",
      hasMany: true,
    },
    {
      name: "role",
      defaultValue: "user",
      required: true,
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ],
};
