import { Outlet } from "react-router-dom";
import { RiUploadLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import CreateFolderBnt from "./create-folder/CreateFolderBnt";



const FoldersLayout = () => {
    return (
        <div className="flex flex-col mt-2 bg-white p-2">
            <div className="flex items-center justify-between p-4">
                <div className="flex gap-3 ">
                    <button className="bg-brand flex items-center p-2 rounded-full text-white px-4 py-2">
                        <span>
                            <RiUploadLine />
                        </span>
                        <span className="ml-2 hidden sm:block">Upload</span>
                        <span className="ml-6">
                            <IoIosArrowDown />
                        </span>
                    </button>

                    <CreateFolderBnt />
                </div>

                <div>
                    <button className="border border-grayColor-50 flex items-center p-2 rounded-full px-4 py-2">
                        <span>
                            <IoFilter />
                        </span>
                        <span className="ml-2 hidden lg:block">Sort: Last Modified</span>
                        <span className="ml-6">
                            <HiOutlineArrowSmDown />
                        </span>
                    </button>
                </div>
            </div>

            <hr className="border border-grayColor-50" />


            <Outlet />
        </div>
    );
};

export default FoldersLayout;
