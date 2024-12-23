import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Form, Spin } from "antd";
import dayjs from "dayjs";

import { EmployeeDTO } from "../../../../types";
import { useUpdateEmployee } from "../../api/use-update-employee";
import { useGetEmployee } from "../../api/use-get-employee";
import EmployeeDocument from "../../components/employee-document/EmployeeDocument";

export function EmployeeDetailsPage() {
  const [form] = Form.useForm<EmployeeDTO>();
  const { id = "" } = useParams();

  const { data, isFetching } = useGetEmployee(id);
  const handleUpdateEmployee = useUpdateEmployee(id);

  useEffect(() => {
    if (data?.data && !isFetching) {
      const transformedValues = {
        ...data.data,
        birthDate: data.data.birthDate ? dayjs(data.data.birthDate) : undefined,
        dateIn: data.data.dateIn ? dayjs(data.data.dateIn) : undefined,
      };
      form.setFieldsValue(transformedValues);
    }
  }, [data?.data, isFetching, form]);

  return (
    <Spin tip="Loading" size="large" spinning={isFetching}>
      <EmployeeDocument
        isPending={handleUpdateEmployee.isPending || isFetching}
        onFinish={handleUpdateEmployee.mutate}
        mode="update"
        form={form}
      />
    </Spin>
  );
}

export default EmployeeDetailsPage;
