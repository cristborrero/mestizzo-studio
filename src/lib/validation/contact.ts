/**
 * Pure validation helpers for the contact form.
 */

export const isEmail = (v: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(v);
};

export const isPhone = (v: string): boolean => {
  // Allow empty as it's optional, but if present must be >= 7 digits
  if (!v) return true;
  const digitsOnly = v.replace(/[^0-9]/g, "");
  return digitsOnly.length >= 7;
};

export const minLen = (n: number) => (v: string): boolean => {
  return v.trim().length >= n;
};
