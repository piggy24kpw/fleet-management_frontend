import { authOptions } from "@/config/AuthOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const noAuthAxios = axios.create({
    baseURL: process.env.BASE_URL + "/api/"
})


export const authAxios = axios.create({
    baseURL: process.env.BASE_URL + "/api/",
})

authAxios.interceptors.request.use(async (config) => {
    const session = await getServerSession(authOptions)
    if ( session ){
        console.log("request header")
        config.headers.Authorization = "Bearer " + session.user.accessToken
    }
    return config
})


authAxios.interceptors.response.use(async (response) => {
    return response
}, (error) => {
    console.log(error.response, 'error............')
    if(error?.response?.status == 401){
        redirect("/signout")
    }
    return error
})
