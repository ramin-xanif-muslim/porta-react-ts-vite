import { TbArrowsMoveVertical } from "react-icons/tb";

import { FaBuffer } from "react-icons/fa";
import FoldersMenu from "./folders-menu/FoldersMenu";
import { folders } from "../../../types/data";
import SidebarMenu from "./sidebar-menu/SidebarMenu";
import { menuList, menuList2, menuList3 } from "./data-menu";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useStore from "../../../store/useStore";
import classNames from "classnames";

const Sidebar = () => {
    const location = useLocation();
    const handleSelectMenu = useStore((state) => state.handleSelectMenu);

   
useEffect(() => {
    handleSelectMenu(location.pathname || "");
}, [location.pathname]);

    return (
        <div className="text-gray-500 overflow-y-auto h-screen md:h-[calc(100vh-100px)] no-scrollbar  py-8">
            <div className="mx-0 md:mx-8">
                <div
                    className={classNames({
                        "menu-item": true,
                    })}
                >
                    <div>
                        <FaBuffer className="text-brand size-5" />
                    </div>
                    <span className="text-black">MY PORTA</span>
                    <span className="flex flex-col ml-auto">
                        <TbArrowsMoveVertical />
                    </span>
                </div>

                <FoldersMenu folders={folders} />

                <SidebarMenu list={menuList} />
            </div>

            <hr className="border border-[#F3F4F6FF] my-5" />

            <div className="mx-2 md:mx-8 ">
                <h2 className="pl-4">ADMIN</h2>

                <SidebarMenu list={menuList2} />
            </div>

            <hr className="border border-[#F3F4F6FF] my-5" />

            <div className="mx-2 md:mx-8 ">

                <SidebarMenu list={menuList3} />

            </div>
        </div>
    );
};

export default Sidebar;
