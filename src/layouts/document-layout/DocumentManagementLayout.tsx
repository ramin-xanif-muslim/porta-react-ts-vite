import { Outlet } from "react-router-dom";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import { CiCircleList } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable";
import useStore from "../../store/useStore";
import Sidebar from "./sidebar/Sidebar";
import Breadcrumb from "./Breadcrumb";
import MobileSidebar from "./sidebar/mobile-sidebar/MobileSidebar";

const DocumentManagementLayout = () => {

  const isOpenSidebar = useStore((state) => state.isOpenSidebar);
  const openSidebar = useStore((state) => state.openSidebar);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  const defaultSize = localStorage.getItem("sidebar-width")
    ? Number(localStorage.getItem("sidebar-width"))
    : 20;

  const handleResize = (resize: number) => {
    localStorage.setItem("sidebar-width", resize.toString());
    if (!isOpenSidebar) openSidebar();
  };

  return (
    <div className="flex flex-col mt-2 bg-white p-2">
      <div className="flex">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={defaultSize}
            minSize={!isOpenSidebar ? 15 : 0}
            onResize={handleResize}
            className={classNames({
              "hidden md:block": true,
              "!hidden": !isOpenSidebar,
            })}
          >
            {/* sidebar */}
            <AnimatePresence>
              <motion.aside
                initial={{ minWidth: isOpenSidebar ? 0 : 300 }}
                animate={{
                  minWidth: isOpenSidebar ? 300 : 0,
                  transition: { duration: 0.3 },
                }}
                className="shrink-0 hidden md:block"
              >
                <Sidebar />
              </motion.aside>
            </AnimatePresence>
          </ResizablePanel>
          <ResizableHandle withHandle={isOpenSidebar} />
          <ResizablePanel>
            {/* content */}
            <div className="flex-1 h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] bg-[#F3F4F6FF]  p-4  overflow-y-auto no-scrollbar">
              {/* content header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div>
                    <div className="md:hidden">
                      <MobileSidebar />
                    </div>
                    <div
                      onClick={toggleSidebar}
                      className="cursor-pointer hidden md:block"
                    >
                      <FaBars />
                    </div>
                  </div>

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
          </ResizablePanel>

          {/* right */}
          {/* <div className="w-[320px] shrink-0 hidden xl:block"></div> */}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default DocumentManagementLayout;
