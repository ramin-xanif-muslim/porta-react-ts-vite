import { Drawer } from "antd";
import { t } from "i18next";
import { useModalStore } from "../store";
import { TagsListPage } from "../pages/tags";


export default function TagsListModal() {
  const { modalState, closeModal } = useModalStore();
  return (
    
    <Drawer
      title={t("Tags")}
      open={modalState?.["tags-list"]?.isOpen}
      onClose={() => closeModal("tags-list")}
      width={500}
      className="!bg-bg"
    >
      <TagsListPage />
    </Drawer>
  )
}
