import { Input } from "antd";
import { startTransition, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

export const DataTableSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchText, setSearchText] = useState(query);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    startTransition(() => {
      setSearchParams((prev) => {
        if (value === "") {
          prev.delete("q");
          return prev;
        }
        prev.set("q", value);
        return prev;
      });
    });
  };

  return (
    <div className="flex w-2/3 flex-1 items-center gap-2 border-b border-gray-400 px-2 py-1">
      <BiSearchAlt className="size-5 text-gray-400" />
      <Input
        className="w-full border-none bg-transparent !shadow-none !outline-none"
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={onChange}
        allowClear
      />
    </div>
  );
};
