import { Folder } from "../../pages/folder/types";
import { BreadcrumbItem, MenuItem, BreadcrumbUtils } from "./types";

const createRootBreadcrumb = (name: string): BreadcrumbItem => ({
  name,
  path: "/documents/documents",
});

const getFolderHierarchy = (
  folders: Folder[],
  currentFolderId: string,
): Folder[] => {
  const folder = folders.find((f) => f.id === currentFolderId);
  if (!folder) return [];

  if (folder.parentId) {
    return [...getFolderHierarchy(folders, folder.parentId), folder];
  }
  return [folder];
};

const createFolderBreadcrumbs = (
  folders: Folder[],
  folderId: string,
  rootName: string,
): BreadcrumbItem[] => {
  const breadcrumbs = [createRootBreadcrumb(rootName)];

  const folderHierarchy = getFolderHierarchy(folders, folderId);
  const folderBreadcrumbs = folderHierarchy.map((folder) => ({
    name: folder.name,
    path: `/documents/documents/folders/${folder.id}`,
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
