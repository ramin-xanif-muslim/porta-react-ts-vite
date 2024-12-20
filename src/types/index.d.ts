export type FolderDTO = {
  id: string;
  name: string;
  parentId?: string | null | undefined;
};

export type DocumentDataDTO = {
  // key?: string;
  // isSelected?: boolean;
  // sharedTo?: string;
  // dots?: string;

  fileName: string;
  name: string;
  fileSize: string;
  updatedOn: string;
  isFolder: boolean;
  id: string;
  fileExtension: string;
};

export type DocumentVersionDTO = {
  id: string;
  createdOn: string;
  number: number;
  fileName: string;
  fileExtension: string;
  fileSize: number;
};

// export type EmployeeDTO = {
//   FirstName: string;
//   LastName: string;
//   BirthDate: string;
//   Gender: string;
//   Email: string;
//   PhoneNumber: string;
//   IsOffice: boolean;
//   DepartmentId: number;
//   PositionId: number;
//   OfficeNumber: string;
//   DateIn: string;
// }

export type EmployeeDTO = {
  firstName: string;
  lastName: string;
  birthDate?: string;
  gender?: string;
  email: string;
  phoneNumber?: string;
  isOffice: boolean;
  departmentId?: number;
  positionId?: number;
  officeNumber?: string;
  dateIn?: string;
  id: string;
};
export interface EmployeeLookupTDO {
  id: string;
  name: string;
}
