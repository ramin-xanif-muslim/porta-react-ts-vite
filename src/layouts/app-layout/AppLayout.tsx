import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import SubNavMenu from "./header/SubNavMenu";
import { useAuth } from "../../auth/useAuth";

const AppLayout = () => {
  const location = useLocation();

  const { token } = useAuth();
  if (!token) {
    return "";
  }

  if (!location.pathname.split("/")[1]) {
    return (
      <div className="relative mx-auto max-w-[1600px]">
        <div className="h-[56px]">
          <Header />
        </div>

        <div className="no-scrollbar h-[calc(100vh-56)] flex-1 overflow-y-auto bg-[#F3F4F6FF]">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-[1600px]">
      <div className="h-[102px]">
        <div className="h-[56px]">
          <Header />
        </div>
        <div className="h-[46px]">
          <SubNavMenu />
        </div>
      </div>

      <div className="no-scrollbar h-[calc(100vh-104px)] flex-1 overflow-y-auto bg-[#F3F4F6FF]">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
