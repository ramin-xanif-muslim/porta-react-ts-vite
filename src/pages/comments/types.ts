export interface Comment {
  comment: string;
  documentId: string;
  id?: string;
}

export interface CommentDTO {
  id: string;
  createdOn: string;
  updatedOn: string;
  ownerDocumentId: string;
  userId: string;
  username: string;
  userFirstName: string;
  userLastName: string;
  comment: string;
  repliesCount: number;
}

export interface Reply {
  comment: string;
  userId: string;
}

export interface ReplyDTO {
  id: string;
  createdOn: string;
  updatedOn: string;
  ownerDocumentId: string;
  userId: string;
  username: string;
  userFirstName: string;
  userLastName: string;
  comment: string;
  repliesCount: number;
}
