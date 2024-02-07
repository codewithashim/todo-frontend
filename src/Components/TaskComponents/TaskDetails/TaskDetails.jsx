import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTaskByIdUrl } from "../../../Utils/Urls/TaskUrl";
import UpdateTaskModal from "../UpdateTaskModal/UpdateTaskModal";
import { useState } from "react";
import useTask from "../../../Hooks/useTask";
import { FaTrash } from "react-icons/fa";

const TaskDetails = () => {
  const { taskId } = useParams();
  const [taskUpdateOpen, setTaskUpdateOpen] = useState(false);
  const { handelTaskDelete } = useTask();

  const { data: taskData } = useQuery({
    queryKey: ["taskData"],
    queryFn: async () => {
      const res = await fetch(getTaskByIdUrl(taskId));
      const data = await res.json();
      return data.data;
    },
  });

  return (
    <section>
      <div className="w-[90%] rounded shadow-md p-4 m-4">
        <h1 className="text-2xl font-bold">
          <span>{taskData?.title}</span>
        </h1>
        <p>
          <span>{taskData?.description}</span>
        </p>
        <div>
          <span className="badge badge-primary">{taskData?.status}</span>

          <span className="badge badge-primary mx-4">
            {taskData?.priorityLevel}
          </span>

          <span className="badge badge-primary mx-4">{taskData?.dueDate}</span>
        </div>
        <hr className="my-4" />
        <h1 className="text-2xl font-bold">
          <span>Assign To</span>
        </h1>
        <div className="flex gap-4 flex-col md:flex-row">
          {taskData?.assignTo?.map((member, index) => {
            return (
              <div
                key={index}
                className="border p-4 m-4 flex justify-center flex-col items-center"
              >
                <div className="avatar online w-20">
                  <div className="w-24 rounded-full">
                    <img src={member?.profilePicture} alt={member?.name} />
                  </div>
                </div>
                <h1>{member?.name}</h1>
                <p>{member?.username}</p>
                <p>{member?.email}</p>
              </div>
            );
          })}
        </div>

        <div className="invite-user my-4">
          <hr className="my-4" />
          <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
            <button
              className="common-btn"
              onClick={() => setTaskUpdateOpen(true)}
            >
              Update Status
            </button>
            <button
              onClick={() => handelTaskDelete(taskData?._id)}
              className="common-btn flex items-center gap-4"
            >
              Delete Task <FaTrash />
            </button>
          </div>
        </div>
      </div>
      <UpdateTaskModal
        taskData={taskData}
        taskUpdateOpen={taskUpdateOpen}
        setTaskUpdateOpen={setTaskUpdateOpen}
      />
    </section>
  );
};

export default TaskDetails;
