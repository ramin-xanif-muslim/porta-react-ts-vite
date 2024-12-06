export type FolderDTO = {
  id: string;
  name: string;
  parentId?: string | null | undefined;
};

interface DocumentDataDTO {
  // key?: string;
  // isSelected?: boolean;
  // sharedTo?: string;
  // dots?: string;

  fileName: string;
  name: string;
  fileSize: string;
  updatedOn: string;
  isFolder: boolean;
  id: string;
  fileExtension: string;
}

export interface DocumentVersionDTO {
  id: string;
  createdOn: string;
  number: number;
  fileName: string;
  fileExtension: string;
  fileSize: number;
}
