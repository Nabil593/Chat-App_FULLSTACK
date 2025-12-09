import React from 'react'
import { getAuthUser } from '../config/api';
import { useQuery } from '@tanstack/react-query';

const useAuthUser = () => {
     const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // auth check
  });

  return {isloading: authUser.isLoading, authUser: authUser.data?.user}
}

export default useAuthUser;