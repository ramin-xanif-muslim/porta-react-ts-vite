import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import SubNavMenu from "./header/SubNavMenu";

const AppLayout = () => {
  return (
    <div className="relative mx-auto max-w-[1600px]">
      <div className="h-[86px]">
        <Header />
        <SubNavMenu />
      </div>

      <div className="no-scrollbar h-[calc(100vh-86px)] flex-1 overflow-y-auto bg-[#F3F4F6FF]">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
