import { User } from "../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;
  return { ...data, user: user?.id };
};

const isAdmin =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;
    if (user) {
      return Boolean(user?.role === "admin");
    }
    return false;
  };

export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: !isAdmin(),
  },
  hooks: {
    beforeChange: [addUser],
  },
  access: {
    read: () => true,
    update: isAdmin(),
    delete: isAdmin(),
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: ["image/*", "font/*", "application/postscript"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        condition: () => false,
      },
      hasMany: false,
      required: true,
    },
  ],
};
