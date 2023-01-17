const config = {
  app: {
    appName: "Force One System - Members",
    appDescription: "Force One System - Members",
    appLogoImage: "/assets/images/logo/logo.png",
    API_URL: "http://localhost:8000/api",
    loginLabel: "Documento Identidad",
  },
  auth: {
    login: "/member-login",
    register: "/member-register",
    logout: "/member-logout",
    success: "/",
  },
  layout: {},
};

export default config;
