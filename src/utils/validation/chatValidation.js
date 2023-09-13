const validate = (values) => {
  let errors = {};

  if (!values.chatText?.trim()) {
    errors.chatText = 'Please give any input';
  }
  return errors;
};

export default validate;
