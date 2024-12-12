import { PiUsersThreeBold } from "react-icons/pi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegStar, FaRegUserCircle } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CgInsights } from "react-icons/cg";



export interface MenuItemI {
    name: string;
    icon: React.ElementType;
    path: string;
}

export const menuList: MenuItemI[] = [
    {
        name: "Shared with me",
        icon: PiUsersThreeBold,
        path: "/document-management/shared-with-me",
    },
    {
        name: "Recents",
        icon: AiOutlineClockCircle,
        path: "/document-management/recents",
    },
    {
        name: "Starred",
        icon: FaRegStar,
        path: "/document-management/starred",
    },
    {
        name: "Bin",
        icon: FaRegTrashCan,
        path: "/document-management/bin",
    },
];

export const menuList2: MenuItemI[] = [
    {
        name: "Insights",
        icon: CgInsights,
        path: "/document-management/insights",
    },
    {
        name: "Users",
        icon: FaRegUserCircle,
        path: "/document-management/users",
    },
    {
        name: "Setting",
        icon: IoSettingsOutline,
        path: "/document-management/setting",
    },
];

export const menuList3: MenuItemI[] = [
    {
        name: "Log out",
        icon: CgInsights,
        path: "/log-out",
    },
];

export const menuLists = [menuList, menuList2];
