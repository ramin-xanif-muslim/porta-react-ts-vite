import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import classNames from "classnames";
import { useState } from "react";
import {
  FaUsers,
  FaUserShield,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const SettingsSideBar = () => {
  const router = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const items: MenuItem[] = [
    {
      key: "users",
      label: "Users",
      icon: <FaUsers size={16} />,
      onClick: () => {
        router("users");
      },
    },
    {
      key: "roles",
      label: "Roles",
      icon: <FaUserShield size={16} />,
      onClick: () => {
        router("roles");
      },
    },
  ];

  const selectedKey = useLocation().pathname.split("/").pop() || "users";

  return (
    <div className="flex flex-col">
      <Menu
        className={classNames("h-full border-r border-gray-200", {
          "w-[200px]": !collapsed,
        })}
        defaultSelectedKeys={[selectedKey]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
      <div className="flex justify-center">
        <Button
          // type="text"
          block
          className="block"
          icon={collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
    </div>
  );
};

export default SettingsSideBar;
