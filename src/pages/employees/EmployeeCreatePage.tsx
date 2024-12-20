import { useNavigate } from "react-router-dom";
import { Form } from "antd";
  
import { useCreateEmployee } from "./use-create-employee";
import { EmployeeDTO } from "../../types";
import EmployeeDocument from "./employee-document/EmployeeDocument";

const EmployeeCreatePage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<EmployeeDTO>();

  const onSuccessCallback = (id: string) => {
    navigate(`/employees/edit/${id}`, { replace: true });
  };

  const handleCreateEmployee = useCreateEmployee(onSuccessCallback);

  return (
    <EmployeeDocument
      initialValues={{ isOffice: true }}
      isPending={handleCreateEmployee.isPending}
      onFinish={handleCreateEmployee.mutate}
      form={form}
      mode="create"
    />
  );
};

export default EmployeeCreatePage;
