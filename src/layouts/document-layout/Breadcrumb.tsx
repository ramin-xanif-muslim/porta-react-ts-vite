import classNames from "classnames";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import { Link } from "react-router-dom";
import { menuList } from "./sidebar/data-menu";
import { useGetFolders } from "../../pages/folder/api/use-get-folders";
import { t } from "i18next";
import { useBreadcrumbs } from "../../hooks/breadcrumbs";
import { useGlobalStore } from "../../store";
import { useListPageContext } from "../../HOC/withListPageContext";

const firstBreadcrumb = ["Home"];
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
  
    const { setCurrentPage, handleCloseAction } = useListPageContext();

    const selectFolderId = useGlobalStore((state) => state.selectFolderId);
  
    const handleSelectFolder = () => {
      const id = item.path.slice("/documents/documents/folders/".length)
      selectFolderId(id);
      setCurrentPage(1);
      handleCloseAction();
    };

  return (
    <Link
      to={item.path}
      onClick={handleSelectFolder}
      className={classNames({
        "flex flex-nowrap items-center font-semibold": true,
        "opacity-50": !isLast,
      })}
    >
      <span className="line-clamp-1 text-[14px]">{t(item.name)}</span>
      <span className="flex size-8 items-center p-2">
        {isLast ? <IoIosArrowDown /> : <IoIosArrowForward />}
      </span>
    </Link>
  );
};

const Breadcrumb = () => {
  const { data: folders } = useGetFolders();

  const items: BreadcrumbItemI[] = useBreadcrumbs(
    [menuList],
    folders || [],
    firstBreadcrumb,
  );

  return (
    <div>
      <div className="no-scrollbar hidden flex-nowrap items-center overflow-x-auto sm:flex">
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
