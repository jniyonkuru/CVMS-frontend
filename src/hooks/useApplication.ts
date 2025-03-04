import { useQuery,useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useAuth } from "../AuthContext";


const  fetchApplications=async(userId:string):Promise<any>=>{
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
        enabled: !!user?.id, 
    })
}

export default  useApplications;