
const SearchInput = () => {
    return (
        <div className="border flex-1 rounded-[22px] px-4 py-2 max-w-[640px] flex items-center  bg-grayColor-50">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
                className="outline-none px-2 bg-transparent placeholder:text-grayColor-400 flex-1"
                type="text"
                placeholder="Search"
            />
            <div className="cursor-pointer">
                <i className="fa-solid fa-sliders"></i>
            </div>
        </div>
    );
};

export default SearchInput;
