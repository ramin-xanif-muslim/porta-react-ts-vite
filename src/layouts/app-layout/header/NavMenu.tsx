import classNames from "classnames";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Employee management",
    path: "/employee-management",
  },
  {
    label: "Document management",
    path: "/document-management",
  },
];

const NavMenu = () => {
  return (
    <div className="flex items-center gap-4">
      {navItems.map((item) => (
        <NavLink
          className={({ isActive }) =>
            classNames("font-medium hover:text-white", {
              "text-brand": isActive,
              "hover:!text-brand": isActive,
            })
          }
          to={item.path}
          key={item.path}
          onClick={() => {
            document.title = `${item.label} | HR Portal`;
          }}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

export default NavMenu;
