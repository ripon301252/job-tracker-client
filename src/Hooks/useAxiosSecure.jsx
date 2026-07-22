import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api"
      : "https://job-tracker-server-2.onrender.com",
});



const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          const token = await currentUser.getIdToken(); // 🔥 FIX
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      }
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status; //  FIX

        if (statusCode === 401) {
          logOut().then(() => navigate("/login"));
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;