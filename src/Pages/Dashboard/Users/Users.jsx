import useUsers from "../../../Hooks/useUsers";
import VirtualList from "rc-virtual-list";
import { Avatar, List} from "antd";
import { Link } from "react-router-dom";
const ContainerHeight = 400;

const Users = () => {
  const { usersData } = useUsers();
  console.log(usersData);

  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      usersData;
    }
  };

  return (
    <section className=" w-[90%] bg-white shadow rounded md:px-16 my-[2rem] mx-auto p-4">
      <List>
        <VirtualList
          data={usersData}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="email"
          onScroll={onScroll}
        >
          {(item) => (
            <List.Item key={item?._id}>
              <List.Item.Meta
                avatar={<Avatar src={item?.profilePicture} />}
                title={<Link to={`/dashboard/user/${item?._id}`}>{item?.name}</Link>}
                description={item?.email}
                className="border p-4 rounded w-fit"
              />
            </List.Item>
          )}
        </VirtualList>
      </List>
    </section>
  );
};

export default Users;
