import { useQuery,useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

//rate a volunteer

const rateVolunteer= async({volunteerId,rating}:{volunteerId:any,rating:{friendliness:number,delivery:number,responsiveness:number,comments:string}})=>{
 const token=localStorage.getItem("token");
 console.log(" id:",typeof volunteerId)
 if(!token){
    throw new Error("Authentication token missing");
 }
 const response= await api.post(`/api/feedbacks/create/${volunteerId}`,rating,{
    headers:{
        Authorization:`Bearer ${token}`
    }
 })
 return response.data;
}

// rate mutation

const useCreateRatings=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:rateVolunteer,
        onSuccess:(data)=>{
            toast.success(data.message);
            queryClient.invalidateQueries({queryKey:['ratingsPerVolunteer'] as const})
        },
        onError:(error:any)=>{
            toast.error(error.response?.data?.message || error.message);
        }
    
    })
}

// rate query
 const getRatingPerVolunteer= async (volunteerId:string)=>{
   
   const response= await api.get('/api/feedbacks',{
    params:{
        volunteerId
    }
   });
     return response.data.data;

 }

const useRatingsQuery=()=>{
    const {user}=useAuth();
    if(!user){
        throw new Error("Authentication missing")
    }
    return useQuery({
        queryKey:["ratingsPerVolunteer",user._id],
        queryFn:()=>getRatingPerVolunteer(user._id),
        enabled:!!user

    })
}


export {useCreateRatings,useRatingsQuery};