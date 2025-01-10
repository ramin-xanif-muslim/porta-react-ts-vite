import { t } from "i18next";

const SearchInput = () => {
  return (
    <div className="hidden md:flex h-[30px] max-w-[340px] items-center rounded-[22px] border border-black px-4 py-2 flex-1">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        className="bg-transparent px-2 outline-none placeholder:text-gray"
        type="text"
        placeholder={`${t("Search")}...`}
      />
    </div>
  );
};

export default SearchInput;
