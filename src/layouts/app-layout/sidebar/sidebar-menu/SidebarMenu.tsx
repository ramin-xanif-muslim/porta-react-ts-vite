import { MenuItemI } from "../data-menu";
import MenuItem from "./MenuItem";
import { useLocation } from "react-router-dom";

const SidebarMenu = ({ list }: { list: MenuItemI[] }) => {
    const { pathname } = useLocation();
    return (
        <div>
            {list.map((item) => (
                <MenuItem
                    key={item.name}
                    item={item}
                    active={pathname === item.path}
                />
            ))}
        </div>
    );
};

export default SidebarMenu;
