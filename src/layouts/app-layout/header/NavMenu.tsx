import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { HEADER_NAV_ITEMS } from "../../../constants";
import { t } from "i18next";

const NavMenu = () => {
  return (
    <div className="flex items-center">
      {HEADER_NAV_ITEMS.map((item) => (
        <NavLink
          className={({ isActive }) =>
            classNames(
              "line-clamp-1 flex h-full min-w-[120px] items-center justify-center truncate text-[16px] font-medium transition-all hover:text-brand",
              {
                "w-full bg-brand-50 !font-bold text-brand-900 hover:!text-brand":
                  isActive,
              },
            )
          }
          to={item.path}
          key={item.path}
          onClick={() => {
            document.title = `${item.label}`;
          }}
        >
          <div className="flex items-center gap-2">
            {/* {<item.icon className="size-6" />} */}
            {t(item.label)}
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default NavMenu;
