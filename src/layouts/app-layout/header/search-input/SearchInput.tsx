
const SearchInput = () => {
    return (
        <div className="border flex-1 rounded-[22px] px-4 py-2 max-w-[640px] flex items-center  bg-[#F3F4F6FF]">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
                className="outline-none px-2 bg-transparent placeholder:text-[#A7B9C4] flex-1"
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
