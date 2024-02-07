/* eslint-disable react/prop-types */
import { Input, Modal, Select } from "antd";
import useUsers from "../../../Hooks/useUsers";
import { useState } from "react";
import Swal from "sweetalert2";

const InviteUserModal = ({
  inviteUser,
  setInviteUser,
  teamData,
  refetchTeamData,
}) => {
  const { usersData } = useUsers();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState([]);

  console.log(teamData, "teamId");

  const userOption = usersData?.map((user) => {
    return {
      value: user?._id,
      label: user?.name,
    };
  });

  const handelUser = (value) => {
    setUserId(value);
  };

  console.log(userId[0], "userId");

  const userIdNormalFormet = JSON.stringify(userId);

  console.log(userIdNormalFormet, "userIdNormalFormet");

  const handelInviteUser = async () => {
    setLoading(true);
    const res = await fetch(
      `https://collabration-server.vercel.app/api/v1/teams/invite/${teamData?._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId[0],
          // teamId: teamData?._id,
        }),
      }
    );
    const data = await res.json();
    if (!data) {
      setLoading(false);
      setInviteUser(false);
    } else {
      Swal.fire({
        position: "top-end",
        timerProgressBar: true,
        title: "Successfully Invited !",
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
      setInviteUser(false);
      refetchTeamData();
    }
  };

  return (
    <section>
      <Modal
        title="Create Team"
        centered
        open={inviteUser}
        onOk={() => setInviteUser(false)}
        onCancel={() => setInviteUser(false)}
        width={600}
        footer={null}
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Team Name"
            defaultValue={teamData?.name}
            disabled
          />
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="select User"
            onChange={handelUser}
            options={userOption}
          />

          <button className="common-btn" onClick={handelInviteUser}>
            <span className="text-white">
              {loading ? "Loading..." : "Create Team"}
            </span>
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default InviteUserModal;
