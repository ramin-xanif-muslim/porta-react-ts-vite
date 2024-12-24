import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useGetLookupPositions } from "./use-get-lookup-positions";

const PAGE_SIZE = 100;

export function usePositionSelectOptions() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const { data: lookupPositions, isFetching } = useGetLookupPositions(
    {
      take: PAGE_SIZE,
      filters: {
        searchText: debouncedSearchText,
      },
    },
    {},
  );

  const options =
    lookupPositions?.map((position: { id: string; name: string }) => ({
      key: position.id,
      value: position.id,
      label: position.name,
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
