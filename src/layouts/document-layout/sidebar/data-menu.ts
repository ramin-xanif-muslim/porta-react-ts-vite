import { PiUsersThreeBold } from "react-icons/pi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";



export interface MenuItemI {
    name: string;
    icon: React.ElementType;
    path: string;
}

export const menuList: MenuItemI[] = [
    {
        name: "Shared with me",
        icon: PiUsersThreeBold,
        path: "/documents/documents/shared-with-me",
    },
    {
        name: "Recents",
        icon: AiOutlineClockCircle,
        path: "/documents/documents/recents",
    },
    {
        name: "Starred",
        icon: FaRegStar,
        path: "/documents/documents/starred",
    },
    {
        name: "Bin",
        icon: FaRegTrashCan,
        path: "/documents/documents/bin",
    },
];
