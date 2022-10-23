/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 11:27:17 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { ComponentProps, FC } from "react";
import { useEffect, useState } from "react";

type FormFieldProps = ComponentProps<"input"> & {
  label?: string;
  onChange: (...args: any) => any;
  error?: string;
};

export const FormField: FC<FormFieldProps> = ({
  id,
  name,
  value,
  onChange,
  error,
  label,
  placeholder,
  type = "text",
}) => {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <div className="gap-2 flex flex-col">
      {label ? (
        <label htmlFor={id} className="font-mono font-medium capitalize dark:text-white">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        name={name}
        type={type}
        onChange={(e) => {
          onChange(e);
          setErrorText("");
        }}
        value={value}
        placeholder={placeholder}
        className="font-mono p-3 bg-white dark:bg-gray-900 dark:text-white outline-none"
      />
      {errorText ? <p className="font-mono text-red-400 text-sm">{errorText}</p> : null}
    </div>
  );
};
