import { useState } from "react";

import { useGetLookupTag } from "./use-get-lookup-tags";
import { useDebounce } from "../../../hooks/useDebounce";

export function useTagSelectOptions() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const { data: lookupTags, isFetching } = useGetLookupTag({
    take: 100,
    filters: {
      searchText: debouncedSearchText,
    },
  });

  const options =
    lookupTags?.map((tag: { id: string; name: string }) => ({
      key: tag.id,
      value: tag.id,
      label: tag.name,
    })) ?? [];

  const onSearch = (value: string) => {
    setSearchText(value);
  };

  return {
    options,
    loading: isFetching,
    onSearch,
    showSearch: true,
    filterOption: false,
  };
} 