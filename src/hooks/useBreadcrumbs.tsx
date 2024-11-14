import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FolderDTO } from '../types';

interface BreadcrumbItemI {
    name: string;
    path: string;
}

const useBreadcrumbs = (
    menuLists: Array<Array<{ path: string; name: string }>>,
    folders: FolderDTO[],
    firstBreadcrumb: string[]
) => {
    const location = useLocation();

    return useMemo(() => {
        const breadcrumbs: BreadcrumbItemI[] = [];
        const currentPath = location.pathname;

        // Handle root paths
        if (currentPath === "/" || currentPath === "/folders") {
            return [{
                name: firstBreadcrumb[0],
                path: "/"
            }];
        }

        // Handle folder paths
        if (currentPath.includes("/folders")) {
            // Add "All files" as first breadcrumb
            breadcrumbs.push({
                name: firstBreadcrumb[0],
                path: "/"
            });
            breadcrumbs.push({
                name: "All files",
                path: "/"
            });

            const folderId = currentPath.split("/")[2];
            if (!folderId) return breadcrumbs;

            // Build folder hierarchy
            const getFolderHierarchy = (currentFolderId: string): FolderDTO[] => {
                const folder = folders.find(f => f.id === currentFolderId);
                if (!folder) return [];
                
                if (folder.parentId) {
                    return [...getFolderHierarchy(folder.parentId), folder];
                }
                return [folder];
            };

            // Add all folders in hierarchy to breadcrumbs
            const folderHierarchy = getFolderHierarchy(folderId);
            folderHierarchy.forEach(folder => {
                breadcrumbs.push({
                    name: folder.name,
                    path: `/folders/${folder.id}`
                });
            });

            return breadcrumbs;
        }

        // Handle menu list paths
        for (let i = 0; i < menuLists.length; i++) {
            const foundItem = menuLists[i].find(item => item.path === currentPath);
            if (foundItem) {
                breadcrumbs.push({
                    name: firstBreadcrumb[i],
                    path: "/"
                });
                breadcrumbs.push({
                    name: foundItem.name,
                    path: foundItem.path
                });
                return breadcrumbs;
            }
        }

        // Fallback for unmatched paths
        return [{
            name: firstBreadcrumb[0],
            path: "/"
        }];
    }, [location.pathname, menuLists, folders, firstBreadcrumb]);
};

export default useBreadcrumbs;