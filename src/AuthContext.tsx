import { createContext,useState,ReactNode,useContext, useEffect} from "react";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import {jwtDecode} from "jwt-decode";
import api from "./api/axiosInstance";
import { toast } from "react-toastify";

const isTokenValid = (token: string) => {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  };
interface AuthContextType{
    user:any,
    login:(userData:any)=>void,
    logout:()=>void,
    isAuthenticated:boolean,
    showLoginModal: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
    isPending:boolean
}

const AuthContext= createContext<AuthContextType|undefined>(undefined);

const AuthProvider =({children}:{children:ReactNode})=>{
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const queryClient = useQueryClient();
    // useEffect(()=>{
    //  const token =localStorage.getItem('token');
    //  if(token&&isTokenValid(token)){
    //   setToken(token);
    //   console.log(token)
    //  }else{
    //     localStorage.removeItem('token')
    //  }
    // },[token])

    const {data:user}=useQuery({
        queryKey:["user",token],
        queryFn:async()=>{
            if(!token){
                return null;
            };
          
       const response = await api.get('/api/me',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return response.data
        } 
        ,
        enabled:!!token,
        
    })

    const loginMutation = useMutation({
        mutationFn: async (credentials: { email: string; password: string; role: string }):Promise<any> => {
          return new Promise((resolve, reject) => {
            setTimeout(async () => {
              try {
                const response = await api.post("/api/login", credentials);
                resolve(response.data);
              } catch (error) {
                reject(error);
              }
            }, 2000);
          });
        },
        onSuccess: (data) => {
          localStorage.setItem("token", data.data.token);
          setToken(data.data.token);
          toast.success("User logged in successfully");
          closeLoginModal()
          queryClient.invalidateQueries({ queryKey: ["user"] as const });
        },
        onError: (error) => {
          console.error("Login failed:", error);
          toast.error("Login failed. Please try again.");
        },
      });
      

   const login=(data:{email:string,password:string,role:string})=>{
  loginMutation.mutate(data)
 
   }

     const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    queryClient.setQueryData(["user"], null);
  };

   const openLoginModal=()=>setShowLoginModal(true);
   const closeLoginModal=()=>setShowLoginModal(false)
 
return (
    <AuthContext.Provider value={{user,login,logout,isAuthenticated:!!user,openLoginModal,closeLoginModal,showLoginModal,isPending:loginMutation.isPending}}>
        {children}
    </AuthContext.Provider>
)

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
  };

export default AuthProvider