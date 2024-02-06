import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";

const AuthLayouts = () => {
  return (
    <section className="container">
      <Navbar />
      <Outlet />
    </section>
  );
};

export default AuthLayouts;
