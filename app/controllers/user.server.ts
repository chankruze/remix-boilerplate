/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 06:06:18 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { RegisterForm } from "~/utils/types.server";
import prisma from "~/lib/prisma.server";
import bcrypt from "bcrypt";

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

export const createUser = async (user: RegisterForm) => {
  // hash the password
  const passwordHash = await bcrypt.hash(user.password, 12);

  // create a new user
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      role: user.role,
      profile: {
        create: {
          name: user.name,
        },
      },
    },
  });

  return newUser;
};
