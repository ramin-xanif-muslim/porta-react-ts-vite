import { NavLink, useLocation } from "react-router-dom";
import { Tabs } from "antd";
import { useMemo } from "react";

const navItems = [
  {
    key: "1",
    label: <NavLink to="/">Dashboard</NavLink>,
  },
  {
    key: "2",
    label: <NavLink to="/">Dashboard</NavLink>,
  },
];

const SubNavMenu = () => {
  const location = useLocation();
  
  const title = useMemo(() => {
    return document.title.split("|")[0] || location.pathname.split("/")[1];
  }, [location.pathname]);

  return (
    <div className="w-full px-4 flex justify-between items-center bg-white shadow-sm">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Tabs defaultActiveKey="1" centered items={navItems} />
      <div></div>
    </div>
  );
};

export default SubNavMenu;
