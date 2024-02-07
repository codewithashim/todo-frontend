/* eslint-disable react/prop-types */
import { Input, Modal, Select } from "antd";
import { useState } from "react";
import useUsers from "../../../Hooks/useUsers";
import { createTeamUrl } from "../../../Utils/Urls/TeamUrls";
import Swal from "sweetalert2";
import useTeam from "../../../Hooks/useTeam";

const AddTeamModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamMember, setTeamMember] = useState([]);
  const { usersData } = useUsers();

  const { refetch } = useTeam();

  const teamMemberOption = usersData?.map((user) => ({
    value: user?._id,
    label: user.name,
  }));

  const handelTeamMember = (selectedValues) => {
    setTeamMember(selectedValues);
  };

  const handelCreateTeam = async () => {
    setLoading(true);
    const res = await fetch(createTeamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: teamName,
        members: teamMember,
      }),
    });
    const data = await res.json();
    if (data.success === true) {
      Swal.fire({
        position: "top-end",
        timerProgressBar: true,
        title: "Successfully Team Created !",
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
      setLoading(false);
      setOpen(false);
      refetch();
    } else {
      Swal.fire({
        position: "top-end",
        timerProgressBar: true,
        title: "Something went wrong !",
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
      setLoading(false);
      setOpen(false);
    }
    console.log(data);
  };

  return (
    <div>
      <>
        <Modal
          title="Create Team"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={600}
          footer={null}
        >
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Team Name"
              onChange={(e) => setTeamName(e.target.value)}
            />

            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="Assign To"
              onChange={handelTeamMember}
              options={teamMemberOption}
            />

            <button className="common-btn" onClick={handelCreateTeam}>
              <span className="text-white">
                {loading ? "Loading..." : "Create Team"}
              </span>
            </button>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default AddTeamModal;
