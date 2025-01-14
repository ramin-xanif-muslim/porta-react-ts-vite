import { API } from "../../../api/api-instance";
import { BaseQueryParams } from "../../../types/query-params";
import { Comment } from "../types";

export enum CommentsApi {
  comments = "/api/v0.01/vms/dms/documents/{documentId}/comments",
  list = "/api/v0.01/vms/dms/documents/{documentId}/comments/list",
  replies = "/api/v0.01/vms/dms/documents/{documentId}/comments/{commentId}/replies",
  repliesList = "/api/v0.01/vms/dms/documents/{documentId}/comments/{commentId}/replies/list",
}

export const commentsApi = {
  baseKey: "comments",

  getCommentsList: ({
    params,
    documentId,
  }: {
    params?: BaseQueryParams;
    documentId: string;
  }) => {
    const url = CommentsApi.list.replace("{documentId}", documentId);
    return API.post(url, params);
  },

  getComment: (id: string) => {
    const url = CommentsApi.comments + "/" + id;
    return API.get(url);
  },

  createComment: (data: Comment) =>
    API.post(CommentsApi.comments.replace("{documentId}", data.documentId), {
      comment: data.comment,
      userId: "169ee06b-903b-471c-98eb-75e11c3a6c1d",
    }),

  updateComment: ({ data, id }: { data: Comment; id: string }) => {
    const url = CommentsApi.comments + "/" + id;
    return API.put(url, data);
  },

  deleteComment: (id: string) => {
    const url = CommentsApi.comments + "/" + id;
    return API.delete(url);
  },

  getRepliesList: ({
    params = {},
    documentId,
    commentId,
  }: {
    params?: BaseQueryParams;
    documentId: string;
    commentId: string;
  }) => {
    const url = CommentsApi.repliesList.replace("{documentId}", documentId).replace("{commentId}", commentId);
    return API.post(url, params);
  },

  createReply: (data: { documentId: string; commentId: string; comment: string }) =>
    API.post(
      CommentsApi.replies.replace("{documentId}", data.documentId).replace(
        "{commentId}",
        data.commentId as string
      ),
      {
        comment: data.comment,
        userId: "169ee06b-903b-471c-98eb-75e11c3a6c1d",
      }
    ),

  updateReply: ({ data, id }: { data: Comment; id: string }) => {
    const url = CommentsApi.replies + "/" + id;
    return API.put(url, data);
  },
};
