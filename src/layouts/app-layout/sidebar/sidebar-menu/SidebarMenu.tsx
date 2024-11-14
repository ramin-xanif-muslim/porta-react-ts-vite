import { MenuItemI } from "../data-menu";
import MenuItem from "./MenuItem";
import useStore from "../../../../store/useStore";

const SidebarMenu = ({ list }: { list: MenuItemI[] }) => {
    const activeMenu = useStore((state) => state.activeMenu);
    return (
        <div>
            {list.map((item) => (
                <MenuItem key={item.name} item={item} active={activeMenu === item.path} />
            ))}
        </div>
    );
};

export default SidebarMenu;
