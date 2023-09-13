const validate = (values) => {
  let errors = {};

  if (!values.input_text?.trim()) {
    errors.input_text = 'Please provide original text';
  }
  if (!values.reply?.trim()) {
    errors.reply = 'Please provide what you need reply';
  }

  return errors;
};

export default validate;
