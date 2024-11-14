import { Link } from "react-router-dom";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../../../../components/ui/sheet";
import Sidebar from "../Sidebar";

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <div className="cursor-pointer">
                    <i className="fa-solid fa-bars"></i>
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

                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
