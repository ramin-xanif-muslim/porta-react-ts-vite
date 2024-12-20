import { BreadcrumbItem, MenuItem, BreadcrumbUtils } from "./types";
import { FolderDTO } from "../../types";

const createRootBreadcrumb = (name: string): BreadcrumbItem => ({
  name,
  path: "/document-management/documents",
});

const getFolderHierarchy = (
  folders: FolderDTO[],
  currentFolderId: string,
): FolderDTO[] => {
  const folder = folders.find((f) => f.id === currentFolderId);
  if (!folder) return [];

  if (folder.parentId) {
    return [...getFolderHierarchy(folders, folder.parentId), folder];
  }
  return [folder];
};

const createFolderBreadcrumbs = (
  folders: FolderDTO[],
  folderId: string,
  rootName: string,
): BreadcrumbItem[] => {
  const breadcrumbs = [createRootBreadcrumb(rootName)];

  const folderHierarchy = getFolderHierarchy(folders, folderId);
  const folderBreadcrumbs = folderHierarchy.map((folder) => ({
    name: folder.name,
    path: `/document-management/documents/folders/${folder.id}`,
  }));

  return [...breadcrumbs, ...folderBreadcrumbs];
};

const findMenuItemBreadcrumbs = (
  menuLists: MenuItem[][],
  currentPath: string,
  breadcrumbNames: string[],
): BreadcrumbItem[] | null => {
  for (let i = 0; i < menuLists.length; i++) {
    const foundItem = menuLists[i].find((item) => item.path === currentPath);
    if (foundItem) {
      return [
        createRootBreadcrumb(breadcrumbNames[i]),
        { name: foundItem.name, path: foundItem.path },
      ];
    }
  }
  return null;
};

export const breadcrumbUtils: BreadcrumbUtils = {
  createRootBreadcrumb,
  getFolderHierarchy,
  createFolderBreadcrumbs,
  findMenuItemBreadcrumbs,
};
