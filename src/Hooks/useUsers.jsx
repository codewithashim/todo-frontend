import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../Utils/Urls/SignupUrl";

const useUsers = () => {
  const {
    data: usersData,
    isLoading: usersLoaded,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await fetch(getAllUser);
      const data = await res.json();
      return data?.data;
    },
  });


  return {
    usersData,
    usersLoaded,
    refetchUsers,
  };
};

export default useUsers;
