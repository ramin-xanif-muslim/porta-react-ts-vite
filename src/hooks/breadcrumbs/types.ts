import { Folder } from "../../pages/folder/types";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface MenuItem {
  path: string;
  name: string;
}

export interface BreadcrumbUtils {
  createRootBreadcrumb: (name: string) => BreadcrumbItem;
  getFolderHierarchy: (folders: Folder[], currentFolderId: string) => Folder[];
  createFolderBreadcrumbs: (
    folders: Folder[],
    folderId: string,
    rootName: string,
  ) => BreadcrumbItem[];
  findMenuItemBreadcrumbs: (
    menuLists: MenuItem[][],
    currentPath: string,
    breadcrumbNames: string[],
  ) => BreadcrumbItem[] | null;
}
