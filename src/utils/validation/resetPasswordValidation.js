const validate = (values) => {
  let errors = {};

  if (!values.password?.trim()) {
    errors.password = 'Password is required';
  } else if (values.password?.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  }

  if (!values.re_password?.trim()) {
    errors.re_password = 'Confirm password is required';
  } else if (values.re_password?.length < 8) {
    errors.re_password = 'Password must be 8 or more characters';
  }

  if (values.re_password !== values.password) {
    errors.re_password = 'Password and confirm password do not match';
  }

  return errors;
};

export default validate;
