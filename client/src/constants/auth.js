export const passwordRules = [
  { key: "length", label: "At least 8 characters", test: value => value.length >= 8 },
  { key: "uppercase", label: "At least one uppercase letter", test: value => /[A-Z]/.test(value) },
  { key: "number", label: "At least one number", test: value => /\d/.test(value) },
  { key: "symbol", label: "At least one symbol", test: value => /[^A-Za-z0-9]/.test(value) }
];
