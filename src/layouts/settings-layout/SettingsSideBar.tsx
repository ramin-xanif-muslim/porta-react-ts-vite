import type { MenuProps } from "antd";
import { Menu } from "antd";
import { FaUsers, FaUserShield } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const SettingsSideBar = () => {
  const router = useNavigate();

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
    <>
      <Menu
        className="max-w-[200px] border-r border-gray-200"
        defaultSelectedKeys={[selectedKey]}
        defaultOpenKeys={["profile"]}
        mode="inline"
        theme="light"
        // inlineCollapsed={collapsed}
        items={items}
      />
    </>
  );
};

export default SettingsSideBar;
