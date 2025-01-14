import { useState } from "react";
import { useGetRepliesList } from "../../api/use-get-replies-list";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { t } from "i18next";
import { CommentDTO } from "../../types";
import { Spin } from "antd";
import { CommentsList } from "./CommentsList";

export const Replies = ({
  comment,
  documentId,
}: {
  comment: CommentDTO;
  documentId: string;
}) => {
  const [showRepliesList, setShowRepliesList] = useState(false);
  const { replies, isLoading: repliesLoading } = useGetRepliesList({
    commentId: comment.id,
    documentId: documentId,
    enabled: showRepliesList,
  });

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className="flex cursor-pointer items-center gap-1 text-xs text-gray-500"
        onClick={() => setShowRepliesList((prev) => !prev)}
      >
        {showRepliesList ? (
          <FaChevronUp size={8} />
        ) : (
          <FaChevronDown size={8} />
        )}
        <Spin spinning={repliesLoading}>
          <span>
            {comment.repliesCount} {t("replies")}
          </span>
        </Spin>
      </div>
      {showRepliesList && (
        <CommentsList
          documentId={documentId}
          comments={replies}
          isLoading={repliesLoading}
          isReplies
        />
      )}
    </div>
  );
};
