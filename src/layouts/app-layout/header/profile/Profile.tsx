import { FaCircleUser } from "react-icons/fa6";
import { PiSignOutFill } from "react-icons/pi";

import { Button, Dropdown, MenuProps } from "antd";
import { t } from "i18next";
import { useAuthContext } from "../../../../auth/useAuthContext";

const Profile = () => {
  const { handleLogOut } = useAuthContext();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "SignOut") {
      handleLogOut();
    }
  };

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "SignOut",
            label: t("Sign Out"),
            icon: <PiSignOutFill className="size-5" />,
          },
        ],
        onClick: handleMenuClick,
      }}
      placement="bottomRight"
      className="cursor-pointer"
      overlayClassName="text-[#565D6DFF]"
      trigger={["click"]}
    >
      <div className="flex cursor-pointer items-center gap-1">
        <Button
          className="bg-transparent transition-colors hover:bg-gray-700/50"
          shape="circle"
          type="text"
          icon={<FaCircleUser className="size-6" />}
        />
      </div>
    </Dropdown>
  );
};

export default Profile;
