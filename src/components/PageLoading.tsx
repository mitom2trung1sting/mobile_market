import React from "react";
import loadingGif from "../../public/gif/loading.gif";
import Image from "next/image";

const PageLoading = () => {
  return (
    <div className="flex w-full justify-center mt-14">
      <Image
        alt="Loading"
        src={loadingGif}
        width={400}
        height={500}
        className="ml-28"
      />
    </div>
  );
};

export default PageLoading;
