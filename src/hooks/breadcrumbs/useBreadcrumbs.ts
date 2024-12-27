import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { BreadcrumbItem, MenuItem } from "./types";
import { breadcrumbUtils } from "./utils";
import { Folder } from "../../pages/folder/types";

const useBreadcrumbs = (
  menuLists: MenuItem[][],
  folders: Folder[],
  firstBreadcrumb: string[],
): BreadcrumbItem[] => {
  const location = useLocation();
  const {
    createRootBreadcrumb,
    createFolderBreadcrumbs,
    findMenuItemBreadcrumbs,
  } = breadcrumbUtils;

  return useMemo(() => {
    const currentPath = location.pathname;

    // Handle root paths
    if (
      currentPath === "/document-management/documents" ||
      currentPath === "/document-management/documents/folders"
    ) {
      return [createRootBreadcrumb(firstBreadcrumb[0])];
    }

    // Handle folder paths
    if (currentPath.includes("document-management/documents/folders")) {
      const folderId = currentPath.split("/")[4];
      if (!folderId) return [createRootBreadcrumb(firstBreadcrumb[0])];

      return createFolderBreadcrumbs(folders, folderId, firstBreadcrumb[0]);
    }

    // Handle menu list paths
    const menuBreadcrumbs = findMenuItemBreadcrumbs(
      menuLists,
      currentPath,
      firstBreadcrumb,
    );
    if (menuBreadcrumbs) {
      return menuBreadcrumbs;
    }

    // Fallback for unmatched paths
    return [createRootBreadcrumb(firstBreadcrumb[0])];
  }, [location.pathname, menuLists, folders, firstBreadcrumb]);
};

export default useBreadcrumbs;
