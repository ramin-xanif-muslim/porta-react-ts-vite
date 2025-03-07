import { Drawer, Form, Input, Tabs } from "antd";
import { t } from "i18next";

import { useGetCommentsList } from "../pages/comments/api/use-get-comments-list";
import { AddComment } from "../pages/comments/components/AddComment";
import { CommentsList } from "../pages/comments/components/comments-list";
// import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
// import { RiFileEditLine } from "react-icons/ri";

// import UploadFile from "../pages/document/components/dots-table-cell/UploadFile";
import { Document } from "../pages/document/types";
import { useModalStore } from "../store";
import DocumentVersionsList2 from "../pages/document/components/document-versions-list/DocumentVersionsList2";

export default function FolderDetailsModal() {
  const { modalState, closeModal } = useModalStore();
  const record = modalState?.["folder-details"]?.props?.record as Document;

  const { comments, isLoading, total } = useGetCommentsList({
    documentId: record.id,
  });

  return (
    <Drawer
      title={t("Details")}
      open={modalState?.["folder-details"]?.isOpen}
      onClose={() => closeModal("folder-details")}
      width={800}
      className="!bg-bg"
    >
      <Tabs
        // onChange={onChange}
        type="card"
        items={[
          {
            label: t("Info"),
            key: "Info",
            children: (
              <div className="w-[400px]">
                <Form layout="vertical">
                  <Form.Item label="Name" name="name">
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item label="Description" name="description">
                    <Input.TextArea placeholder="Description" />
                  </Form.Item>
                </Form>
              </div>
            ),
          },
          {
            label: t("Versions"),
            key: "Versions",
            children: (
              <DocumentVersionsList2
                documentId={record.id}
                folderId={record.id}
              />
            ),
          },
          {
            label: t("Comments"),
            key: "Comments",
            children: (
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">
                  {total} {t("Comments")}
                </h2>
                <AddComment documentId={record.id} />
                <CommentsList
                  documentId={record.id as string}
                  comments={comments}
                  isLoading={isLoading}
                />
              </div>
            ),
          },
        ]}
      />
      {/* <div className="flex gap-10">
        <UploadFile document={record}>
          <Button icon={<RiFileEditLine />}>{t("Edit file")}</Button>
        </UploadFile>
        <Button
          icon={<MdOutlineDriveFileRenameOutline />}
          onClick={() =>
            openModal("rename-document", {
              documentId: record.id,
              name: record.name,
            })
          }
        >
          {t("Edit Name")}
        </Button>
        <Button icon={<MdOutlineDriveFileRenameOutline />}>
          {t("Edit Tags")}
        </Button>
      </div> */}
    </Drawer>
  );
}
