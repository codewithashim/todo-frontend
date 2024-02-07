import { useState } from "react";
import AddTeamModal from "../../../../Components/TeamComponents/AddTeamModal/AddTeamModal";
import TeamList from "../TeamList/TeamList";
import UserList from "../../../../Components/UserComponents/UserList/UserList";

const Team = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-[90%] mx-auto">
      <div className="top-bar">
        <button className="common-btn" onClick={() => setOpen(true)}>
          Create Team
        </button>
      </div>
      <div className="divider"></div>

      <section className="my-4 flex md:flex-row flex-col justify-between gap-4">

        <div className="team-list">
          <h1 className="text-center text-2xl font-bold my-4">Team List</h1>
          <TeamList />
        </div>
        
        <div className="user-list border w-[20%]">
          <h1 className="text-center text-2xl font-bold my-4">Total Users</h1>
         <UserList />
        </div>
      </section>

      {/* ==== modal ====== */}

      <AddTeamModal open={open} setOpen={setOpen} />
    </section>
  );
};

export default Team;
