export const formatError = (error) => {
  const cleaned = error
    .replace("Firebase:", "")
    .replace("auth/", "")
    .replace(/[:\-()]/g, " ")
    .trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
