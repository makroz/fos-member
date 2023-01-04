// Logo Import
import logo from "../public/assets/images/logo/logo.png";

// You can customize the template with the help of this file

//Template config options
const config = {
  app: {
    appName: "Force One System - Members",
    appDescription: "Force One System - Members",
    appLogoImage: logo,
    API_URL: "http://localhost:8000/api",
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
