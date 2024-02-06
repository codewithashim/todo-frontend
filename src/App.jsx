import { RouterProvider } from "react-router-dom";
import routes from "./Router/Router";
import DashboardLayout from "./Layout/DashboardLayout";
import AuthLayouts from "./Layout/AuthLayout";

const App = () => {
  const isAuthenticated = () => {
    if (localStorage.getItem("accessToken")) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogin = () => {
    isAuthenticated();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    isAuthenticated();
  };

  return (
    <main>
      <RouterProvider router={routes}>
        {isAuthenticated() ? (
          <DashboardLayout onLogout={handleLogout} />
        ) : (
          <AuthLayouts onLogin={handleLogin} />
        )}
      </RouterProvider>
    </main>
  );
};

export default App;
