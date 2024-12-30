import { useLocation, NavLink } from "react-router-dom";
import { useMemo } from "react";
import classNames from "classnames";
import { HEADER_NAV_ITEMS_SUB } from "../../../constants";
import { t } from "i18next";

const SubNavMenu = () => {
  const location = useLocation();

  const title = useMemo(() => {
    return document.title.split("|")[0] || location.pathname.split("/")[1];
  }, [location.pathname]);

  // Get the current section's nav items
  const currentSectionNavItems =
    HEADER_NAV_ITEMS_SUB[
      location.pathname.split("/")[1] as keyof typeof HEADER_NAV_ITEMS_SUB
    ] || [];

  // Determine if any NavLink is active
  const isAnyNavLinkActive = currentSectionNavItems.some((item) =>
    location.pathname.includes(item.path)
  );

  return (
    <div className="w-full px-4 grid grid-col-1 md:grid-cols-3 bg-white shadow-sm">
      <div className="hidden md:flex">
        <h1 className="text-2xl font-bold  line-clamp-1">{title}</h1>
      </div>
      <div className="flex items-center justify-center gap-4">
        {currentSectionNavItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              classNames(
                "text-sm font-medium p-2 text-gray-500 border-white border-b-2 cursor-pointer transition-all",
                {
                  // Active if explicitly active or if it's the first item and no other items are active
                  "!text-brand !border-brand-400 border-b-2":
                    isActive || (!isAnyNavLinkActive && index === 0),
                }
              )
            }
          >
            <div>{t(item.label)}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SubNavMenu;
