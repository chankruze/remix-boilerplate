/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 11:24:32 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { ActionFunction } from "@remix-run/node";
import type { ChangeEvent } from "react";
import { json } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { useState } from "react";
import { FormField } from "~/components/form/FormField";
import { FormSubmit } from "~/components/form/FormSubmit";
import { validateForm } from "~/utils/form.server";
import * as Yup from "yup";
import { register } from "~/utils/auth.server";

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Not a valid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .required("Password is required"),
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  try {
    // validate form
    const result = await validateForm(formData, schema);
    // if all valid, trigger registration function
    // if it's a success, redirect the user based on role
    return register(result);
  } catch (errors) {
    // return error to render in the components
    return json({ errors }, { status: 400 });
  }
};

export default function Register() {
  // get the form data
  const actionData = useActionData();
  // get the state of the component
  const { state } = useTransition();
  const busy = state === "submitting";
  // state for controlled input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  // onChange handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex-1 flex flex-col justify-center">
      <Form
        method="post"
        className="p-8 bg-black w-full sm:w-[400px] mx-auto space-y-4"
      >
        {/* form error message */}
        {typeof actionData?.error === "string" ? (
          <p className="p-4 text-center text-red-300 bg-red-900/50 font-mono">
            {actionData?.error}
          </p>
        ) : null}
        {/* name */}
        <FormField
          label="name"
          id="name"
          name="name"
          onChange={handleInputChange}
          value={formData.name}
          error={actionData?.errors?.["name"]}
          placeholder="John Doe"
        />
        {/* email */}
        <FormField
          label="email"
          id="email"
          name="email"
          type="email"
          onChange={handleInputChange}
          value={formData.email}
          error={actionData?.errors?.["email"]}
          placeholder="john@example.com"
        />
        {/* password */}
        <FormField
          label="password"
          id="password"
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formData.password}
          error={actionData?.errors?.["password"]}
          placeholder="secret@123"
        />
        {/* submit button */}
        <FormSubmit text={busy ? "Creating..." : "Register"} disabled={busy} />
      </Form>
    </div>
  );
}
