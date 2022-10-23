/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 15:39:04 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import type { LoginForm, RegisterForm } from "./types.server";
import bcrypt from "bcrypt";
import { createUser } from "~/controllers/user.server";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("please set SESSION_SECRET in environment variable");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "remix-boilerplate-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // seconds
    httpOnly: true,
  },
});

export async function register(form: RegisterForm) {
  const exists = await prisma.user.count({
    where: {
      email: form.email,
    },
  });

  if (exists) {
    return json(
      { error: `An user already exists with ${form.email}` },
      {
        status: 400,
      }
    );
  }

  const newUser = await createUser(form);

  if (!newUser) {
    return json(
      {
        error: `Something went wrong trying to create a new user`,
        fields: {
          email: form.email,
          password: form.password,
          name: form.name,
        },
      },
      {
        status: 500,
      }
    );
  }

  return createUserSession(newUser.id, "/");
}

export async function login(form: LoginForm) {
  const user = await prisma.user.findUnique({
    where: {
      email: form.email,
    },
  });

  // user not found with the given email
  if (!user) {
    return json(
      { error: `No user exists with ${form.email}` },
      { status: 404 }
    );
  }

  // compare the password
  const isPasswordOk = await bcrypt.compare(form.password, user.password);

  // if password hash don't match
  if (!isPasswordOk) {
    return json(
      {
        error: `Wrong password`,
        fields: { email: form.email, password: form.password },
      },
      { status: 401 }
    );
  }

  return createUserSession(user.id, user.role === "admin" ? "/admin" : "/");
}

export const createUserSession = async (userId: string, redirectTo: string) => {
  // create a new session form the storage bucket
  const session = await storage.getSession();
  // set the session to the user id
  session.set("userId", userId);
  // redirect the user with set-cookie header to save the session in the browser
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};
