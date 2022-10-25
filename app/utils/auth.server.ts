/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 15:39:04 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { LoginForm, RegisterForm } from "./types.server";
import bcrypt from "bcrypt";
import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { createUser, getUserById } from "~/controllers/user.server";

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

// get the user session from the cookie header
const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get("Cookie"));
};

// get the user id from local storage
const getUserId = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
};

// check for userId
export async function requireRole(
  request: Request,
  roles: string[],
  redirectTo: string = new URL(request.url).pathname
) {
  const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
  const userId = await getUserId(request);

  if (!userId) {
    throw redirect(`/auth/login?${searchParams}`);
  }

  try {
    // get the user data from db
    const user = await getUserById(userId);
    // if user found
    if (user) {
      if (roles.includes(user.role)) {
        return user;
      }

      return redirect(`/auth/login?${searchParams}`);
    }

    return redirect(`/auth/login?${searchParams}`);
  } catch (error) {
    console.log(error);
    // if error happens logout
    throw logout(request);
  }
}

// // get the user data from db
export async function getUser(request: Request) {
  const userId = await getUserId(request);
  // if no userId found return null
  if (!userId) return null;

  try {
    // get the user data from db
    const user = await getUserById(userId);
    return user;
  } catch (error) {
    // if error happens logout
    throw logout(request);
  }
}

// logout function to clear the session cookie
export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
