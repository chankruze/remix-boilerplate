/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Oct 22 2022 16:25:22 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const admin: Prisma.UserCreateInput = {
  email: "admin@geekofia.io",
  password: "$2a$12$SMjX2n1ao/KedFEUwXNgeev2/czrawD3jJuf5vp/M.Hp3Rwm4UgsG", // admin
  role: "admin",
};

async function main() {
  // remove the adimin user if exists
  await prisma.user
    .delete({
      where: {
        email: admin.email,
      },
    })
    .catch(() => {
      console.log(`admin doesn't exist`);
    });

  // create the admin user
  const result = await prisma.user.create({
    data: admin,
  });

  console.log(result);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
