import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "/api", // proxy
});

const useAxiosNormal = () => {
    return axiosPublic;
};

export default useAxiosNormal


