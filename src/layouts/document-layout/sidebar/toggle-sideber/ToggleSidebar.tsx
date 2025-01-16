
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useGlobalStore } from "../../../../store";
import MobileDocSidebar from "../mobile-document-sidebar/MobileDocSidebar";

export const ToggleSidebar = () => {
  const toggleSidebar = useGlobalStore((state) => state.toggleSidebar);
  const isOpenSidebar = useGlobalStore((state) => state.isOpenSidebar);
  return (
    <div>
      <div className="md:hidden">
        <MobileDocSidebar />
      </div>
      <div onClick={toggleSidebar} className="hidden cursor-pointer md:block">
        {isOpenSidebar ? (
          <AiOutlineMenuFold className="size-5" />
        ) : (
          <AiOutlineMenuUnfold className="size-5" />
        )}
      </div>
    </div>
  );
};
