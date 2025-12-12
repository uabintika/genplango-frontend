export const ROUTES = {
  AUTH: {
    LOGIN: "/admin/login",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PROFILE: "/admin/profile",
    SERVICE_RECIPIENTS: {
      INDEX: "/admin/service-recipients",
      CREATE: "/admin/service-recipients/create",
      UPDATE: (id: number) => `/admin/service-recipients/edit/${id}`,
    },
    WORKERS: {
      INDEX: "/admin/workers",
      CREATE: "/admin/workers/create",
      UPDATE: (id: number) => `/admin/workers/edit/${id}`,
    },
    USERS: {
      INDEX: "/admin/users",
      CREATE: "/admin/users/create",
      UPDATE: (id: number) => `/admin/users/edit/${id}`,
    },
    MUNICIPALITIES: {
      INDEX: "/admin/municipalities",
      CREATE: "/admin/municipalities/create",
      UPDATE: (id: number) => `/admin/municipalities/edit/${id}`,
    },
    KINSHIP_RELATIONS: {
      INDEX: "/admin/kinship-relations",
    },
    METHODOLOGY_AREAS: {
      INDEX: "/admin/methodology-areas",
    },
  },
};
