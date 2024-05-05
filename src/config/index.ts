export const PRODUCT_CATEGORIES = [
  {
    label: "Điện thoại",
    value: "phone" as const,
    featured: [
      {
        name: "Iphone",
        href: `/products?category=phone`,
        imageSrc: "/nav/phone/iphone.jpg",
      },
      {
        name: "Samsung",
        href: "/products?category=phone&sort=desc",
        imageSrc: "/nav/phone/samsung.jpg",
      },
      {
        name: "Xiaomi",
        href: "/products?category=phone",
        imageSrc: "/nav/phone/xiaomi.jpg",
      },
      {
        name: "Oppo",
        href: "/products?category=phone",
        imageSrc: "/nav/phone/oppo.jpg",
      },
      {
        name: "Vivo",
        href: "/products?category=phone",
        imageSrc: "/nav/phone/vivo.jpg",
      },
      {
        name: "Realme",
        href: "/products?category=phone",
        imageSrc: "/nav/phone/realme.jpg",
      },
      {
        name: "Asus",
        href: "/products?category=phone",
        imageSrc: "/nav/phone/asus.jpg",
      },
      {
        name: "Nokia",
        href: "/products?category=phone",
        imageSrc: "/nav/phone/nokia.jpg",
      },
    ],
  },
  {
    label: "Máy tính bảng",
    value: "tablet" as const,
    featured: [
      {
        name: "Ipad",
        href: `/products?category=tablet`,
        imageSrc: "/nav/tablet/ipad.jpg",
      },
      {
        name: "Xiaomi pad",
        href: "/products?category=tablet&sort=desc",
        imageSrc: "/nav/tablet/mipad.jpg",
      },
      {
        name: "Galaxy Tablet",
        href: "/products?category=tablet",
        imageSrc: "/nav/tablet/galaxypad.jpg",
      },
      {
        name: "Lenovo Tablet",
        href: "/products?category=tablet",
        imageSrc: "/nav/tablet/lenovopad.jpg",
      },
      {
        name: "Nokia Tablet",
        href: "/products?category=tablet",
        imageSrc: "/nav/tablet/nokiapad.jpg",
      },
    ],
  },
  {
    label: "Phụ kiện",
    value: "more" as const,
    featured: [
      {
        name: "Tai nghe",
        href: `/products?category=more`,
        imageSrc: "/nav/more/ears.jpg",
      },
      {
        name: "Cáp, sạc",
        href: "/products?category=more&sort=desc",
        imageSrc: "/nav/more/battery.jpg",
      },
      {
        name: "Sạc dự phòng",
        href: "/products?category=more",
        imageSrc: "/nav/more/charger.jpg",
      },
    ],
  },
];
