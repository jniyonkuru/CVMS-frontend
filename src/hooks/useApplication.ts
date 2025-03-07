import { useQuery,useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";



const fetchApplicationsPerOrganization = async (): Promise<any[]> => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("No token found. Please log in.");
      throw new Error("Authentication token missing"); // Ensure React Query handles the error
    }
  
    const response = await api.get("/api/applications/byOrganization", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data.data || [];
  };
  
  export const useApplicationsByOrg = () => {
    const { user } = useAuth();
  
    return useQuery({
      queryKey: ["applicationsPerOrg", user?._id], // Include user ID for refetching
      queryFn: fetchApplicationsPerOrganization,
      enabled: !!user, // Ensures the query only runs when user is available
      staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
      retry: 1, // Reduce unnecessary retries on error
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


export {useCreateApplication}

export default  useApplications;