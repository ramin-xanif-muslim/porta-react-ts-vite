export type Employee = {
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
export interface EmployeeLookup {
  id: string;
  name: string;
}