
import { useQuery } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import { Opportunity } from '../types/opportunity.schema';

const fetchOpportunities = async ():Promise<Opportunity[]> => {
  const response = await api.get('/api/opportunities');
  console.log(response.data)
  return response.data.data;
};

export const useOpportunities = () => {
  return useQuery({ queryKey:['opportunities'], queryFn:fetchOpportunities,staleTime:1000 * 60 * 5, retry:2});
};