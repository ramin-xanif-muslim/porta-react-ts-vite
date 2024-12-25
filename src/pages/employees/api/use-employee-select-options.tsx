import { useState } from "react";

import { useGetLookupEmployee } from "./use-get-lookup-employee";
import { useDebounce } from "../../../hooks/useDebounce";


export function useEmployeeSelectOptions() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const { data: lookupEmployees, isFetching } = useGetLookupEmployee({
    take: 100,
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
    loading: isFetching,
    onSearch,
  };
}
