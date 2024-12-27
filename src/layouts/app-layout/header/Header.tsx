import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { BiSearchAlt } from "react-icons/bi";
import { Button } from "antd";

import NavMenu from "./NavMenu";
import Profile from "./profile/Profile";


const Header = () => {
  return (
    <div className="grid grid-cols-[0px_minmax(200px,_1fr)_auto] md:grid-cols-[100px_minmax(200px,_1fr)_auto] gap-4 p-2 w-full text-gray-400 bg-[#233142]">
      {/* left */}
      <div className="flex items-center">
        {/* logo */}
        <Link to="/" className="shrink-0 hidden md:block">
          <img className="w-[93px] h-[32px]" src="/logo.svg" alt="logo" />
        </Link>
      </div>

      {/* middle - nav items */}
      <div className="flex overflow-x-auto no-scrollbar line-clamp-1">
        <NavMenu />
      </div>

      {/* right */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            className="bg-transparent hover:bg-gray-700/50 transition-colors"
            shape="circle"
            type="text"
            icon={<BiSearchAlt className="text-gray-400 size-5" />}
          />
          <Button
            className="bg-transparent hover:bg-gray-700/50 transition-colors"
            shape="circle"
            type="text"
            icon={<GoBell className="text-gray-400 size-5" />}
          />
          <Button
            className="bg-transparent hover:bg-gray-700/50 transition-colors"
            shape="circle"
            type="text"
            icon={<IoSettingsOutline className="text-gray-400 size-5" />}
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
