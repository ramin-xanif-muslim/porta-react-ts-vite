import React from "react";
import { Outlet } from "react-router-dom";
import SettingsSideBar from "./SettingsSideBar";

const SettingsLayout: React.FC = () => {
  return (
    <div className="flex h-full w-full">
      <SettingsSideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
