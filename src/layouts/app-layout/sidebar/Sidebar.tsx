import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { FaBuffer, FaRegFolder } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { buildHierarchy } from "../../../lib/utils";

// Sample data
const data = [
    { id: "1", name: "Work Documents", parentId: null },
    { id: "2", name: "Personal Files", parentId: null },
    { id: "3", name: "Projects", parentId: "1" },
    { id: "4", name: "Reports", parentId: "1" },
    { id: "5", name: "Photos", parentId: "2" },
    { id: "6", name: "Vacation", parentId: "5" },
    { id: "7", name: "Invoices", parentId: "3" },
    { id: "8", name: "2024", parentId: "4" },
    { id: "9", name: "2023", parentId: "4" },
    { id: "10", name: "Trip to Paris", parentId: "6" },
];

const Sidebar = () => {
    console.log(JSON.stringify(buildHierarchy(data), null, 2));
    return (
        <>
            <div className="border border-brand mx-2 md:mx-8 ">
                {/* item */}
                <div className="flex items-center gap-2 px-4 h-11 cursor-pointer">
                    <div>
                        <FaBuffer className="text-brand size-5" />
                    </div>
                    <span>MY PORTA</span>
                    <span className="flex flex-col ml-auto">
                        <MdOutlineKeyboardArrowUp />{" "}
                        <MdOutlineKeyboardArrowDown />
                    </span>
                </div>

                <div className="flex items-center gap-2 px-4 h-11 cursor-pointer bg-brand-200  text-[#6d31edff] font-[700]">
                    <div>
                        <FaRegFolder className="text-brand size-6" />
                    </div>
                    <span>All files</span>
                    <span className="flex flex-col ml-auto">
                        <IoIosArrowForward className="hover:rotate-90 transition-all" />
                    </span>
                </div>
            </div>

            <hr className="border border-[#F3F4F6FF] mt-5" />
        </>
    );
};

export default Sidebar;
