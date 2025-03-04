import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";
import {volunteer}  from "../types/volunteer.schema"
import { AxiosError } from "axios";
const registerVolunteer= async(volunteerData:volunteer):Promise<any>=>{
  return new Promise((resolve,reject)=>{
    setTimeout(async()=>{
        try {
            const response= await api.post('api/volunteers/create',volunteerData);
            resolve(response.data)
        } catch (error) {
            reject(error)
        }
    },2000)
  })

}

const queryVolunteers=async()=>{
    const response= await api.get("/api/volunteers");
    return response.data.data;
} 

 export const useVolunteersQuery=()=>{
    return useQuery({
    queryKey:["users"],
    queryFn:queryVolunteers
    })
}

const useRegisterVolunteer=()=>{
     return useMutation({
        mutationFn:registerVolunteer,
        onSuccess:(data)=>{
            toast.success(data.message)
        },
        onError:(error:AxiosError<{ message?: string }>)=>{
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage)
        }
     })
}

export default useRegisterVolunteer