export const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const baseURL = apiURL + "/" + process.env.NEXT_PUBLIC_API_SUFFIX;

export const sessionCookieName =
  process.env.NEXT_PUBLIC_API_SESSION_COOKIE_NAME || "";

export const locales = ["lt"];
