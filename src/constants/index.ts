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
  },
  {
    label: "Employee management",
    path: "/employee-management",
  },
  {
    label: "Document management",
    path: "/document-management",
  },
]

export const HEADER_NAV_ITEMS_SUB = {
  "employee-management": [
    {
      label: "Employees",
      path: "employee-management/employees",
    },
    {
      label: "Departments",
      path: "employee-management/departments",
    },
    {
      label: "Positions",
      path: "employee-management/positions",
    },
  ],
  "document-management": [
    {
      label: "Documents",
      path: "document-management/documents",
    },
  ],
};
