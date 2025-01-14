import { Avatar, Button, Dropdown, Popover, Spin } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

import { CommentDTO } from "../../types";
import { t } from "i18next";
import { RiFileEditLine } from "react-icons/ri";
import { useModalStore } from "../../../../store";
import { Replies } from "./Replies";

const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#99E6E6",
  "#B3B333",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
];

const getUserColor = (username: string) => {
  const sum = username
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[sum % colors.length];
};

export const CommentsList = ({
  documentId,
  comments,
  isLoading,
  isReplies,
}: {
  documentId: string;
  comments: CommentDTO[];
  isLoading: boolean;
  isReplies?: boolean;
}) => {
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set(),
  );
  const { openModal } = useModalStore();

  const toggleComment = (commentId: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  return (
    <Spin spinning={isLoading}>
      <div className="flex flex-col gap-2 w-full">
        {comments?.map((comment: CommentDTO) => {
          const isExpanded = expandedComments.has(comment.id);

          return (
            <div
              key={comment.id}
              className="relative flex w-full gap-2 rounded-lg bg-white p-2"
            >
              <div>
                <Avatar
                  style={{
                    backgroundColor: getUserColor(comment.username),
                  }}
                  size={isReplies ? 24 : 32}
                >
                  {comment.username.charAt(0).toUpperCase()}
                </Avatar>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                  <Popover content={`${comment.userFirstName} ${comment.userLastName} `}>
                    <span
                      className="font-bold"
                    >
                      {comment.username}
                    </span>
                  </Popover>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdOn), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <div className={isExpanded ? "" : "line-clamp-2"}>
                  {comment.comment}
                </div>
                <div className="flex gap-2">
                  {!isReplies && (
                    <Button
                      type="text"
                      size="small"
                      className="text-xs font-semibold text-blue-600"
                      onClick={() =>
                        openModal("create-reply", {
                          commentId: comment.id,
                          documentId: documentId,
                        })
                      }
                    >
                      {t("Reply")}
                    </Button>
                  )}
                  {comment.comment.length > 100 && (
                    <Button
                      type="text"
                      size="small"
                      className="text-xs font-semibold text-blue-600"
                      onClick={() => toggleComment(comment.id)}
                    >
                      {isExpanded ? t("Show less") : t("Read more")}
                    </Button>
                  )}
                </div>
                {comment.repliesCount > 0 && !isReplies && (
                  <Replies comment={comment} documentId={documentId} />
                )}
              </div>

              <div className="absolute right-0 top-2">
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "Edit",
                        label: t("Edit"),
                        icon: <RiFileEditLine size={18} />,
                      },
                    ],
                    onClick: () => {
                      openModal("update-comment", {
                        commentId: comment.id,
                        documentId: documentId,
                        comment: comment.comment,
                      });
                    },
                  }}
                  placement="bottomRight"
                  className="cursor-pointer"
                  overlayClassName="text-[#565D6DFF]"
                  trigger={["click"]}
                >
                  <BsThreeDotsVertical size={18} />
                </Dropdown>
              </div>
            </div>
          );
        })}
      </div>
    </Spin>
  );
};
