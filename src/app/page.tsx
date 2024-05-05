import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { PackageOpen, CheckCircle, Truck, PhoneCall } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Sản phẩm đa dạng",
    Icon: PackageOpen,
    description:
      "Chúng tôi cung cấp một loạt các mẫu điện thoại thông minh, phù hợp với mọi nhu cầu và ngân sách.",
  },
  {
    name: "Chất lượng đảm bảo",
    Icon: CheckCircle,
    description:
      "Tất cả sản phẩm của chúng tôi đều được kiểm định kỹ lưỡng để đảm bảo chất lượng.",
  },
  {
    name: "Giao hàng nhanh chóng",
    Icon: Truck,
    description:
      "Chúng tôi cung cấp dịch vụ giao hàng nhanh chóng và an toàn trên toàn quốc.",
  },
  {
    name: "Hỗ trợ khách hàng tận tâm",
    Icon: PhoneCall,
    description:
      " Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn lòng giúp đỡ bạn với bất kỳ câu hỏi hoặc vấn đề nào.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <div className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            <span className="text-blue-600">Tuấn Minh iStore</span>
            <div>Thế giới của công nghệ di động.</div>
          </div>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Tuấn Minh iStore là nơi bạn có thể tìm thấy những chiếc điện thoại
            thông minh mới nhất từ các thương hiệu hàng đầu trên thế giới. Chúng
            tôi cung cấp một loạt các sản phẩm từ các nhà sản xuất như Apple,
            Samsung, Xiaomi, và nhiều hơn nữa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Sản phẩm nổi bật
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>

        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          href="/products?sort=recent"
          title="Sản phẩm vừa mới ra mắt"
        />
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
