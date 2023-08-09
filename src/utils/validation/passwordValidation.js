const validate = (values) => {
  let errors = {};

  if (!values.password?.trim()) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  }
  // else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/.test(values.password)) {
  //   errors.password =
  //     'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
  // }

  return errors;
};

export default validate;
