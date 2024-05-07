import Image from "next/image";
import icon from "../../public/favicon.png";

export const Icons = ({ className }: { className?: any }) => {
  return (
    <Image
      alt="icon"
      src={icon}
      width={1028}
      height={1028}
      className={className}
    />
  );
};
