const validate = (values) => {
  let errors = {};

  if (!values.phone_number?.trim()) {
    errors.phone_number = 'Phone number is required';
  } else if (values.phone_number??.length >= 11) {
    errors.phone_number = 'Enter valid phone number';
  }

  return errors;
};

export default validate;
