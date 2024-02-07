/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { DatePicker, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext, useState } from "react";
import useUsers from "../../../Hooks/useUsers";
import useTeam from "../../../Hooks/useTeam";
import { AuthContext } from "../../../Context/UserContext";
import Swal from "sweetalert2";
import { createTaskUrl } from "../../../Utils/Urls/TaskUrl";
import useTask from "../../../Hooks/useTask";

const AddTaskModal = ({ taskOpen, setTaskOpen }) => {
  const [loading, setLoading] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [paiorityLavel, setPaiorityLavel] = useState("");
  const [userAssign, setUserAssign] = useState([]);
  const [teamAssign, setTeamAssign] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { refetchTasks } = useTask();
  const { user } = useContext(AuthContext);
  const { usersData } = useUsers();
  const { teamsData } = useTeam();

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDueDate(dateString);
  };

  const paiorityLavelOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
    { value: "Urgent", label: "Urgent" },
    { value: "Important", label: "Important" },
  ];

  const handleChangePaiority = (value) => {
    console.log(`selected ${value}`);
    setPaiorityLavel(value);
  };

  const userAssignOption = usersData?.map((user) => {
    return {
      value: user?._id,
      label: user?.name,
    };
  });
  const handleChangeUserAssign = (value) => {
    setUserAssign(value);
  };

  const teamSelectOption = teamsData?.map((team) => {
    return {
      value: team?._id,
      label: team?.name,
    };
  });

  const handelTeamSelect = (value) => {
    console.log(`selected ${value}`);
    setTeamAssign(value);
  };

  const handelAddTask = async () => {
    try {
      setLoading(true);
      const res = await fetch(createTaskUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          dueDate: dueDate,
          priorityLevel: paiorityLavel,
          assignTo: userAssign,
          taskAuthor: user?._id,
          status: "pending",
          team: teamAssign,
        }),
      });
      const data = await res.json();
      if (!data) {
        Swal.fire({
          position: "top-end",
          timerProgressBar: true,
          title: "Something went to wrang !",
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
      } else {
        Swal.fire({
          position: "top-end",
          timerProgressBar: true,
          title: "Successfully Task Created !",
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
        setTaskOpen(false);
        refetchTasks();
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setTaskOpen(false);
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Modal
        title="Create Task"
        centered
        open={taskOpen}
        onOk={() => setTaskOpen(false)}
        onCancel={() => setTaskOpen(false)}
        width={600}
        footer={null}
      >
        <div className="flex flex-col justify-center items-center gap-6 w-[90%] bg-white shadow rounded md:px-16 my-[2rem] mx-auto p-4">
          <Input
            placeholder="Task Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            rows={4}
            placeholder="Task Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <DatePicker
            onChange={onChange}
            style={{
              width: "100%",
            }}
          />
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="Priority Level"
            onChange={handleChangePaiority}
            options={paiorityLavelOptions}
          />
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="Assign To"
            onChange={handleChangeUserAssign}
            options={userAssignOption}
          />
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="Select Team"
            onChange={handelTeamSelect}
            options={teamSelectOption}
          />

          <div>
            <button className="common-btn" onClick={handelAddTask}>
              {loading ? "Loading..." : "Add Task"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddTaskModal;
