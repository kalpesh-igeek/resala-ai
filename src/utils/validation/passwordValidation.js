const validate = (values) => {
  let errors = {};

  if (!values.password?.trim()) {
    errors.password = 'Password is required';
  } else if (values.password?.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  }

  return errors;
};

export default validate;
