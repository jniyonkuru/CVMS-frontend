
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import { Opportunity } from '../types/opportunity.schema';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useAuth } from '../AuthContext';

const fetchOpportunities = async ({organizationId}:{organizationId?:string}):Promise<any[]> => {
  const response = await api.get('/api/opportunities',{
    params: organizationId ? { organizationId } : {},
  });
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
    
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["opportunities"] as const });
  },
  onError:(error:AxiosError<{ message?: string }>)=>{
    const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
    toast.error(errorMessage)
}

  })
}
//change opportunity status,
const changeOpportunityStatus=async(opportunityId:string,update:{status:"open"|"closed"})=>{
  const token= localStorage.getItem('token');
  console.log(opportunityId)
  if(!token){
    throw new Error("Authentication missing")
  }
 const response= await api.put(`/api/opportunities/${opportunityId}`,update,{
  headers:{
    Authorization:`Bearer ${token}`
  }
 });
  return response.data.data;
}
  export const useUpdateOpportunity=()=>{
  const queryClient=useQueryClient();
    return useMutation({
         mutationFn:({opportunityId,update}:{opportunityId:string,update:{status:"open"|"closed"}})=>{

      return   changeOpportunityStatus(opportunityId,update)},
      onSuccess:(data)=>{
        console.log(data)
        toast.success("Status was changed successfully");
        queryClient.invalidateQueries({queryKey:['opportunities']})
      },
      onError:(error:any)=>{
       
          toast.error(error.response?.data?.message || error.message)
      }
    })
  
 }

export const useOpportunities = (organizationId?:string) => {
  return useQuery({ queryKey:['opportunities',{organizationId}], queryFn:()=>fetchOpportunities({organizationId}),staleTime:1000 * 60 * 5, retry:2});
};