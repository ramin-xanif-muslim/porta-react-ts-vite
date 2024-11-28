import classNames from "classnames";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import { Link } from "react-router-dom";
import { menuLists } from "./sidebar/data-menu";
import useBreadcrumbs from "../../hooks/useBreadcrumbs";
import { useGetFolders } from "../../pages/folder/use-get-folders";

const firstBreadcrumb = ["MY PORTA", "ADMIN"];
interface BreadcrumbItemI {
  name: string;
  path: string;
}

interface Props {
  item: BreadcrumbItemI;
  items: BreadcrumbItemI[];
}

const BreadcrumbItem = ({ item, items }: Props) => {
  const isLast = items.length - 1 === items.indexOf(item);
  return (
    <Link
      to={item.path}
      className={classNames({
        "flex items-center font-semibold flex-nowrap": true,
        "opacity-50": !isLast,
      })}
    >
      <span className="text-[14px] line-clamp-1">{item.name}</span>
      <span className="size-8 flex items-center p-2">
        {isLast ? <IoIosArrowDown /> : <IoIosArrowForward />}
      </span>
    </Link>
  );
};

const Breadcrumb = () => {
  const { data: folders } = useGetFolders();

  const items: BreadcrumbItemI[] = useBreadcrumbs(
    menuLists,
    folders || [],
    firstBreadcrumb
  );

  return (
    <div>
      <div className="hidden sm:flex items-center  flex-nowrap overflow-x-auto no-scrollbar">
        {items?.map((item, index) => (
          <BreadcrumbItem key={index} item={item} items={items} />
        ))}
      </div>
      <div className="sm:hidden">
        <BreadcrumbItem item={items[items.length - 1]} items={items} />
      </div>
    </div>
  );
};

export default Breadcrumb;
