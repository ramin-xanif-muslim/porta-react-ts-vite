import { useState } from "react";

import { useGetRolesList } from "./use-get-roles-list";

interface Option {
  key: string;
  value: string;
  label: string;
}

export function useRoleSelectOptions() {
  const [searchText, setSearchText] = useState("");

  const { roles, isLoading } = useGetRolesList();

  const options =
    roles?.map((role: { id: string; name: string }) => ({
      key: role.id,
      value: role.id,
      label: role.name,
    })) ?? [];

  const onSearch = (value: string) => {
    setSearchText(value);
  };

  return {
    options: options.filter((option: Option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase()),
    ),
    loading: isLoading,
    onSearch,
  };
}
