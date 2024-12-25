import { useNavigate } from "react-router-dom";
import { Form } from "antd";

import { EmployeeDocument } from "../../components/employee-document";
import { Employee } from "../../types";
import { useCreateEmployee } from "../../api";

export function EmployeeCreatePage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<Employee>();

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
}

export default EmployeeCreatePage;
