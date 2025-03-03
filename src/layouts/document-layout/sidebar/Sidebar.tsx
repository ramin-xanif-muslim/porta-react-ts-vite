import FoldersMenu from "./folders-menu/FoldersMenu";
import SidebarMenu from "./sidebar-menu/SidebarMenu";
import { menuList } from "./data-menu";

const Sidebar = () => {
  return (
    <div className="no-scrollbar h-screen min-w-[250px] overflow-y-auto py-8 text-gray-500 md:h-[calc(100vh-100px)]">
      <div className="">

        <FoldersMenu />

        <hr className="my-5 border border-[#F3F4F6FF]" />

        <SidebarMenu list={menuList} />

        <hr className="my-5 border border-[#F3F4F6FF]" />
      </div>
    </div>
  );
};

export default Sidebar;
