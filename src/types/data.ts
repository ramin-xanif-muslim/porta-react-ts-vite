import { FolderDTO } from ".";

export const folders: FolderDTO[] = [
    { id: "1", name: "Work Documents", parentId: null },
    { id: "2", name: "Personal Files", parentId: null },
    { id: "3", name: "Projects", parentId: "1" },
    { id: "4", name: "Reports", parentId: "1" },
    { id: "5", name: "Photos", parentId: "2" },
    { id: "6", name: "Vacation", parentId: "5" },
    { id: "7", name: "Invoices", parentId: "3" },
    { id: "8", name: "2024", parentId: "4" },
    { id: "9", name: "2023", parentId: "4" },
    { id: "10", name: "Trip to Paris", parentId: "6" },
];