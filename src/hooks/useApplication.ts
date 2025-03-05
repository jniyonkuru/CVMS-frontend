import { useQuery,useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";


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
    console.log(response.data)
    return response.data;
};

const useCreateApplication = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: createApplication,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["applications"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || error.message);
        }
    });
};


export {useCreateApplication}

export default  useApplications;