import { Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { useUpdateFolder } from "../../../../pages/folder/use-update-folder";
import useStore from "../../../../store/useStore";

const RenameFolder = ({
  folderName,
  id,
  parentId,
}: {
  folderName: string;
  id: string;
  parentId?: string | null | undefined;
}) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState<string>(folderName);

  const renamedFolder = useStore((state) => state.renamedFolder);
  const setRenamedFolder = useStore((state) => state.setRenamedFolder);

  useEffect(() => {
    if (renamedFolder === id) {
      onDoubleClick();
    }

    return () => {};
  }, [renamedFolder]);

  const updateFolder = useUpdateFolder();

  const onBlur = () => {
    setEdit(false);
    setRenamedFolder(null);
  };

  const onDoubleClick = () => {
    setEdit(true);
    setName(folderName);
  };

  const handleCancel = () => {
    setName(folderName);
    setEdit(false);
    setRenamedFolder(null);
  };

  const handleUpdate = () => {
    if (name.trim() !== folderName.trim()) {
      updateFolder.handleUpdate({ id, name: name.trim(), parentId });
    }
    setEdit(false);
    setRenamedFolder(null);
  };

  return (
    <Spin spinning={updateFolder.isPending}>
      <div className="w-full" onDoubleClick={onDoubleClick}>
        {edit ? (
          <Input
            size="small"
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={onBlur}
            onPressEnter={handleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                handleCancel();
              }
            }}
          />
        ) : (
          folderName
        )}
      </div>
    </Spin>
  );
};

export default RenameFolder;
