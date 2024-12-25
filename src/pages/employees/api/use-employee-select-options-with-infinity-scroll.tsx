import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useGetEmployeeInfinityQuery } from "./use-get-employee-infinity-query";
import { useIntersection } from "../../../hooks/useIntersection";

interface Employee {
  id: string;
  name: string;
}

export function useEmployeeSelectOptionsWithInfinityScroll() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const {
    data: lookupEmployees,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetEmployeeInfinityQuery({
    take: 100,
    filters: {
      searchText: debouncedSearchText,
    },
    requireTotalCount: true,
  });


  const handleIntersection = () => {
    if (
      !isFetchingNextPage &&
      !isFetching &&
      lookupEmployees?.totalCount &&
      lookupEmployees?.list.length < lookupEmployees.totalCount
    ) {
      fetchNextPage();
    }
  };

  const intersectionRef = useIntersection(handleIntersection, {
    threshold: 0.5,
    rootMargin: "20px",
  });

  const options =
    lookupEmployees?.list.map((employee: Employee) => ({
      key: employee.id,
      value: employee.id,
      label: employee.name,
    })) ?? [];

  // Add the intersection observer to the last option
  const optionsWithRef = options.map((option, index) => ({
    ...option,
    label: (
      <div ref={index === options.length - 1 ? intersectionRef : undefined}>
        {option.label}
      </div>
    ),
  }));

  const onSearch = (value: string) => {
    setSearchText(value);
  };

  return {
    options: optionsWithRef,
    loading: isFetching,
    onSearch,
  };
}
