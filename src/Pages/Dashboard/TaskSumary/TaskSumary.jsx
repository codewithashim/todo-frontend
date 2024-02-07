import { Card } from "antd";
import useUsers from "../../../Hooks/useUsers";
import { UserOutlined } from "@ant-design/icons";
import useTeam from "../../../Hooks/useTeam";
import useTask from "../../../Hooks/useTask";
import { FaUsers,FaTasks,FaSync, FaRegCheckCircle, FaRegChartBar } from "react-icons/fa";

const TaskSumary = () => {
  const { usersData } = useUsers();
  const { teamsData } = useTeam();
  const { tasksData } = useTask();

  return (
    <section>
      <div className="grid md:grid-cols-3 gap-4">
        <Card
          bordered={false}
          style={{
            width: 250,
          }}
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <UserOutlined className="text-[2rem]" />
            <p>Total User {usersData?.length} </p>
          </div>
        </Card>

        <Card
          bordered={false}
          style={{
            width: 250,
          }}
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <FaUsers className="text-[2rem]" />
            <p>Total Team {teamsData?.length} </p>
          </div>
        </Card>

        <Card
          bordered={false}
          style={{
            width: 250,
          }}
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <FaTasks className="text-[2rem]" />
            <p>Total Task {tasksData?.length} </p>
          </div>
        </Card>

        <Card
          bordered={false}
          style={{
            width: 250,
          }}
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <FaSync className="text-[2rem]" />
            <p>
              Total Panding Task{" "}
              {tasksData?.filter((task) => task?.status[0] === "pending").length}{" "}
            </p>
          </div>
        </Card>

        <Card
          bordered={false}
          style={{
            width: 250,
          }}
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <FaRegChartBar className="text-[2rem]" />
            <p>
              Total Progress Task{" "}
              {tasksData?.filter((task) => task?.status[0] === "progress").length}{" "}
            </p>
          </div>
        </Card>

        <Card
          bordered={false}
          style={{
            width: 250,
          }}
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <FaRegCheckCircle className="text-[2rem]" />
            <p>
              Total Completed Task{" "}
              {tasksData?.filter((task) => task?.status[0] === "completed").length}{" "}
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TaskSumary;
