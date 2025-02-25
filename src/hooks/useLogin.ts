import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";

const loginUser= async(credentials:{email:string,password:string}, userType:'volunteer'|'organization'):Promise<any>=>{
   return new Promise((resolve, reject) => {
    setTimeout(async () => {
        const endPoint=userType==='volunteer'?'api/volunteers/login':'api/organizations/login'
      try {
        const response = await api.post(endPoint, credentials);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }, 2000); 
  });
};


const useLogin=(user:'volunteer'|'organization')=>{
    return useMutation({
        mutationFn:(credentials:{email:string,password:string})=>{
         return loginUser(credentials,user)
        },
        onSuccess:(data)=>{
            localStorage.setItem('token',data.data.token);

            toast.success(data.message)
            console.log("login successful",data)
        },
        onError:(error:any)=>{
            toast.error(error.response?.data.message);
            console.error("login error",error)
        }
    })
}

export default useLogin;