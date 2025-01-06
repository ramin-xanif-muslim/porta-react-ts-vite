import { useState, useEffect, useRef } from "react";
import { TableProps } from "antd/lib";
import { useQuery } from "@tanstack/react-query";
import { FormInstance, Table } from "antd";
import { t } from "i18next";
import { useDebounce } from "../../../hooks/useDebounce";
import { employeesApi } from "./employeesApi";
import { Employee } from "../types";

export function useEmployeeSelectTableOptions({
  form,
}: {
  form: FormInstance;
}) {
  const [searchText, setSearchText] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [debouncedSearchText] = useDebounce(searchText, 300);
  const dropdownRef = useRef<HTMLDivElement>(null);

  

const columns: TableProps<Employee>["columns"] = [
  {
    title: t("Avatar"),
    dataIndex: "avatar",
    key: "avatar",
    width: 100,
    ellipsis: true,
    render: (value?: string) => (
      <img
        src={value || "/avatar.jpg"}
        alt="avatar"
        className="size-9 rounded-full"
      />
    ),
  },
  {
    title: t("Full Name"),
    dataIndex: "fullName",
    key: "fullName",
    render: (_: unknown, record: Employee) => (
      <span className="line-clamp-1">
        {record.firstName} {record.lastName}
      </span>
    ),
  },
  {
    title: t("Email"),
    dataIndex: "email",
    key: "email",
  },
  {
    title: t("Office Number"),
    dataIndex: "officeNumber",
    key: "officeNumber",
  },
  {
    title: t("Position"),
    dataIndex: "positionName",
    key: "positionName",
  },
  {
    title: t("Is Office"),
    dataIndex: "isOffice",
    key: "isOffice",
  },
];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        isDropdownVisible
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  const query = useQuery({
    queryKey: [employeesApi.baseKey, "list", debouncedSearchText],
    queryFn: () =>
      employeesApi.getEmployeesList({
        filters: {
          searchText: debouncedSearchText,
        },
      }),
  });

  const onSearch = (value: string) => {
    setIsDropdownVisible(true);
    setSearchText(value);
  };

  const onSelect = (record: Employee) => {
    form.setFieldsValue({
      employeeId: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
    });

    setIsDropdownVisible(false);
  };

  const dropdownContainer = isDropdownVisible ? (
    <div
      ref={dropdownRef}
      className="absolute left-0 right-0 top-[60px] z-10 rounded border border-gray-300 bg-white shadow-md"
    >
      <Table

        loading={query.isFetching}
        size="small"
        dataSource={query?.data?.data.list}
        columns={columns}
        pagination={false}
        scroll={{ x: 1000, y: 300 }}
        onRow={(record) => ({
          onClick: () => onSelect(record),
        })}
        rowClassName="cursor-pointer"
      />
    </div>
  ) : null;

  const onFocus = () => {
    setIsDropdownVisible(true);
  };

  const options =
    query?.data?.data.list?.map((employee: Employee) => ({
      key: employee.id,
      value: employee.id,
      label: (
        <div className="flex w-full justify-between">
          <p className="line-clamp-1">{`${employee.firstName} ${employee.lastName}`}</p>
          <span>{employee.officeNumber}</span>
        </div>
      ),
    })) ?? [];

  return {
    dropdownContainer,
    selectOptions: {
      options,
      loading: query.isFetching,
      onSearch,
      onFocus,
    },
  };
}
