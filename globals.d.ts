/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Oct 22 2022 16:31:02 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var prisma: PrismaClient;
}

export {};
