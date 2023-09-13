const validate = (values) => {
  let errors = {};

  if (!values.otp) {
    errors.otp = 'OTP is required';
  } else if (values.otp?.length > 6) {
    errors.otp = 'Enter valid OTP';
  }

  return errors;
};

export default validate;
