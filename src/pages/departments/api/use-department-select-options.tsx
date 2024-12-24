import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useGetLookupDepartments } from "./use-get-lookup-departments";

const PAGE_SIZE = 100;

export function useDepartmentSelectOptions() {
  const [searchText, setSearchText] = useState("");
  // const [isFocused, setIsFocused] = useState(false);
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const { data: lookupDepartments, isFetching } = useGetLookupDepartments({
    take: PAGE_SIZE,
    filters: {
      searchText: debouncedSearchText,
    },
  },
  //  { enabled: isFocused }
  );

  const options =
    lookupDepartments?.map((department: { id: string; name: string }) => ({
      key: department.id,
      value: department.id,
      label: department.name,
    })) ?? [];

  const onSearch = (value: string) => {
    setSearchText(value);
  };

  // const onFocus = () => {
  //   setIsFocused(true);
  // };

  return {
    options,
    isFetching,
    onSearch,
    // onFocus,
  };
}
