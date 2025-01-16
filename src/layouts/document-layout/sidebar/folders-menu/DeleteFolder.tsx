import { useDeleteFolder } from "../../../../pages/folder/api/use-delete-folder";

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
    deleteFolder.mutate(id);
  };
  return <div onClick={handleDelete}>{children}</div>;
};

export default DeleteFolder;
