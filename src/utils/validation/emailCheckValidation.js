const validate = (values) => {
  let errors = {};

  if (!values.email?.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email?.trim())) {
    errors.email = 'Email address is invalid';
  }

  // if (isValidCaptch) {
  //   if (!values.password) {
  //     errors.password = 'Password is required';
  //   } else if (values.password?.length < 8) {
  //     errors.password = 'Password must be at least 8 characters';
  //   }
  // }

  return errors;
};

export default validate;
