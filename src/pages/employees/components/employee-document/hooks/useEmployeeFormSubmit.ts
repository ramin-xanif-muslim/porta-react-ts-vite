import dayjs from "dayjs";
import { Employee } from "../../../types";

export const useEmployeeFormSubmit = (
  onFinish: (values: Employee) => void,
  setIsFormDirty: (dirty: boolean) => void
) => {
  const handleFinish = (values: Employee) => {
    const transformedValues: Partial<Employee> = {
      ...values,
      birthDate: values.birthDate
        ? dayjs(values.birthDate).format("YYYY-MM-DD")
        : "",
      dateIn: values.dateIn ? dayjs(values.dateIn).format("YYYY-MM-DD") : "",
    };
    
    if (!values.isOffice) {
      delete transformedValues.departmentId;
      delete transformedValues.positionId;
      delete transformedValues.officeNumber;
      delete transformedValues.dateIn;
    }
    
    onFinish(transformedValues as Employee);
    setIsFormDirty(false);
  };

  return { handleFinish };
};