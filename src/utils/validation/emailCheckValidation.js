const validate = (values) => {
  let errors = {};

  if (!values.email?.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(values.email?.trim())) {
    errors.email = 'Email address is invalid';
  }
  return errors;
};

export default validate;
