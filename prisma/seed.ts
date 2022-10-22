/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Oct 22 2022 16:25:22 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "john.doe@mes.com",
    password: "$2a$12$M.DPr3ktx3YTA1//byp9ieo.nr.cYsh7hGdt38T/5y5DaKLP6dhDu", // 123
    role: "admin",
  },
  {
    email: "jane.doe@mes.com",
    password: "$2a$12$M.DPr3ktx3YTA1//byp9ieo.nr.cYsh7hGdt38T/5y5DaKLP6dhDu", // 123
    role: "user",
  },
];

async function main() {
  // cleanup the db
  await prisma.user
    .deleteMany({
      where: {
        email: {
          in: userData.map((u) => u.email),
        },
      },
    })
    .catch(() => {
      console.log(`user(s) doesn't exist`);
    });

  // enter the user data
  for (const user of userData) {
    const result = await prisma.user.create({
      data: user,
    });

    console.log(result);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
