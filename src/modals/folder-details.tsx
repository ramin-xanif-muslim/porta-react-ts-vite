import { Drawer, Tabs } from "antd";
import { t } from "i18next";

import { DocumentNameEditInput } from "../components/edit-document-info-inputs";
import { DocumentDescriptionEditInput } from "../components/edit-document-info-inputs/DocumentDescriptionEditInput";
import { useGetCommentsList } from "../pages/comments/api/use-get-comments-list";
import { AddComment } from "../pages/comments/components/AddComment";
import { CommentsList } from "../pages/comments/components/comments-list";
import DocumentVersionsList from "../pages/document/components/document-versions-list/DocumentVersionsList";
import { Document } from "../pages/document/types";
import { useGlobalStore, useModalStore } from "../store";
import { DocumentFileEditInput } from "../components/edit-document-info-inputs/DocumentFileEditInput";
import { DocumentTagsEditInput } from "../components/edit-document-info-inputs/DocumentTagsEditInput";

export default function FolderDetailsModal() {
  const { modalState, closeModal } = useModalStore();
  const record = modalState?.["folder-details"]?.props?.record as Document;
  const selectedFolderId = useGlobalStore((state) => state.selectedFolderId);

  const { comments, isLoading, total } = useGetCommentsList({
    documentId: record.id,
  });

  return (
    <Drawer
      title={t("Details")}
      open={modalState?.["folder-details"]?.isOpen}
      onClose={() => closeModal("folder-details")}
      width={800}
      // className="!bg-bg"
    >
      <Tabs defaultActiveKey="1" tabPosition="top">
        <Tabs.TabPane className="mt-6" tab={t("Info")} key="1">
          <div className="w-[400px]">
            <div className="flex flex-col gap-4">
              <DocumentNameEditInput
                documentId={record.id}
                folderId={selectedFolderId}
              />
              <DocumentFileEditInput
                documentId={record.id}
                folderId={selectedFolderId}
              />
              <DocumentDescriptionEditInput
                documentId={record.id}
                folderId={selectedFolderId}
              />
              <DocumentTagsEditInput
                documentId={record.id}
                folderId={selectedFolderId}
              />
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane className="mt-6"  tab={t("Versions")} key="2">
          <DocumentVersionsList
            documentId={record.id}
            folderId={selectedFolderId}
          />
        </Tabs.TabPane>
        <Tabs.TabPane className="mt-6"  tab={t("Comments")} key="3">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">
              <span>{total}</span>
              <span className="ml-4">{t("Comments")}</span>
            </h2>
            <AddComment documentId={record.id} />
            <CommentsList
              documentId={record.id as string}
              comments={comments}
              isLoading={isLoading}
            />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Drawer>
  );
}
