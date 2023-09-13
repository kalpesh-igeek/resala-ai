const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = 'Prompt title is required';
  }
  if (!values.prompt) {
    errors.prompt = 'Prompt is required';
  }

  return errors;
};

export default validate;
