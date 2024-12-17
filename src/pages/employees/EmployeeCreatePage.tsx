import { useNavigate } from "react-router-dom";
import { useCreateEmployee } from "./use-create-employee";
import EmployeePage from "./EmployeePage";
import { EmployeeDTO } from "../../types";
import { Form } from "antd";

const EmployeeCreatePage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<EmployeeDTO>();

  const onSuccessCallback = (id: string) => {
    navigate(`/employees/${id}`, { replace: true });
  };

  const handleCreateEmployee = useCreateEmployee(onSuccessCallback);

  return (
    <EmployeePage
      initialValues={{ isOffice: true }}
      isPending={handleCreateEmployee.isPending}
      onFinish={handleCreateEmployee.mutate}
      form={form}
      mode="create"
    />
  );
};

export default EmployeeCreatePage;
