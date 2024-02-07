/* eslint-disable react/prop-types */
import { Modal, Select } from "antd";
import { useState } from "react";
import { updateTaskByIdUrl } from "../../../Utils/Urls/TaskUrl";
import Swal from "sweetalert2";
import useTask from "../../../Hooks/useTask";

const UpdateTaskModal = ({ taskUpdateOpen, setTaskUpdateOpen, taskData }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const { refetchTasks } = useTask();

  const statusOption = [
    {
      value: "pending",
      lavel: "pending",
    },
    {
      value: "progress",
      lavel: "progress",
    },
    {
      value: "completed",
      lavel: "completed",
    },
  ];

  // const statusOption = ["pending", "progress", "completed"];

  const handelStatus = (value) => {
    console.log(value);
    setStatus(value);
  };

  const handelUpdateTask = async () => {
    setLoading(true);
    const res = await fetch(updateTaskByIdUrl(taskData?._id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    });
    const data = await res.json();
    if (!data) {
      setLoading(false);
      setTaskUpdateOpen(false);
    } else {
      Swal.fire({
        position: "top-end",
        timerProgressBar: true,
        title: "Successfully Updated !",
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
      setTaskUpdateOpen(false);
      refetchTasks();
    }
  };

  return (
    <section>
      <Modal
        title="Create Team"
        centered
        open={taskUpdateOpen}
        onOk={() => setTaskUpdateOpen(false)}
        onCancel={() => setTaskUpdateOpen(false)}
        width={600}
        footer={null}
      >
        <div className="flex flex-col gap-4">
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="select status"
            onChange={handelStatus}
            options={statusOption}
          />

          <button className="common-btn" onClick={handelUpdateTask}>
            <span className="text-white">
              {loading ? "Loading..." : "Create Team"}
            </span>
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default UpdateTaskModal;
