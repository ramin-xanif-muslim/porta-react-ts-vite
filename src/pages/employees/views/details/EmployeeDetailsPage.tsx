import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Form, Spin } from "antd";
import dayjs from "dayjs";

import { useUpdateEmployee, useGetEmployee } from "../../api";
import { Employee } from "../../types";
import { EmployeeDocument } from "../../components/employee-document";

export function EmployeeDetailsPage() {
  const [form] = Form.useForm<Employee>();
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
