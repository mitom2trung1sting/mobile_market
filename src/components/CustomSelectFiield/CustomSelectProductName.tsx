import { SelectInput, useField } from "payload/components/forms";
import * as React from "react";

export const CustomSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  // Fetch options on component mount
  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const resProduct = await fetch("http://localhost:3000/getListProducts");
        const data = await resProduct.json();

        const countryOptions = data.map((item: any) => {
          return {
            label: item.name,
            value: item.name,
          };
        });

        setOptions(countryOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <div>
      <label className="field-label">Chọn sản phẩm muốn cấu hình</label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  );
};
