import { useGetLookupEmployee } from "./use-get-lookup-employee";
import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

const PAGE_SIZE = 100;

export function useEmployeeSelectOptions() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const { data: lookupEmployees, isFetching } = useGetLookupEmployee({
    take: PAGE_SIZE,
    filters: {
      searchText: debouncedSearchText,
    },
  });

  const options =
    lookupEmployees?.map((employee: { id: string; name: string }) => ({
      key: employee.id,
      value: employee.id,
      label: employee.name,
    })) ?? [];

  const onSearch = (value: string) => {
    setSearchText(value);
  };

  return {
    options,
    isFetching,
    onSearch,
  };
}
