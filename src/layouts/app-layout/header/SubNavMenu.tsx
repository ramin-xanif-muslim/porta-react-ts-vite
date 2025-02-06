import { useLocation, NavLink } from "react-router-dom";
import { useMemo } from "react";
import classNames from "classnames";
import { HEADER_NAV_ITEMS_SUB } from "../../../constants";
import { t } from "i18next";

const SubNavMenu = () => {
  const location = useLocation();

  const title = useMemo(() => {
    if (!location.pathname.split("/")[1]) return "";

    const pathSection = location.pathname.split("/")[1];
    return pathSection.charAt(0).toUpperCase() + pathSection.slice(1);
  }, [location.pathname]);

  // Get the current section's nav items
  const currentSectionNavItems =
    HEADER_NAV_ITEMS_SUB[
      location.pathname.split("/")[1] as keyof typeof HEADER_NAV_ITEMS_SUB
    ] || [];

  // Determine if any NavLink is active
  const isAnyNavLinkActive = currentSectionNavItems.some((item) =>
    location.pathname.includes(item.path),
  );

  if (title === "") return "";

  return (
    <div className="flex h-full w-full bg-brand px-4 text-white shadow-sm">
      <div className="mr-10 hidden items-center md:flex">
        <h1 className="line-clamp-1 text-2xl">{title}</h1>
      </div>
      <div className="flex  gap-1 items-center py-2">
        {currentSectionNavItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              classNames(
                "flex h-full cursor-pointer items-center justify-center rounded-md px-4 py-3 text-sm font-medium transition-all",
                {
                  // Active if explicitly active or if it's the first item and no other items are active
                  "!border-brand-400 bg-white !text-brand":
                    isActive || (!isAnyNavLinkActive && index === 0),
                  "hover:bg-brand-400 hover:text-brand":
                    !isActive,
                },
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
