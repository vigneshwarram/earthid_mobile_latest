import { isEmpty } from "lodash";
import { IInputValidationResult } from "../typings/IInputValidationResult";

const REGEX = {
  ADDRESS_LINE: /^[\\\\0-9a-zA-Z\\/, -]*$/,
  BUSINESS_NAME: /^[0-9a-zA-Z ]*$/,
  PINCODE: /(^\d{6}$)/,
};

export const nameValidator = (
  value: string,
  isRequired: boolean
): IInputValidationResult => {
  if (isEmpty(value) && isRequired) {
    return {
      hasError: true,
      errorMessage: "Please enter the Full Name",
    };
  }
  if (REGEX.ADDRESS_LINE.test(value)) {
    return { hasError: false, errorMessage: "" };
  } else {
    return {
      hasError: true,
      errorMessage: "Special characters are bot allowed",
    };
  }
};
