/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Oct 22 2022 11:34:01 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { FC } from "react";

type TechCardProps = {
  title: string;
  src: string;
  alt: string;
};

export const TechCard: FC<TechCardProps> = ({ title, src, alt }) => {
  return (
    <div className="flex flex-col bg-gray-800">
      <div className="mx-auto flex-1 sm:w-48 p-4 flex justify-center items-center bg-gray-800">
        <img src={src} alt={alt} className="object-cover" />
      </div>
      <p className="p-3 capitalize bg-gray-700 text-center">{title}</p>
    </div>
  );
};
