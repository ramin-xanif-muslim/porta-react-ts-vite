import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FolderDTO } from '../types';

interface BreadcrumbItem {
    name: string;
    path: string;
}

interface MenuItem {
    path: string;
    name: string;
}

const createRootBreadcrumb = (name: string): BreadcrumbItem => ({
    name,
    path: "/document-management/documents"
});

const getFolderHierarchy = (
    folders: FolderDTO[],
    currentFolderId: string
): FolderDTO[] => {
    const folder = folders.find(f => f.id === currentFolderId);
    if (!folder) return [];
    
    if (folder.parentId) {
        return [...getFolderHierarchy(folders, folder.parentId), folder];
    }
    return [folder];
};

const createFolderBreadcrumbs = (
    folders: FolderDTO[],
    folderId: string,
    rootName: string
): BreadcrumbItem[] => {
    const breadcrumbs = [createRootBreadcrumb(rootName)];
    
    const folderHierarchy = getFolderHierarchy(folders, folderId);
    const folderBreadcrumbs = folderHierarchy.map(folder => ({
        name: folder.name,
        path: `/document-management/documents/folders/${folder.id}`
    }));
    
    return [...breadcrumbs, ...folderBreadcrumbs];
};

const findMenuItemBreadcrumbs = (
    menuLists: MenuItem[][],
    currentPath: string,
    breadcrumbNames: string[]
): BreadcrumbItem[] | null => {
    for (let i = 0; i < menuLists.length; i++) {
        const foundItem = menuLists[i].find(item => item.path === currentPath);
        if (foundItem) {
            return [
                createRootBreadcrumb(breadcrumbNames[i]),
                { name: foundItem.name, path: foundItem.path }
            ];
        }
    }
    return null;
};

const useBreadcrumbs = (
    menuLists: MenuItem[][],
    folders: FolderDTO[],
    firstBreadcrumb: string[]
): BreadcrumbItem[] => {
    const location = useLocation();

    return useMemo(() => {
        const currentPath = location.pathname;

        // Handle root paths
        if (currentPath === "/document-management/documents" || currentPath === "/document-management/documents/folders") {
            return [createRootBreadcrumb(firstBreadcrumb[0])];
        }

        // Handle folder paths
        if (currentPath.includes("document-management/documents/folders")) {
            const folderId = currentPath.split("/")[4];
            if (!folderId) return [createRootBreadcrumb(firstBreadcrumb[0])];
            
            return createFolderBreadcrumbs(folders, folderId, firstBreadcrumb[0]);
        }

        // Handle menu list paths
        const menuBreadcrumbs = findMenuItemBreadcrumbs(menuLists, currentPath, firstBreadcrumb);
        if (menuBreadcrumbs) {
            return menuBreadcrumbs;
        }

        // Fallback for unmatched paths
        return [createRootBreadcrumb(firstBreadcrumb[0])];
    }, [location.pathname, menuLists, folders, firstBreadcrumb]);
};

export default useBreadcrumbs;