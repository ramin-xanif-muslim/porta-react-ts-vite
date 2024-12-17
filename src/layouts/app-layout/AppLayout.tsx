import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import SubNavMenu from "./header/SubNavMenu";

const AppLayout = () => {
  return (
    <div className="max-w-[1600px] mx-auto relative">
      <div className="h-[100px]">
        <Header />
        <SubNavMenu />
      </div>

      <div className="flex-1 h-[calc(100vh-100px)] bg-[#F3F4F6FF] overflow-y-auto no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
