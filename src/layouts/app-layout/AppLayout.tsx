import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import SubNavMenu from "./header/SubNavMenu";
import { useAuthContext } from "../../auth/useAuthContext";
import { Spin } from "antd";
import Footer from "../../components/Footer";

const AppLayout = () => {

  const { token } = useAuthContext();
  if (!token) {
    return (
      <div className="loading">
        <Spin tip="Loading" size="large">
          <img className="h-[193px] w-[260px]" src="/logo.jpeg" alt="logo" />
        </Spin>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-[1600px]">
      <div className="h-[108px]">
        <div className="h-[56px]">
          <Header />
        </div>
        <div className="h-[54px]">
          <SubNavMenu />
        </div>
      </div>

      <div className="no-scrollbar h-[calc(100vh-108px-50px)] flex-1 overflow-y-auto bg-[#F3F4F6FF]">
        <Outlet />
      </div>

      <div className="fixed bottom-0 h-[50px] w-full bg-[#EAEAEAFF]">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
