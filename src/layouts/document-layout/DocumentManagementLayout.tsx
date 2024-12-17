import { Outlet } from "react-router-dom";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import { CiCircleList } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable";
import useStore from "../../store/useStore";
import Sidebar from "./sidebar/Sidebar";
import Breadcrumb from "./Breadcrumb";
import MobileDocSidebar from "./sidebar/mobile-document-sidebar/MobileDocSidebar";

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
    <div className="flex flex-col bg-white">
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
                className="hidden shrink-0 md:block"
              >
                <Sidebar />
              </motion.aside>
            </AnimatePresence>
          </ResizablePanel>
          <ResizableHandle withHandle={isOpenSidebar} />
          <ResizablePanel>
            {/* content */}
            <div className="no-scrollbar h-full flex-1 overflow-y-auto bg-[#F3F4F6FF] p-4">
              {/* content header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div>
                    <div className="md:hidden">
                      <MobileDocSidebar />
                    </div>
                    <div
                      onClick={toggleSidebar}
                      className="hidden cursor-pointer md:block"
                    >
                      {isOpenSidebar ? (
                        <AiOutlineMenuFold className="size-5" />
                      ) : (
                        <AiOutlineMenuUnfold className="size-5" />
                      )}
                    </div>
                  </div>

                  <Breadcrumb />
                </div>

                <div className="flex items-center">
                  <span className="cursor-pointer p-2">
                    <CiCircleList className="size-[22px]" />
                  </span>
                  <span className="cursor-pointer rounded-full bg-gray-200 p-2">
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
