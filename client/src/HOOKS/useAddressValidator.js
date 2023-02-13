import React from "react";
import { useState } from "react";

// import validators
import VALID from "../HELPERS/Validators/Validator";

// upon submit set dirty true for all inputs => to validate all inputs.
const touchErrors = errors => {
  // acc = errors.obj
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useAddressValidator = form => {
  // error state
  const [errors, setErrors] = useState({
    fullAddress: {
      // each time hook runs => dirty = false
      dirty: false,
      error: false,
      message: "",
    },
  });

  // args: formData_obj, name of field to validate_str, errors_obj, force validate all inputs_boolean
  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      //
      nextErrors = touchErrors(errors);
    }

    const { fullAddress } = form;

    // name**
    if (nextErrors.fullAddress.dirty && (field ? field === "fullAddress" : true)) {

      const addressMsg = VALID.addressValidator(fullAddress);
      nextErrors.fullAddress.error = !!addressMsg;
      nextErrors.fullAddress.message = addressMsg;
      if (!!addressMsg) isValid = false;
    }

    

    

    setErrors(nextErrors);

    // return: isFieled valid => true/false, return: updated errors.
    return {
      isValid,
      errors: nextErrors,
    };
  };

  // on change of field this runs.
  const onBlurField = e => {
    // if: errors.field.dirty = false => set it to true => then it will be validated.
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    // update dirty => input was touched
    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    // input was touched -> validate form
    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};

export default useAddressValidator;


