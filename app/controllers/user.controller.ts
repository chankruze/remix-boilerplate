/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 06:06:18 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import prisma from "~/lib/prisma.server";

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const countAllUsers = async () => {
  return await prisma.user.count();
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
