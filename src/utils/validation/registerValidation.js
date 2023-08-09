const validate = (values) => {
  let errors = {};

  if (!/^[A-Za-z0-9]+$/.test(values.first_name?.trim())) {
    errors.first_name = 'First name should only contain alphanumeric characters';
  }
  if (!/^[A-Za-z0-9]+$/.test(values.last_name?.trim())) {
    errors.last_name = 'Last name should only contain alphanumeric characters';
  }

  return errors;
};

export default validate;
