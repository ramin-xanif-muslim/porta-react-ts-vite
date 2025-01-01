import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import SubNavMenu from "./header/SubNavMenu";

const AppLayout = () => {
  return (
    <div className="relative mx-auto max-w-[1600px]">
      <div className="h-[92px]">
        <div className="h-[56px]">
          <Header />
        </div>
        <div className="h-[36px]">
          <SubNavMenu />
        </div>
      </div>

      <div className="no-scrollbar h-[calc(100vh-94px)] flex-1 overflow-y-auto bg-[#F3F4F6FF]">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
