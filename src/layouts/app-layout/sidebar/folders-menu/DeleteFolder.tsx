import { useDeleteFolder } from "../../../../pages/folder/use-delete-folder";

const DeleteFolder = ({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) => {
    const deleteFolder = useDeleteFolder();
    const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        deleteFolder.handleDelete(id);
    };
    return <div onClick={handleDelete}>{children}</div>;
};

export default DeleteFolder;
