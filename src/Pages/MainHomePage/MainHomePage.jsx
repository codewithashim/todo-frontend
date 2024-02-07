import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import Login from "../Auth/Login/Login";
import { Link } from "react-router-dom";

const MainHomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <section>
      {user?.email ? (
        <div className="mainHomePage">
          <div className="mainHomePage__left">
            <div className="mainHomePage__left__content">
              <h1 className="my-6 text-[2rem] font-bold text-white" >Manage your team with ease</h1>
              <Link
               to={"/dashboard"}
                className="common-btn"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </section>
  );
};

export default MainHomePage;
