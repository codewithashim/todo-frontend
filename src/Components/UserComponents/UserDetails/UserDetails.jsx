import { useQuery } from "@tanstack/react-query";
import { Avatar, Card } from "antd";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../Utils/Urls/SignupUrl";
const { Meta } = Card;

const UserDetails = () => {
  const { userId } = useParams();

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await fetch(getUserById(userId));
      const data = await res.json();
      return data.data;
    },
  });

  return (
    <section className="flex justify-center items-center">
      <Card
        style={{
          width: 400,
        }}
        cover={<img alt="example" src={userData?.profilePicture} />}
      >
        <Meta
          avatar={<Avatar src={userData?.profilePicture} />}
          title={userData?.name}
          description={userData?.bio}
        />
            <div className="my-4">
                <p>Username: {userData?.username}</p>
                <p>Email: {userData?.email}</p>

            </div>
      </Card>
    </section>
  );
};

export default UserDetails;
