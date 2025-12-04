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
  },
};
