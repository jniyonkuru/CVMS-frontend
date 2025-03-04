import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";
import { organization } from "../types/organization.schema";
import { AxiosError } from "axios";
const registerOrganization= async(volunteerData:organization):Promise<any>=>{
  return new Promise((resolve,reject)=>{
    setTimeout(async()=>{
        try {
            const response= await api.post('api/organizations/create',volunteerData);
            resolve(response.data)
        } catch (error) {
            reject(error)
        }
    },2000)
  })

}

const queryOrganizations=async():Promise<any>=>{
 const response = await api.get("api/organizations");
 console.log("data:",response)
 return response.data.data

}



 export const useOrganizationsQuery=()=>{
    return useQuery({
        queryKey:["organizations"],
        queryFn:queryOrganizations,
        
    
    })
}


const useRegisterOrganization=()=>{
     return useMutation({
        mutationFn:registerOrganization,
        onSuccess:(data)=>{
            toast.success(data.message)
        },
        onError:(error:AxiosError<{ message?: string }>)=>{
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage)
        }
     })
}

export default useRegisterOrganization