import { Drawer } from "antd";
import { useModalStore } from "../store";
import { CommentsList } from "../pages/comments/components/comments-list";
import { useGetCommentsList } from "../pages/comments/api/use-get-comments-list";
import { AddComment } from "../pages/comments/components/AddComment";
import { t } from "i18next";

export default function CommentListModal() {
  const { modalState, closeModal } = useModalStore();
  const documentId = modalState?.["comment-list"]?.props?.documentId as string;
  const { comments, isLoading, total } = useGetCommentsList({
    documentId: documentId,
  });

  if (!documentId) return null;

  return (
    <Drawer
      title={
        <div className="">
          {total} {t("Comments")}
        </div>
      }
      open={modalState?.["comment-list"]?.isOpen}
      onClose={() => closeModal("comment-list")}
      width={500}
      className="!bg-bg"
    >
      <div className="flex flex-col gap-2">
        <AddComment documentId={documentId} />
        <CommentsList
          documentId={documentId as string}
          comments={comments}
          isLoading={isLoading}
        />
      </div>
    </Drawer>
  );
}
