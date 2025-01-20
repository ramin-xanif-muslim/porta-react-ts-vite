import { FaRegFolder } from "react-icons/fa6";
import { GrDocumentPdf } from "react-icons/gr";
import { CiImageOn } from "react-icons/ci";
import { BsFiletypePptx, BsFiletypeXlsx } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { GrDocumentTxt } from "react-icons/gr";
import { FaRegFileExcel } from "react-icons/fa";

interface Props {
  fileExtension: string;
  isFolder?: boolean;
}

export function getFileIcon(data: Props) {
  const { fileExtension, isFolder } = data;

  if (isFolder) return <FaRegFolder className="size-5 text-[#15ABFFFF]" />;

  switch (fileExtension) {
    case "zip":
      return <FaRegFolder className="size-5 text-[#15ABFFFF]" />;
    case "pdf":
      return <GrDocumentPdf className="size-5 text-[#DE3B40FF]" />;
    case "jpg":
      return <CiImageOn className="size-5 text-[#424856FF]" />;
    case "pptx":
      return <BsFiletypePptx className="size-5 text-[#D29211FF]" />;
    case "xlsx":
      return <BsFiletypeXlsx className="size-5 text-[#117B34FF]" />;
    case "doc":
    case "docx":
      return <CgFileDocument className="size-5 text-[#197DCAFF]" />;
    case "text":
    case "txt":
      return <GrDocumentTxt className="size-5 text-[#D29211FF]" />;
    default:
      return <FaRegFileExcel className="size-5 text-red-500" />;
  }
} 