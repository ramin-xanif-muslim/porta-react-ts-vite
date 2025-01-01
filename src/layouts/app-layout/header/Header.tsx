import { Link, NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
// import { BiSearchAlt } from "react-icons/bi";

import NavMenu from "./NavMenu";
import Profile from "./profile/Profile";
import classNames from "classnames";
import { Button } from "antd";

const Header = () => {
  return (
    <div className="grid w-full grid-cols-[0px_minmax(200px,_1fr)_auto] pr-2 md:grid-cols-[100px_minmax(200px,_1fr)_auto]">
      {/* left */}
      {/* logo */}
      <Link
        to="/"
        className="items-center overflow-hidden justify-center border-r border-gray-400 md:flex"
      >
        <img
          className="size-14 scale-[1.2] object-cover object-center"
          src="/logo.svg"
          alt="logo"
        />
      </Link>

      {/* middle - nav items */}
      <div className="no-scrollbar ml-6 line-clamp-1 flex overflow-x-auto">
        <NavMenu />
      </div>

      {/* right */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {/* <Button
            className="bg-transparent transition-colors hover:bg-gray-700/50"
            shape="circle"
            type="text"
            icon={<BiSearchAlt className="size-5 text-gray-400" />}
          /> */}
          <Button
            className="bg-transparent transition-colors hover:bg-gray-700/50"
            shape="circle"
            type="text"
            icon={<GoBell className="size-5" />}
          />
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              classNames("rounded-full border-gray-400 p-1", {
                "border-brand-600 bg-brand text-white hover:text-white":
                  isActive,
                "border-gray-400": !isActive,
              })
            }
          >
            {/* <Button
              className="bg-transparent transition-colors hover:bg-gray-700"
              shape="circle"
              type="text"
              icon={<IoSettingsOutline className="size-5 text-gray-400" />}
            /> */}
            <IoSettingsOutline className="size-5" />
          </NavLink>
        </div>

        {/* user profile */}
        <div className="ml-2">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Header;
