import { Outlet } from "react-router-dom";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable";
import Sidebar from "./sidebar/Sidebar";
import { useGlobalStore } from "../../store";
import { withListPageContext } from "../../HOC/withListPageContext";

const DocumentManagementLayout = () => {
  const isOpenSidebar = useGlobalStore((state) => state.isOpenSidebar);
  const openSidebar = useGlobalStore((state) => state.openSidebar);

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
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

const DocumentManagementLayoutWithContext = withListPageContext(DocumentManagementLayout);

export default DocumentManagementLayoutWithContext;
