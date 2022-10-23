/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 06:33:12 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { FC } from "react";
import classNames from "classnames";

type StatsCardProps = {
  title: string;
  count?: number;
  isLoading?: boolean;
  color?: string;
  bg?: string;
};

export const StatsCard: FC<StatsCardProps> = ({
  title,
  count,
  isLoading,
  color,
  bg,
}) => {
  return (
    <div
      className={classNames("p-6 flex flex-col rounded", {
        "bg-gradient-to-bl from-blue-500 to-transparent": !bg,
        bg: bg,
      })}
    >
      <div className={`text-6xl font-bold ${color ? color : "text-white"}`}>
        {isLoading ? <p className="animate-bounce">...</p> : count}
      </div>
      <p className="capitalize text-lg pt-2 font-medium text-blue-100">
        {title}
      </p>
    </div>
  );
};
