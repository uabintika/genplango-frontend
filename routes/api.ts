export const API_ROUTES = {
  AUTH: {
    CSRF: "/sanctum/csrf-cookie",
    LOGIN: "/login",
    LOGOUT: "/logout",
    CURRENT_USER: "/users/me",
  },
  SERVICE_RECIPIENTS: {
    INDEX: "/service-recipients",
    RELATIVES: "/service-recipients/relatives",
    CREATE: "/service-recipients",
  },
  MUNICIPALITIES: {
    INDEX: "/municipalities",
    FOR_SELECT: "/municipalities/allowed",
  },
  KINSHIP_RELATIONS: {
    INDEX: "/kinship-relations",
    FOR_SELECT: "/kinship-relations/allowed",
  },
  USERS: {
    FOR_SELECT: "/users/allowed",
  },
  WORKERS: {
    FOR_SELECT: "/workers/allowed",
  },
};
