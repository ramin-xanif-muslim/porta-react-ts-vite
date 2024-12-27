export type Department = {
  id: string;
  name: string;
  managerId: string;
  managerFirstName: string;
  managerLastName: string;
};

export type CreateDepartment = {
  name: string;
  managerId?: string;
};

export type UpdateDepartment = {
  id: string;
  name: string;
  managerId?: string;
};
