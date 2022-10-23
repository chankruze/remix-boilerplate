/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 10:54:58 GMT+0530 (India Standard Time)

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
import { login } from "~/utils/auth.server";
import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string().email("Not a valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // validate form
  try {
    const result = await validateForm(formData, schema);
    return await login(result);
  } catch (errors) {
    return json({ errors }, { status: 400 });
  }
};

export default function Login() {
  const actionData = useActionData();
  const { state } = useTransition();
  const busy = state === "submitting";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center space-y-4">
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
        {/* email */}
        <FormField
          label="email"
          id="email"
          name="email"
          type="email"
          onChange={handleInputChange}
          value={formData.email}
          error={actionData?.errors?.["email"]}
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
        />
        <FormSubmit text={busy ? "Verifying..." : "Login"} disabled={busy} />
      </Form>
    </div>
  );
}
