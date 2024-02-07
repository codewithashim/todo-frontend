import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import Swal from "sweetalert2";
import { Logo } from "../../Assets";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const router = useNavigate();

  console.log(user, "user++");

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          timerProgressBar: true,
          title: "Successfully Logout Done !",
          iconColor: "#ED1C24",
          toast: true,
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          customClass: {
            confirmButton: "blue",
          },
          showConfirmButton: false,
          timer: 3500,
        });
        localStorage.removeItem("user-uid");
        router("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something warn!",
          confirmButtonColor: "#0077b6",
        });
      });
  };

  return (
    <div className="navbar ">
      <div className="flex-1">
        <Link to="/">
          <img src={Logo} alt="AR" className="w-20 h-20" />
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user?.email ? (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full cursor-pointer">
                  <img src={user?.profilePicture} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <h1>{user?.name}</h1>
                  <p>{user?.email}</p>
                </li>
                <hr />
                <li>
                  <Link to="/dashboard" className="justify-between">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <button className="common-btn" onClick={() => handleLogout()}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="dropdown dropdown-end">
              <Link to={"/signup"} className="common-btn">
                Signup
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
