/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 11:56:44 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import classNames from "classnames";
import type { ComponentProps, FC } from "react";

type FormSubmitProps = ComponentProps<"button"> & {
  text: string;
};

export const FormSubmit: FC<FormSubmitProps> = ({ text, ...props }) => {
  return (
    <button
      type="submit"
      className={classNames(
        "border-0 outline-0 py-3 px-6 w-full capitalize  text-lg font-mono",
        "bg-blue-600 text-white hover:bg-blue-600/80 duration-150"
      )}
      {...props}
    >
      {text}
    </button>
  );
};
