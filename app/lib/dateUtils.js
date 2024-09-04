// dateUtils.js

const convertToLocalTime = (date, timeZone = 'Asia/Kolkata') => {
  return new Date(date.toLocaleString('en-US', { timeZone }));
};

export const getStartOfWeek = () => {
  const now = convertToLocalTime(new Date());
  const startOfWeek = now.getDate() - now.getDay(); // Get the start of the week
  return new Date(now.setDate(startOfWeek));
};

export const getEndOfWeek = () => {
  const now = convertToLocalTime(new Date());
  const endOfWeek = now.getDate() - now.getDay() + 6; // Get the end of the week
  return new Date(now.setDate(endOfWeek));
};

export const getStartOfDay = () => {
  const now = convertToLocalTime(new Date());
  return new Date(now.setHours(0, 0, 0, 0)); // Start of today
};

export const getEndOfDay = () => {
  const now = convertToLocalTime(new Date());
  return new Date(now.setHours(23, 59, 59, 999)); // End of today
};

export const getStartOfMonth = () => {
  const now = convertToLocalTime(new Date());
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

export const getEndOfMonth = () => {
  const now = convertToLocalTime(new Date());
  return new Date(now.getFullYear(), now.getMonth() + 1, 0);
};
