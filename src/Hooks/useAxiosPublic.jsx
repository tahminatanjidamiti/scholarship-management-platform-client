import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://my-twelfth-assignment-server-umber.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;