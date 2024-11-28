export type FolderDTO = {
    id: string;
    name: string;
    parentId?: string | null | undefined;
};


interface FolderDataDTO {
    key: string;
    id: string;
    name: string;
    fileSize: string;
    updatedOn: string;
    isSelected?: boolean;
    isFolder: boolean;
    sharedTo: string;
    folderId: string;
    fileExtension: string;
}