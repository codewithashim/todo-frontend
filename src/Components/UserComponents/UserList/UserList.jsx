import useUsers from "../../../Hooks/useUsers";

const UserList = () => {
  const { usersData } = useUsers();

  return (
    <section className="w-100 h-100">
      <div>
        {usersData?.map((user) => {
          return (
            <div key={user?._id} className="flex flex-col gap-2 justify-center items-center  m-2 ">
              <div className="avatar online w-20">
                <div className="w-24 rounded-full">
                  <img src={user?.profilePicture} alt={user?.name} />
                </div>
              </div>
              <h1>{user?.name}</h1>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UserList;
