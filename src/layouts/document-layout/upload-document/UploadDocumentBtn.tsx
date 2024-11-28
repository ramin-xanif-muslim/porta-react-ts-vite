import { RiUploadLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

const UploadDocumentBtn = () => {
  return (
    <button className="bg-brand hover:bg-brand-500 flex items-center p-2 rounded-full text-white px-4 py-2">
      <span>
        <RiUploadLine />
      </span>
      <span className="ml-2 hidden sm:block">Upload</span>
      <span className="ml-6">
        <IoIosArrowDown />
      </span>
    </button>
  );
};

export default UploadDocumentBtn;
