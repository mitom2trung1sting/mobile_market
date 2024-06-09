import { buildConfig } from "payload/config";
// import { webpackBundler } from "@payloadcms/bundler-webpack";
import { viteBundler } from "@payloadcms/bundler-vite";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";
import { ProductFiles } from "./collections/ProductFile";
import { Orders } from "./collections/Orders";
import { ConfigProduct } from "./collections/ConfigProduct";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Products, Media, ProductFiles, Orders, ConfigProduct],
  routes: {
    admin: "/admin",
  },
  admin: {
    user: "users",
    bundler: viteBundler(),
    meta: {
      titleSuffix: "- Admin",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
    components: {},
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!.replace(/\s+/g, ""),
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
