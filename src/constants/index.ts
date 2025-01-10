import { IoDocumentsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { PiUsersThree } from "react-icons/pi";



export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const MAX_FILE_COUNT = 3;

export const SUPPORTED_FILE_EXTENSIONS = ["docx", "doc", "pdf", "text", "txt"];

export const SUPPORTED_FILE_TYPES = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/msword", // .doc
  "application/pdf", // .pdf
  "text/plain", // .txt
];

export const DATE_FORMAT = "DD/MM/YYYY HH:mm";

export const HEADER_NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/",
    icon: RxDashboard,
  },
  {
    label: "Crew",
    path: "/crew",
    icon: PiUsersThree,
  },
  {
    label: "Documents",
    path: "/documents",
    icon: IoDocumentsOutline,
  },
]

export const HEADER_NAV_ITEMS_SUB = {
  "": [
    {
      label: "Dashboard",
      path: "",
    },
  ],
  "crew": [
    {
      label: "Employees",
      path: "crew/employees",

    },
    {
      label: "Departments",
      path: "crew/departments",
    },
    {
      label: "Positions",
      path: "crew/positions",
    },
  ],
  "documents": [
    {
      label: "Documents",
      path: "documents/documents",
    },
    {
      label: "Tags",
      path: "documents/tags",
    },
  ],
  "settings": [
    {
      label: "Users",
      path: "settings/users",
    },
    {
      label: "Roles",
      path: "settings/roles",
    },
  ],
};
