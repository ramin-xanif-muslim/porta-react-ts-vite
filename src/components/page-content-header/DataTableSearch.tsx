import { Input } from "antd";
import { startTransition, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import { useListPageContext } from "../../HOC/withListPageContext";
import { useDebounce } from "../../hooks/useDebounce";

export const DataTableSearch = () => {
  const { setSearchText, setCurrentPage } = useListPageContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [value, setValue] = useState(query);

  const debouncedSearch = useDebounce(value, 500);

  useEffect(() => {
    setSearchText(debouncedSearch.toString());
    return () => {
      setSearchText("");
    };
  }, [debouncedSearch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentPage(1)
    setValue(value);
    startTransition(() => {
      setSearchParams((prev) => {
        prev.delete("page");  
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
    <div className="flex flex-1 items-center gap-2 border-b border-gray-400 px-2">
      <BiSearchAlt className="size-5 text-gray-400" />
      <Input
        className="w-full border-none bg-transparent !shadow-none !outline-none"
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
        allowClear
      />
    </div>
  );
};
