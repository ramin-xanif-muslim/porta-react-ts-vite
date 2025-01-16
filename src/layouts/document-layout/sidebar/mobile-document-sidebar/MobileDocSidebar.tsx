import { FaBars } from "react-icons/fa6";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../../components/ui/sheet";
import AppSidebar from "../Sidebar";

const MobileDocSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="cursor-pointer">
          <FaBars />
        </div>
      </SheetTrigger>
      <SheetContent side="left">
        <AppSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileDocSidebar;
