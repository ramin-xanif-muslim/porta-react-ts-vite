import { Button } from "antd";
import { t } from "i18next";
import { useState } from "react";
import { queryClient } from "../../../api/query-client";
import { commentsApi, useCreateComment } from "../api";

export const AddComment = ({ documentId }: { documentId: string }) => {
  const [comment, setComment] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const onSuccessCallback = () => {
    setComment("");
    queryClient.invalidateQueries({
      queryKey: [commentsApi.baseKey],
    });
  };

  const { mutate: createComment, isPending } =
    useCreateComment(onSuccessCallback);

  const handleCreate = () => {
    createComment({ comment, documentId });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <input
        value={comment}
        disabled={isPending}
        className="w-full border-b-2 bg-transparent outline-none"
        placeholder={t("Add a comment")}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreate();
          }
        }}
      />
      <div className="flex h-8 w-full justify-end">
        {!!comment && (
          <div className="ml-auto flex gap-2">
            <Button type="text" onClick={() => setComment("")}>
              {t("Cancel")}
            </Button>
            <Button type="primary" onClick={handleCreate} loading={isPending}>
              {isPending ? t("Adding...") : t("Add comment")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
