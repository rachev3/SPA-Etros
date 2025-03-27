const parseDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

export const formatLongDate = (dateString) => {
  const date = parseDate(dateString);
  if (!date) return "Invalid Date";

  const options = { year: "numeric", month: "long", day: "numeric" };
  try {
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    return "Invalid Date";
  }
};

export const formatTime = (dateString) => {
  const date = parseDate(dateString);
  if (!date) return "Invalid Date";

  const options = { hour: "numeric", minute: "numeric", hour12: true };
  try {
    return date.toLocaleTimeString(undefined, options);
  } catch (error) {
    return "Invalid Date";
  }
};

export const formatDateTime = (dateString) => {
  const date = parseDate(dateString);
  if (!date) return "Invalid Date";

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  try {
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    return "Invalid Date";
  }
};

export const formatShortDate = (dateString) => {
  const date = parseDate(dateString);
  if (!date) return "Invalid Date";

  const options = { year: "numeric", month: "short", day: "numeric" };
  try {
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    return "Invalid Date";
  }
};
