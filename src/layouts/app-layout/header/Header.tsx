import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { BiSearchAlt } from "react-icons/bi";
import { Button } from "antd";

import NavMenu from "./NavMenu";
import Profile from "./profile/Profile";

const Header = () => {
  return (
    <div className="grid w-full grid-cols-[0px_minmax(200px,_1fr)_auto] gap-4 bg-[#233142] p-2 text-gray-400 md:grid-cols-[100px_minmax(200px,_1fr)_auto]">
      {/* left */}
      <div className="flex items-center">
        {/* logo */}
        <Link to="/" className="hidden shrink-0 md:block">
          <img className="h-[32px] w-[93px]" src="/logo.svg" alt="logo" />
        </Link>
      </div>

      {/* middle - nav items */}
      <div className="no-scrollbar line-clamp-1 flex overflow-x-auto">
        <NavMenu />
      </div>

      {/* right */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            className="bg-transparent transition-colors hover:bg-gray-700/50"
            shape="circle"
            type="text"
            icon={<BiSearchAlt className="size-5 text-gray-400" />}
          />
          <Button
            className="bg-transparent transition-colors hover:bg-gray-700/50"
            shape="circle"
            type="text"
            icon={<GoBell className="size-5 text-gray-400" />}
          />
          <Button
            className="bg-transparent transition-colors hover:bg-gray-700/50"
            shape="circle"
            type="text"
            icon={<IoSettingsOutline className="size-5 text-gray-400" />}
          />
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
