import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import SubNavMenu from "./header/SubNavMenu";

const AppLayout = () => {
  return (
    <div className="max-w-[1600px] mx-auto relative">
      <Header />
      <SubNavMenu />
      <Outlet />
    </div>
  );
};

export default AppLayout;
