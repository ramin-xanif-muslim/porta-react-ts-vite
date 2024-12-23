import { Select } from "antd";
import { useGetLookupEmployee } from "../api/use-get-lookup-employee";
import { t } from "i18next";
import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useIntersection } from "../../../hooks/useIntersection";

interface EmployeeSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const PAGE_SIZE = 10;

export function EmployeeSelect({
  value,
  onChange,
  disabled,
}: EmployeeSelectProps) {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: lookupEmployees,
    isFetching,
    fetchNextPage,
  } = useGetLookupEmployee({
    skip: currentPage * PAGE_SIZE,
    take: PAGE_SIZE,
    filters: {
      searchText: debouncedSearchText,
    },
  });

  const onSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(0); // Reset to first page when searching
  };

  const intersectionRef = useIntersection(() => {
    fetchNextPage();
    console.log("fetchNextPage");
  });

  const options =
    lookupEmployees?.map(
      (employee: { id: string; name: string }, index: number) => ({
        key: employee.id,
        value: employee.id,
        label: (
          <div
            ref={lookupEmployees.length === index + 1 ? intersectionRef : null}
          >
            <span>{index + 1}.</span>
            <span>{employee.name}</span>
          </div>
        ),
      }),
    ) ?? [];

  return (
    <Select
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={t("Select employee")}
      onSearch={onSearch}
      filterOption={false}
      showSearch
      options={options}
      loading={isFetching}
    />
  );
}
