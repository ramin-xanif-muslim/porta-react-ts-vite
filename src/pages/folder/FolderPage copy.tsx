import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useParams, useSearchParams } from "react-router-dom";

import { FaRegFolder } from "react-icons/fa6";
import { GrDocumentPdf } from "react-icons/gr";
import { CiImageOn } from "react-icons/ci";
import { BsFiletypePptx } from "react-icons/bs";
import { BsFiletypeXlsx } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { FaRegStar } from "react-icons/fa";

import { FolderDataDTO } from "../../types";
import DotsTableCell from "./DotsTableCell";
import { foldersApi } from "./api";

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
        sorter: () => 0,
    },
    {
        title: "Last modified",
        dataIndex: "lastModified",
        key: "lastModified",
        sorter: () => 0,
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

// const fetchFolder = (
//     filters: Record<string, string>,
//     id: string | undefined
// ) => {
//     const requestedData = foldersData.filter((folder) => folder.folderId === id);

//     if (filters.sortBy) {
//         const [field, order] = filters.sortBy.split(".");
//         requestedData.sort((a, b) => {
//             const aValue = a[field as keyof FolderDataDTO];
//             const bValue = b[field as keyof FolderDataDTO];

//             let result = 0;
//             if (aValue === bValue) return 0;
//             if (order === "ascend") {
//                 result = aValue < bValue ? -1 : 1;
//             } else {
//                 result = aValue > bValue ? -1 : 1;
//             }

//             return result;
//         });
//     }

//     return new Promise<FolderDataDTO[]>((resolve) => {
//         setTimeout(() => {
//             resolve(requestedData);
//         }, 300);
//     });
// };

const FolderPage = () => {
    const { id } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    const {  isPlaceholderData } = useQuery({
        ...foldersApi.getFoldersListQueryOptions({ folderId: id}),
        placeholderData: keepPreviousData,
    });
    // const { data, isPlaceholderData } = useQuery({
    //     queryKey: ["folder", id, searchParams.toString()],
    //     queryFn: () => fetchFolder(getFilters(searchParams), id),
    //     placeholderData: keepPreviousData,
    // });

    return (
        <div className="mt-2" key={id}>
            <Table<FolderDataDTO>
                onChange={(pagination, filters, sorter) => {
                    console.log({ pagination, filters, sorter });
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
                dataSource={[]}
                loading={isPlaceholderData}
            />
        </div>
    );
};

export default FolderPage;
