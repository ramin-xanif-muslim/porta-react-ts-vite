import { useRef, useEffect } from "react";
import { useState } from "react";
import { Modal, Form, Input, Button, InputRef } from "antd";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegFolder } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useCreateFolder } from "../../../pages/folder/use-create-folder";

const CreateFolderBnt = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const inputRef = useRef<InputRef>(null);

    const { id } = useParams();

    const createFolder = useCreateFolder({ id });

    useEffect(() => {
        if (isModalOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.input?.focus();
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [isModalOpen]);

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleCreate = async ({ name }: { name: string }) => {
        try {
           createFolder.handleCreate({ name, parentId: id });
           handleCancel()
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button
                className="bg-grayColor-50 flex items-center p-2 rounded-full px-4 py-2"
                onClick={() => {
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
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={createFolder.isPending}
                        onClick={() => form.submit()}
                    >
                        Create
                    </Button>,
                ]}
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
                        <Input
                            ref={inputRef}
                            placeholder="Enter folder name"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateFolderBnt;