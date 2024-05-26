import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import SubProductPage from "@/components/SubProductPage";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    productId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { productId } = params;

  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      productStatus: {
        equals: "selling",
      },
    },
  });

  const [product] = products;

  const { docs: configProducts } = await payload.find({
    collection: "config_product",
    where: {
      productName: {
        equals: product?.id,
      },
    },
  });

  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validProduct = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  const validConfig = configProducts
    .map(({ product_files }) =>
      typeof product_files === "string" ? product_files : product_files.url
    )
    .filter(Boolean) as string[];

  const validUrls = [...validProduct, ...validConfig];

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <SubProductPage
            configProducts={configProducts}
            label={label!}
            product={product}
            validUrls={validUrls}
          />
        </div>
      </div>

      <ProductReel
        href="/products"
        query={{ category: product.category, limit: 4, type: product.type }}
        title={`Tương tự ${label}`}
        subtitle={`Một số sản phẩm khác tương tự ${label} '${product.name}'`}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
