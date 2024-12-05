export type FolderDTO = {
  id: string;
  name: string;
  parentId?: string | null | undefined;
};

interface DocumentDataDTO {
  // key: string;
  // isSelected?: boolean;
  // sharedTo: string;

  fileName: string;
  name: string;
  fileSize: string;
  updatedOn: string;
  isFolder: boolean;
  id: string;
  fileExtension: string;
}
