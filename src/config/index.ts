import { Option } from "payload/types";

export const PRODUCT_CATEGORIES = [
  {
    label: "Điện thoại",
    value: "phone" as const,
    featured: [
      {
        name: "Iphone",
        href: `/products?category=phone&sort=desc&type=iphone`,
        imageSrc: "/nav/phone/iphone.jpg",
      },
      {
        name: "Samsung",
        href: "/products?category=phone&sort=desc&type=samsung",
        imageSrc: "/nav/phone/samsung.jpg",
      },
      {
        name: "Xiaomi",
        href: "/products?category=phone&sort=desc&type=xiaomi",
        imageSrc: "/nav/phone/xiaomi.jpg",
      },
      {
        name: "Oppo",
        href: "/products?category=phone&sort=desc&type=oppo",
        imageSrc: "/nav/phone/oppo.jpg",
      },
      {
        name: "Vivo",
        href: "/products?category=phone&sort=desc&type=vivo",
        imageSrc: "/nav/phone/vivo.jpg",
      },
      {
        name: "Realme",
        href: "/products?category=phone&sort=desc&type=realme",
        imageSrc: "/nav/phone/realme.jpg",
      },
      {
        name: "Asus",
        href: "/products?category=phone&sort=desc&type=asus",
        imageSrc: "/nav/phone/asus.jpg",
      },
      {
        name: "Nokia",
        href: "/products?category=phone&sort=desc&type=nokia",
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
        href: `/products?category=tablet&sort=desc`,
        imageSrc: "/nav/tablet/ipad.jpg",
      },
      {
        name: "Xiaomi pad",
        href: "/products?category=tablet&sort=desc",
        imageSrc: "/nav/tablet/mipad.jpg",
      },
      {
        name: "Galaxy Tablet",
        href: "/products?category=tablet&sort=desc",
        imageSrc: "/nav/tablet/galaxypad.jpg",
      },
      {
        name: "Lenovo Tablet",
        href: "/products?category=tablet&sort=desc",
        imageSrc: "/nav/tablet/lenovopad.jpg",
      },
      {
        name: "Nokia Tablet",
        href: "/products?category=tablet&sort=desc",
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
        href: `/products?category=more&sort=desc&type=ears`,
        imageSrc: "/nav/more/ears.jpg",
      },
      {
        name: "Cáp, sạc",
        href: "/products?category=more&sort=desc&type=cable_charger",
        imageSrc: "/nav/more/cable_charger.jpg",
      },
      {
        name: "Sạc dự phòng",
        href: "/products?category=more&sort=desc&type=battery",
        imageSrc: "/nav/more/battery.jpg",
      },
    ],
  },
];

export const PRODUCT_TYPES = [
  {
    label: "Iphone",
    value: "iphone" as const,
  },
  {
    label: "Samsung",
    value: "samsung" as const,
  },
  {
    label: "Xiaomi",
    value: "xiaomi" as const,
  },
  {
    label: "Oppo",
    value: "oppo" as const,
  },
  {
    label: "Vivo",
    value: "vivo" as const,
  },
  {
    label: "Realme",
    value: "realme" as const,
  },
  {
    label: "Asus",
    value: "asus" as const,
  },
  {
    label: "Nokia",
    value: "nokia" as const,
  },
  {
    label: "Ipad",
    value: "ipad" as const,
  },
  {
    label: "Máy tính bảng Xiaomi",
    value: "xiaomi_pad" as const,
  },
  {
    label: "Máy tính bảng Galaxy",
    value: "galaxy_pad" as const,
  },
  {
    label: "Máy tính bảng Lenovo",
    value: "lenovo_pad" as const,
  },
  {
    label: "Máy tính bảng Nokia",
    value: "nokia_pad" as const,
  },
  {
    label: "Tai nghe",
    value: "ears" as const,
  },
  {
    label: "Cáp, sạc",
    value: "cable_charger" as const,
  },
  {
    label: "Sạc dự phòng",
    value: "battery" as const,
  },
];
