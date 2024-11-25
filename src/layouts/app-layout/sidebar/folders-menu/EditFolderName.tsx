import { Input, Spin } from "antd";
import { useState } from "react";
import { useUpdateFolder } from "../../../../pages/folder/use-update-folder";

const EditFolderName = ({
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

    const updateFolder = useUpdateFolder();
    const onBlur = () => {
        console.log(id);
        setEdit(false);
    };

    const onDoubleClick = () => {
        setEdit(true);
        setName(folderName);
    };

    const handleCancel = () => {
        setName(folderName);
        setEdit(false);
    };

    const handleUpdate = () => {
        if (name.trim() !== folderName.trim()) {
            updateFolder.handleUpdate({ id, name: name.trim(), parentId });
        }
        setEdit(false);
    };

    return (
        <Spin spinning={false}>
        {/* <Spin spinning={updateFolder.isPending}> */}
            <div onDoubleClick={onDoubleClick}>
                {edit ? (
                    <Input
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

export default EditFolderName;
