import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import Profile from "./profile/Profile";
import { GoBell } from "react-icons/go";
import { BiSearchAlt } from "react-icons/bi";
import { Button } from "antd";
import NavMenu from "./NavMenu";


const Header = () => {
  return (
    <div className="flex items-center p-2 w-full text-gray-400 bg-[#233142]">
      {/* left */}
      <div className="flex items-center">
        {/* logo */}
        <Link to="/" className="shrink-0 hidden md:block">
          <img className="w-[93px] h-[32px]" src="/logo.svg" alt="logo" />
        </Link>

        {/* nav items */}
        <div className="ml-6">
          <NavMenu />
        </div>
      </div>

      {/* right */}
      <div className="ml-auto flex items-center shrink-0">
        <div className="">
          <Button
            className="bg-transparent"
            shape="circle"
            type="text"
            icon={<BiSearchAlt className="text-gray-400 size-5" />}
          />
          <Button
            className="bg-transparent"
            shape="circle"
            type="text"
            icon={<GoBell className="text-gray-400 size-5" />}
          />
          <Button
            className="bg-transparent"
            shape="circle"
            type="text"
            icon={<IoSettingsOutline className="text-gray-400 size-5" />}
          />
        </div>

        {/* user profile */}
        <div className="md:ml-6 ">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Header;
