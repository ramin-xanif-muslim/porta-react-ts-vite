import { RiUploadLine } from "react-icons/ri";
import { t } from "i18next";
import { CreateBtn } from "../ui/buttons";

const UploadDocumentBtn = () => {
  return (
    <CreateBtn icon={<RiUploadLine />}>{t("Upload")}</CreateBtn>
  );
};

export default UploadDocumentBtn;
