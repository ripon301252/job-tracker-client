import axios from "axios";

const axiosPublic = axios.create({
    baseURL:
    import.meta.env.MODE === "development"
      ? "/api"
      : "https://job-tracker-server-2.onrender.com",
});

const useAxiosNormal = () => {
    return axiosPublic;
};

export default useAxiosNormal


