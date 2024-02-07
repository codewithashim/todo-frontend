/* eslint-disable react/prop-types */

import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useTeam from "../../../Hooks/useTeam";

const TeamListCard = ({ team }) => {
  const { handelTeamDelete } = useTeam();


  return (
    <section className="cursor-pointer">
      <Card
        style={{
          width: 300,
        }}
      >
        <div className="mb-4">
          <Meta title={team?.name} />
        </div>
        <Meta
          avatar={team?.members?.map((member) => {
            return <Avatar src={member?.profilePicture} key={member?._id} />;
          })}
        />
        <div className="my-4 flex flex-col gap-2">
          <button
            onClick={() => handelTeamDelete(team?._id)}
            className="common-btn flex items-center gap-4"
          >
            Delete Team <FaTrash />
          </button>
          <Link to={`/dashboard/team/${team?._id}`} className="common-btn">
            View Team
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default TeamListCard;
