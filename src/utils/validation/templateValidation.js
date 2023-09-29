const validate = (values) => {
  let errors = {};

  if (!values.templatename?.trim()) {
    errors.templatename = 'OTP is required';
  }

  return errors;
};

export default validate;
