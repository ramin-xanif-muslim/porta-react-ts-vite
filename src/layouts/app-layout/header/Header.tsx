import { Link, NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { FaQuestion } from "react-icons/fa6";

import NavMenu from "./NavMenu";
import classNames from "classnames";
import { Button } from "antd";
import Profile from "./profile/Profile";

const Header = () => {
  return (
    <div className="grid bg-[#EAEAEAFF] w-full grid-cols-[0px_minmax(200px,_1fr)_auto] pr-2 md:grid-cols-[100px_minmax(200px,_1fr)_auto]">
      {/* left */}
      {/* logo */}
      <Link
        to="/"
        className="items-center justify-center overflow-hidden md:flex"
      >
        <img
          className="size-14 scale-[1.2] object-cover object-center"
          src="/logo.jpeg"
          alt="logo"
        />
      </Link>

      {/* middle - nav items */}
      <div className="no-scrollbar ml-6 line-clamp-1 flex overflow-x-auto">
        <NavMenu />
      </div>

      {/* right */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {/* <SearchInput /> */}
          <Button
            className="bg-transparent transition-colors hover:bg-gray-700/50"
            shape="circle"
            type="text"
            icon={<FaQuestion className="size-5" />}
          />
          <Button
            className="bg-transparent transition-colors hover:bg-gray-700/50"
            shape="circle"
            type="text"
            icon={<GoBell className="size-5" />}
          />
          <NavLink
            to="/settings"
            onClick={() => {
              document.title = "Settings";
            }}
            className={({ isActive }) =>
              classNames("rounded-full border-gray-400 p-1", {
                "border-brand-600 bg-brand text-white hover:text-white":
                  isActive,
                "border-gray-400": !isActive,
              })
            }
          >
            <IoSettingsOutline className="size-5" />
          </NavLink>
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Header;
