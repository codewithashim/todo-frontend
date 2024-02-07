import { useQuery } from "@tanstack/react-query";
import { deleteTeamByIdUrl, getAllTeamUrl } from "../Utils/Urls/TeamUrls";
import Swal from "sweetalert2";

const useTeam = () => {
  const {
    data: teamsData,
    isLoading: teamsLoaded,
    refetch,

  } = useQuery({
    queryKey: ["teamsData"],
    queryFn: async () => {
      const res = await fetch(getAllTeamUrl);
      const data = await res.json();
      return data?.data;
    },
  });

  const handelTeamDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      const res = await fetch(deleteTeamByIdUrl(id), {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: data.message,
          iconColor: "#ED1C24",
          toast: true,
          icon: "error",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: "Successfully Delete !",
          iconColor: "#ED1C24",
          toast: true,
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
        refetch();
      }
    }
  };

  return {
    teamsData,
    teamsLoaded,
    refetch,
    handelTeamDelete
  };
};

export default useTeam;
