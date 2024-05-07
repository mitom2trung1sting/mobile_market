"use client";

import React from "react";
import { Button } from "./ui/button";

const ButtonScrollDown = ({ title }: { title: string }) => {
  const scrollToBottom = (): void => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <Button variant="ghost" onClick={scrollToBottom}>
      {title}
    </Button>
  );
};

export default ButtonScrollDown;
