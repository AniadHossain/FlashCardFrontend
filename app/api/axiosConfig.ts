import axios from "axios";

export default axios.create({
    baseURL:"http://35.178.153.32",
    headers:{
        "Content-type":"application/json"
    }
})

export const axiosAuth = axios.create({
    baseURL:"http://35.178.153.32",
    headers:{
        "Content-type":"application/json"
    }
})