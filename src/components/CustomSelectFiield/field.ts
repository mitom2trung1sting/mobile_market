import { Field } from "payload/types";
import { CustomSelectComponent } from "./CustomSelectProductName";

export const CustomSelectField: Field = {
  name: "productName",
  type: "text",
  admin: {
    components: {
      Field: CustomSelectComponent,
    },
  },
};
