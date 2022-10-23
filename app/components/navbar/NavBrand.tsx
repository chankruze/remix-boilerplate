/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Oct 22 2022 18:54:42 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { Link } from "@remix-run/react";
import type { FC } from "react";
import { SiPhpmyadmin } from "react-icons/si";
import { APP_NAME } from "../../config";

type Props = {
  iconOnly?: boolean;
};

export const NavBrand: FC<Props> = ({ iconOnly }) => {
  if (iconOnly) {
    return (
      <div className="w-full flex justify-center items-center p-2 dark:text-white dark:bg-blue-600">
        <Link to="/">
          <SiPhpmyadmin size={48} />
        </Link>
      </div>
    );
  }

  return (
    <Link to="/">
      <span className="self-center whitespace-nowrap text-2xl sm:text-3xl dark:text-amber-400 font-montserrat font-bold uppercase">
        {APP_NAME}
      </span>
    </Link>
  );
};
