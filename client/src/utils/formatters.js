export const formatPersonName = (value) => value
  .replace(/\s+/g, " ")
  .replace(/(^|\s)([a-zà-öø-ÿ])/g, (_, space, char) => `${space}${char.toUpperCase()}`);

export const formatProgramme = (value) => value
  .replace(/\s+/g, " ")
  .trim()
  .replace(/\b([a-zà-öø-ÿ])/g, (_, char) => char.toUpperCase());
