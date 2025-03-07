import { Button } from "antd";
import classNames from "classnames";
import { BsFilter } from "react-icons/bs";

import { useListPageContext } from "../../HOC/withListPageContext";

export const FilterBtn = () => {
  const { visibleAdditionalFilters, setVisibleAdditionalFilters } =
    useListPageContext();
  return (
    <Button
      icon={<BsFilter className="size-4" />}
      onClick={() => setVisibleAdditionalFilters(!visibleAdditionalFilters)}
      className={classNames({
        "bg-brand-200 hover:!bg-brand-200": visibleAdditionalFilters,
      })}
    />
  );
};
