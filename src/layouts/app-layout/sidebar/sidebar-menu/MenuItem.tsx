import { Link } from "react-router-dom";
import { MenuItemI } from "../data-menu";
import classNames from "classnames";

interface Props {
    item: MenuItemI;
    active: boolean;
}

const MenuItem = ({ item, active }: Props) => {
    return (
        <Link to={item.path} >
            <div
                className={classNames({
                    "menu-item": true,
                    "active-menu": active,
                })}
            >
                <div>
                    <item.icon className="size-6" />
                </div>
                <span>{item.name}</span>
            </div>
        </Link>
    );
};

export default MenuItem;
