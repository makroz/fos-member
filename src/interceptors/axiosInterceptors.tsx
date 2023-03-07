import { useRouter } from "next/router";

const axiosInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      let apiToken = null;
      try {
        apiToken = JSON.parse(localStorage.getItem("token") + "").token;
      } catch (e) {
        apiToken = null;
      }

      if (apiToken) {
        config.headers = {
          Authorization: "Bearer " + apiToken,
          accept: "application/json",
        };
      }

      // console.log("Request was sent");
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      console.error("Network error:", error);
      return Promise.reject(error);
    }
  );
};

export default axiosInterceptors;
