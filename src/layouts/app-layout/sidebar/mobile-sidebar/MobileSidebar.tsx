import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa6";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../../../../components/ui/sheet";
import AppSidebar from "../Sidebar";

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <div className="cursor-pointer">
                    <FaBars />
                </div>
            </SheetTrigger>
            <SheetContent side="left">
                {/* logo */}
                <Link to="/" className="shrink-0">
                    <img
                        className="w-[93px] h-[32px]"
                        src="/logo.svg"
                        alt="logo"
                    />
                </Link>

                <AppSidebar />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
