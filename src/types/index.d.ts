export type FolderDTO = {
    id: string;
    name: string;
    parentId?: string | null;
};
export type FolderListItemDTO = {
    id: string;
    name: string;
    parentId?: string | null;
};


interface FolderDataDTO {
    key: string;
    id: string;
    name: string;
    size: string;
    lastModified: string;
    isSelected: boolean;
    sharedTo: string;
    folderId: string;
}