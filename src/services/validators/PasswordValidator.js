export function validatePassword(password) {
  if (!password) return false;
  // special character
  if (!/[^A-Za-z0-9]/.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;

  return true;
}

export function orNull(validationFunction) {
  return (password) => {
    if (!password) return true;
    return validationFunction(password);
  };
}
