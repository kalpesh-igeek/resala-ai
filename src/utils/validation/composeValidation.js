const validate = (values) => {
  let errors = {};

  if (!values.input_text?.trim()) {
    errors.input_text = 'Give any input';
  }

  return errors;
};

export default validate;
