import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import SearchInput from "./search-input/SearchInput";
import Profile from "./profile/Profile";
import MobileSidebar from "../sidebar/mobile-sidebar/MobileSidebar";

const Header = () => {
    return (
        <div className="flex items-center gap-2 md:gap-0  w-full bg-[#FFF]">
            {/* left */}
            <div className="flex items-center gap-8 md:min-w-[308px]">
                <div className="md:hidden">
                    <MobileSidebar />
                </div>

                {/* logo */}
                <Link to="/" className="shrink-0 hidden md:block">
                    <img
                        className="w-[93px] h-[32px]"
                        src="/logo.svg"
                        alt="logo"
                    />
                </Link>
            </div>

            {/* search */}
            <div className="ml-4 w-full">
                <SearchInput />
            </div>

            {/* right */}
            <div className="ml-auto flex items-center shrink-0">
                <div className="hidden cursor-pointer bg-[#F3F4F6FF] size-8 lg:flex items-center justify-center rounded-full">
                    <i className="fa-regular fa-bell"></i>
                </div>
                <div className="hidden cursor-pointer ml-2 bg-brand size-8 lg:flex items-center justify-center rounded-full">
                    <IoSettingsOutline className="text-white size-5" />
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
