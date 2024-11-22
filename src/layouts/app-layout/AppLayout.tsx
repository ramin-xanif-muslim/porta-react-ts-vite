import { CiCircleList } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Breadcrumb from "./Breadcrumb";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useStore from "../../store/useStore";

const AppLayout = () => {
    const isOpenSidebar = useStore((state) => state.isOpenSidebar);

    return (
        <div className="max-w-[1600px] mx-auto relative">
            <div className="h-[70px] md:h-[100px] z-10 flex items-center sticky top-0 left-0 right-0 bg-white px-2 md:px-8 ">
                <Header />
            </div>

            <div className="flex">
                {/* sidebar */}
                <AnimatePresence>
                    <motion.aside
                        initial={{ width: isOpenSidebar ? 0 : 300 }}
                        animate={{
                            width: isOpenSidebar ? 300 : 0,
                            transition: { duration: 0.3 },
                        }}
                        className="shrink-0 hidden md:block"
                    >
                        <Sidebar />
                    </motion.aside>
                </AnimatePresence>

                {/* content */}
                <div className="flex-1 h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] bg-[#F3F4F6FF]  p-4  overflow-y-auto no-scrollbar">
                    {/* content header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <Breadcrumb />
                        </div>

                        <div className="flex items-center">
                            <span className="p-2 cursor-pointer">
                                <CiCircleList className="size-[22px]" />
                            </span>
                            <span className="p-2 cursor-pointer bg-gray-200 rounded-full">
                                <IoIosInformationCircleOutline className="size-[22px]" />
                            </span>
                        </div>
                    </div>

                    <Outlet />
                </div>

                {/* right */}
                {/* <div className="w-[320px] shrink-0 hidden xl:block"></div> */}
            </div>
        </div>
    );
};

export default AppLayout;
