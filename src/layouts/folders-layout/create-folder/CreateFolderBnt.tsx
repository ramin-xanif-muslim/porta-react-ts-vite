import { useState } from "react";
import { Modal, Form, Input } from "antd";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegFolder } from "react-icons/fa6";
import { foldersApi } from "../../../pages/folder/api";
import { useParams } from "react-router-dom";

const CreateFolderBnt = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const { id } = useParams();

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCreate = ({ name }: { name: string }) => {
        foldersApi.createFolder({ name, parentId: id });
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                className="bg-grayColor-50 flex items-center p-2 rounded-full px-4 py-2"
                onClick={() => {
                    console.log("click");
                    setIsModalOpen(true);
                }}
            >
                <span>
                    <FiPlus />
                </span>
                <span className="ml-2 hidden sm:flex line-clamp-1 truncate">
                    Create Folder
                </span>
                <span className="ml-6">
                    <IoIosArrowDown />
                </span>
            </button>

            <Modal
                title={
                    <div className="flex items-center">
                        <span className="mr-3 p-2 bg-yellow-50 rounded-full">
                            <FaRegFolder className="text-[#EFB034FF] size-5" />
                        </span>
                        <span>Create Folder</span>
                    </div>
                }
                open={isModalOpen}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            handleCreate(values)
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}
                onCancel={handleCancel}
                okText="Create"
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="create-folder"
                    className="space-y-4"
                    onFinish={handleCreate}
                >
                    <Form.Item
                        label="Folder Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input folder name!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter folder name" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateFolderBnt;
