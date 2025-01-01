import { useLocation, NavLink } from "react-router-dom";
// import { useMemo } from "react";
import classNames from "classnames";
import { HEADER_NAV_ITEMS_SUB } from "../../../constants";
import { t } from "i18next";

const SubNavMenu = () => {
  const location = useLocation();

  // const title = useMemo(() => {
  //   return document.title.split("|")[0] || location.pathname.split("/")[1];
  // }, [location.pathname]);

  // Get the current section's nav items
  const currentSectionNavItems =
    HEADER_NAV_ITEMS_SUB[
      location.pathname.split("/")[1] as keyof typeof HEADER_NAV_ITEMS_SUB
    ] || [];

  // Determine if any NavLink is active
  const isAnyNavLinkActive = currentSectionNavItems.some((item) =>
    location.pathname.includes(item.path),
  );

  return (
    <div className="grid-col-1 grid w-full bg-brand px-4 text-brand-200 shadow-sm md:grid-cols-3 h-full ">
      {/* <div className="hidden md:flex">
        <h1 className="line-clamp-1 text-2xl font-bold">{title}</h1>
      </div> */}
      <div className="flex items-center">
        {currentSectionNavItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              classNames(
                "cursor-pointer px-4 border-l-2 border-transparent text-sm font-medium transition-all h-full flex items-center justify-center hover:bg-brand-500 hover:text-white",
                {
                  // Active if explicitly active or if it's the first item and no other items are active
                  "bg-brand-600 !border-brand-400  !text-white":
                    isActive || (!isAnyNavLinkActive && index === 0),
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
