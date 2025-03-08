import { useQuery,useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";



const fetchApplicationsPerOrganization = async (): Promise<any[]> => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("No token found. Please log in.");
      throw new Error("Authentication token missing"); 
    }
  
    const response = await api.get("/api/applications/byOrganization", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data.data || [];
  };
  
   const useApplicationsByOrg = () => {
    const { user } = useAuth();
  
    return useQuery({
  
      queryKey: ["applicationsPerOrg"],
      queryFn: fetchApplicationsPerOrganization,
      enabled: !!user,
      staleTime: 1000 * 60 * 5,
      retry: 1, 
    });
  };

const  fetchApplications=async(userId:string):Promise<any[]>=>{
const response=await api.get('/api/applications',{
    params:{volunteerId:userId}
})
return response.data.data
}

const useApplications=()=>{
    const {user}=useAuth();
    return useQuery({
        queryKey:["applications",user?._id],
        queryFn:()=>fetchApplications(user._id),
        enabled: !!user?._id, 
    })
}
const createApplication = async (opportunityId: string): Promise<any | null> => {
    const token = localStorage.getItem('token');
    if(!opportunityId){
        return null;
    }
    const response = await api.post(
        "/api/applications/create",
        { opportunityId },
        { headers: { Authorization: `Bearer ${token}` } } 
    );
    return response.data;
};

const useCreateApplication = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: createApplication,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["applications"] as const });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || error.message);
        }
    });
};
// update application

const updateApplicationStatus=async({applicationId,updates}:{applicationId:string,updates:{status:"approved"|"rejected"}})=>{
  const token=localStorage.getItem("token");
  if(!token){
    throw new Error("Authentication token missing")
  }
  const  response= await api.put(`/api/applications/${applicationId}`,updates,{
  
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
 return response.data

}

const useUpdateApplicationStatus=()=>{
  const queryClient=useQueryClient();
    return useMutation({
       mutationFn:updateApplicationStatus,
       onSuccess:(data)=>{
        toast.success(data.message||" updates was successfully");
         queryClient.invalidateQueries({queryKey:['applications'] ,exact:true});
         queryClient.invalidateQueries({queryKey:['applicationsPerOrg'],exact:true})

       },
       onError: (error: any) => {
        toast.error(error.response?.data?.message || error.message);
    }
    
    })

}


export {useCreateApplication, useApplicationsByOrg,useUpdateApplicationStatus}

export default  useApplications;