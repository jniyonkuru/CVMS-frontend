
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import { Opportunity } from '../types/opportunity.schema';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const fetchOpportunities = async ():Promise<any[]> => {
  const response = await api.get('/api/opportunities');
  return response.data.data;
};

const createOpportunity=async (opportunity:Opportunity):Promise<any>=>{
const token=localStorage.getItem("token");
if(!token){
  toast.error("not token")
  return ;
}
const response =await api.post("/api/opportunities/create",opportunity,{
  headers:{
    Authorization:`Bearer ${token}`
  }
})
return response.data;
}

 export const useCreateOpportunity=()=>{
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn:createOpportunity,
    onSuccess: (data) => {
      console.log(data)
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["opportunities"] as const });
  },
  onError:(error:AxiosError<{ message?: string }>)=>{
    const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
    toast.error(errorMessage)
}

  })
}


export const useOpportunities = () => {
  return useQuery({ queryKey:['opportunities'], queryFn:fetchOpportunities,staleTime:1000 * 60 * 5, retry:2});
};