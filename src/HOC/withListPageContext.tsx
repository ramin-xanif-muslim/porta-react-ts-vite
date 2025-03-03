import { SorterResult, TablePaginationConfig } from "antd/es/table/interface";
import { t } from "i18next";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SortOption } from "../types/query-params";

interface ListPageContextType<T> {
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams),
  ) => void;
  // isDelete: boolean;
  // setIsDelete: (bool: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  sort: SortOption[];
  setSort: (sort: SortOption[]) => void;
  onTableChange: (sorter: SorterResult<T> | SorterResult<T>[]) => void;
  onPaginationChange: (page: number, size: number) => void;
  tablePaginationConfig: TablePaginationConfig;
  searchText: string;
  setSearchText: (text: string) => void;
  onFilterChange: (filter: Record<string, unknown>) => void;
  filterParams: Record<string, unknown>;
  setFilterParams: (filter: Record<string, unknown>) => void;
}

// Create a default type parameter that can be overridden
const ListPageContext = createContext<ListPageContextType<unknown> | undefined>(
  undefined,
) as React.Context<ListPageContextType<unknown> | undefined>;

export function withListPageContext<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithListPageContextComponent(props: P) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState<SortOption[]>(() => {
      const sortBy = searchParams.get("sortBy");
      if (!sortBy) return [];

      const [selector, order] = sortBy.split(".");
      return [
        {
          selector,
          desc: order === "descend",
        },
      ];
    });
    const [filterParams, setFilterParams] = useState<Record<string, unknown>>(
      () => {
        const filter = searchParams.get("filter");
        return filter ? JSON.parse(filter) : {};
      },
    );

    const [searchText, setSearchText] = useState(searchParams.get("q") || "");

    const onTableChange = (
      sorter: SorterResult<unknown> | SorterResult<unknown>[],
    ) => {
      if (!Array.isArray(sorter)) {
        const newSort: SortOption[] = sorter.field
          ? [
              {
                selector: sorter.field.toString(),
                desc: sorter.order === "descend",
              },
            ]
          : [];

        setSort(newSort);

        if (searchParams) {
          setSearchParams((prev) => {
            if (sorter.field) {
              prev.set("sortBy", `${sorter.field}.${sorter.order}`);
            } else {
              prev.delete("sortBy");
            }
            return prev;
          });
        }
      }
    };

    const onPaginationChange = (page: number, size: number) => {
      setCurrentPage(page);
      setPageSize(size);
    };

    const onFilterChange = (filters: Record<string, unknown>) => {
      setFilterParams(filters);
      setSearchParams((prev) => {
        prev.delete("page");
        setCurrentPage(1);
        prev.set("filter", JSON.stringify(filters));
        return prev;
      });
    };

    const tablePaginationConfig = useMemo(() => {
      return {
        current: currentPage,
        pageSize: pageSize,
        onChange: onPaginationChange,
        showSizeChanger: true,
        showTotal: (total: number) =>
          t(`Show {{currentPage}} to {{pageSize}} of {{total}}`, {
            total,
            currentPage,
            pageSize,
          }),
      };
    }, [currentPage, pageSize]);

    const contextValue: ListPageContextType<unknown> = {
      filterParams,
      setFilterParams,
      onFilterChange,
      searchText,
      setSearchText,
      onPaginationChange,
      onTableChange,
      searchParams,
      setSearchParams,
      currentPage,
      setCurrentPage,
      pageSize,
      setPageSize,
      sort,
      setSort,
      tablePaginationConfig,
    };

    return (
      <ListPageContext.Provider value={contextValue}>
        <WrappedComponent {...props} />
      </ListPageContext.Provider>
    );
  };
}

export const useListPageContext = <T,>() => {
  const context = useContext(ListPageContext);
  if (!context) {
    throw new Error(
      "useListPageContext must be used within a ListPageProvider",
    );
  }
  return context as ListPageContextType<T>;
};
