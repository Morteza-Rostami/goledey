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

export const useUserSettingsValidator = form => {
  // error state
  const [errors, setErrors] = useState({
    name: {
      // each time hook runs => dirty = false
      dirty: false,
      error: false,
      message: "",
    },
    email: {
      // if: input is touchec or not.
      dirty: false,
      // if: there is an error or not
      error: false,
      // the message of the error
      message: "",
    },
    creditCard: {
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

    const { name, email, creditCard } = form;

    // name**
    if (nextErrors.name.dirty && (field ? field === "name" : true)) {

      const nameMessage = VALID.nameValidator(name);
      nextErrors.name.error = !!nameMessage;
      nextErrors.name.message = nameMessage;
      if (!!nameMessage) isValid = false;
    }

    // email**
    // if: user intrected with field and arg.field === email
    if (nextErrors.email.dirty && (field ? field === "email" : true)) {
      console.log('email valid: ', email);
      const emailMessage = VALID.emailValidator(email);
      // if: there is a error "message" boolean
      nextErrors.email.error = !!emailMessage;
      // if: the email message
      nextErrors.email.message = emailMessage;
      // if: there is email message => input_valid = false
      if (!!emailMessage) isValid = false;
    }

    if (nextErrors.creditCard.dirty && (field ? field === "creditCard" : true)) {
      const creditCardMessage = VALID.creditCardValidator(creditCard);
      nextErrors.creditCard.error = !!creditCardMessage;
      nextErrors.creditCard.message = creditCardMessage;
      if (!!creditCardMessage) isValid = false;
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

export default useUserSettingsValidator;


/* 

if (
      nextErrors.confirmPassword.dirty &&
      (field ? field === "confirmPassword" : true)
    ) {
      const confirmPasswordMessage = confirmPasswordValidator(
        confirmPassword,
        form
      );
      nextErrors.confirmPassword.error = !!confirmPasswordMessage;
      nextErrors.confirmPassword.message = confirmPasswordMessage;
      if (!!confirmPasswordMessage) isValid = false;
    }

*/