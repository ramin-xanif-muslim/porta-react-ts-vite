import { MdOutlineDeleteForever } from "react-icons/md";
import { useDeleteFolder } from "../../../../pages/folder/use-delete-folder";

const DeleteFolder = ({ id }: { id: string }) => {

    const deleteFolder = useDeleteFolder()
    const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        deleteFolder.handleDelete(id);
    };
    return (
        <div
            onClick={handleDelete}
            className="cursor-pointer hover:bg-red-100 rounded-full p-1"
        >
            <MdOutlineDeleteForever className="size-4 hover:text-red-600 hidden group-hover:block " />
        </div>
    );
};

export default DeleteFolder;
