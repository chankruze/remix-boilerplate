/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 12:24:13 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as Yup from "yup";

type FormDataJSON = {
  [key: string]: any;
};

export const formToJSON = (formData: FormData): FormDataJSON => {
  return Object.fromEntries(formData);
};

const getValidationErrors = (err: Yup.ValidationError) => {
  const validationErrors: {
    [key: string]: string;
  } = {};

  err.inner.forEach((error: any) => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });

  return validationErrors;
};

export const validateForm = async (
  formData: FormData,
  validationSchema: Yup.AnyObjectSchema
) => {
  try {
    // convert the form data to JSON
    const data: FormDataJSON = formToJSON(formData);
    // validate the JSON object against the Yup schema
    const result = await validationSchema.validate(data, {
      abortEarly: false,
    });
    // return result
    return result;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw getValidationErrors(error);
    }
    throw error;
  }
};
