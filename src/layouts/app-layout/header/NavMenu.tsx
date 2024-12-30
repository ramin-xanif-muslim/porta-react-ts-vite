import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { HEADER_NAV_ITEMS } from "../../../constants";
import { t } from "i18next";

const NavMenu = () => {
  return (
    <div className="flex items-center gap-4">
      {HEADER_NAV_ITEMS.map((item) => (
        <NavLink
          className={({ isActive }) =>
            classNames("font-medium hover:text-white truncate line-clamp-1", {
              "text-white": isActive,
              "hover:!text-white": isActive,
            })
          }
          to={item.path}
          key={item.path}
          onClick={() => {
            document.title = `${item.label} | HR Portal`;
          }}
        >
          {t(item.label)}
        </NavLink>
      ))}
    </div>
  );
};

export default NavMenu;
