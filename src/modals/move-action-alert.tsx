import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Modal, TreeSelect } from "antd";
import { t } from "i18next";

import { documentsApi } from "../pages/document/api/documentsApi";
import { foldersApi } from "../pages/folder/api";
import { useModalStore } from "../store";

interface Folder {
  id: string;
  name: string;
  parentId: string | null;
}

interface TreeSelectNode {
  title: string;
  value: string;
  key: string;
  children: TreeSelectNode[];
}

export default function MoveActionAlert() {
  const [form] = Form.useForm();
  const { modalState, closeModal } = useModalStore();

  const { data: folders, isLoading: isLoadingFolders } = useQuery({
    ...foldersApi.getFoldersListQueryOptions(),
    select: (data) => data.data.list,
    enabled: modalState?.["move-action-alert"]?.isOpen,
  });

  const selectedRowKeys = modalState?.["move-action-alert"]?.props
    ?.selectedRowKeys as string[];

  const { mutate, isPending } = useMutation({
    mutationFn: (folderId: string) =>
      documentsApi.move({ documentIds: selectedRowKeys, folderId: folderId! }),
    onSuccess: () => {
      closeModal("move-action-alert");
      (
        modalState?.["move-action-alert"]?.props as { handleClose?: () => void }
      )?.handleClose?.();
    },
  });

  const onFinish = ({ folderId }: { folderId: string }) => {
    mutate(folderId);
  };

  const buildTree = (
    folders: Folder[],
    parentId: string | null = null,
  ): TreeSelectNode[] => {
    return folders
      .filter((folder) => folder.parentId === parentId)
      .map((folder) => ({
        title: folder.name,
        value: folder.id,
        key: folder.id,
        children: buildTree(folders, folder.id),
      }));
  };

  const treeData = buildTree(folders || []);

  return (
    <Modal
      open={modalState?.["move-action-alert"]?.isOpen}
      onCancel={() => closeModal("move-action-alert")}
      title={t("Move")}
      onOk={form.submit}
      okText={t("Move")}
      confirmLoading={isPending}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="folderId"
          label={t("Folder")}
          rules={[{ required: true }]}
        >
          <TreeSelect
            loading={isLoadingFolders}
            treeData={treeData}
            placeholder={t("Please select a folder")}
            treeDefaultExpandAll
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
