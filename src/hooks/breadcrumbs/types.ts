import { FolderDTO } from "../../types";

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
  getFolderHierarchy: (
    folders: FolderDTO[],
    currentFolderId: string,
  ) => FolderDTO[];
  createFolderBreadcrumbs: (
    folders: FolderDTO[],
    folderId: string,
    rootName: string,
  ) => BreadcrumbItem[];
  findMenuItemBreadcrumbs: (
    menuLists: MenuItem[][],
    currentPath: string,
    breadcrumbNames: string[],
  ) => BreadcrumbItem[] | null;
}
