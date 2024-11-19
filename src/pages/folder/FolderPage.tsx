import { Table } from "antd";
import type { TableProps } from "antd";
import { FaRegFolder } from "react-icons/fa6";
import { GrDocumentPdf } from "react-icons/gr";
import { CiImageOn } from "react-icons/ci";
import { BsFiletypePptx } from "react-icons/bs";
import { BsFiletypeXlsx } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { FaRegStar } from "react-icons/fa";
import { FolderDataDTO } from "../../types";
import { foldersData } from "../../types/data";
import {
    useParams,
    useSearchParams,
} from "react-router-dom";
import DotsTableCell from "./DotsTableCell";

const getIcon = (name: string) => {
    const type = name.split(".")[1];
    switch (type) {
        case "zip":
            return <FaRegFolder className="text-[#15ABFFFF] size-5" />;
        case "pdf":
            return <GrDocumentPdf className="text-[#DE3B40FF] size-5" />;
        case "jpg":
            return <CiImageOn className="text-[#424856FF] size-5" />;
        case "pptx":
            return <BsFiletypePptx className="text-[#D29211FF] size-5" />;
        case "xlsx":
            return <BsFiletypeXlsx className="text-[#117B34FF] size-5" />;
        case "docx":
            return <CgFileDocument className="text-[#197DCAFF] size-5" />;
    }
};

const columns: TableProps<FolderDataDTO>["columns"] = [
    {
        title: "",
        dataIndex: "icon",
        key: "icon",
        render: (_, record) => getIcon(record.name),
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        // sorter: (a, b) => a.name.localeCompare(b.name),
        sorter: () => 0,
        render: (value) => (
            <div className="flex">
                <span className="line-clamp-1">{value.split(".")[0]}.</span>
                <span>{value.split(".")[1]}</span>
            </div>
        ),
    },
    {
        title: "Size",
        dataIndex: "size",
        key: "size",
    },
    {
        title: "Last modified",
        dataIndex: "lastModified",
        key: "lastModified",
    },
    {
        title: "Shared to",
        key: "sharedTo",
        dataIndex: "sharedTo",
    },
    {
        title: "",
        key: "isSelected",
        dataIndex: "isSelected",
        render: (val) => (
            <div className="cursor-pointer">
                <FaRegStar className={val ? "text-[#EFB034FF]" : ""} />
            </div>
        ),
    },
    {
        title: "",
        key: "dots",
        dataIndex: "dots",
        render: () => <DotsTableCell />,
    },
];

const FolderPage = () => {
    const { id } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="mt-2">
            <Table<FolderDataDTO>
                onChange={(pagination, filters, sorter) => {
                    console.log({pagination, filters, sorter});
                    if (!Array.isArray(sorter)) {
                        if (searchParams) {
                            setSearchParams((prev) => {
                                if (sorter.field)
                                    prev.set(
                                        "sortBy",
                                        `${sorter.field}.${sorter.order}`
                                    );
                                else prev.delete("sortBy");
                                return prev;
                            });
                        }
                    }
                }}
                pagination={false}
                scroll={{ x: window.innerHeight }}
                columns={columns}
                dataSource={foldersData.filter((item) => item.folderId === id)}
            />
        </div>
    );
};

export default FolderPage;
