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
    UPDATE: (id: number) => `/service-recipients/${id}`,
    GET: (id: number) => `/service-recipients/${id}`,
    FOR_SELECT: "/service-recipients/allowed",
    CONTACTS: {
      INDEX: (srID: number) => `/service-recipients/${srID}/contacts`,
      CREATE: (srID: number) => `/service-recipients/${srID}/contacts`,
      UPDATE: (srID: number, contactID: number) =>
        `/service-recipients/${srID}/contacts/${contactID}`,
      DELETE: (srID: number, contactID: number) =>
        `/service-recipients/${srID}/contacts/${contactID}`,
    },
    NOTES: {
      INDEX: (srID: number) => `/service-recipients/${srID}/notes`,
      CREATE: (srID: number) => `/service-recipients/${srID}/notes`,
      UPDATE: (srID: number, noteID: number) =>
        `/service-recipients/${srID}/notes/${noteID}`,
      DELETE: (srID: number, noteID: number) =>
        `/service-recipients/${srID}/notes/${noteID}`,
    },
  },
  MUNICIPALITIES: {
    INDEX: "/municipalities",
    FOR_SELECT: "/municipalities/allowed",
    PERMISSIONS: "/municipalities/permissions",
  },
  KINSHIP_RELATIONS: {
    INDEX: "/kinship-relations",
    FOR_SELECT: "/kinship-relations/allowed",
  },
  USERS: {
    INDEX: "/users",
    CREATE: "/users",
    UPDATE: (id: number) => `/users/${id}`,
    GET: (id: number) => `/users/${id}`,
    FOR_SELECT: "/users/allowed",
    PERMISSIONS: {
      GET: (id: number) => `/users/${id}/permissions`,
      UPDATE: (id: number) => `/users/${id}/permissions`,
    },
  },
  WORKERS: {
    INDEX: "/workers",
    CREATE: "/workers",
    UPDATE: (id: number) => `/workers/${id}`,
    GET: (id: number) => `/workers/${id}`,
    FOR_SELECT: "/workers/allowed",
  },
};
