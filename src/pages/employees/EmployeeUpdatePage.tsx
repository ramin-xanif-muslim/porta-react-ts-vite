import { useParams } from "react-router-dom";
import EmployeePage from "./EmployeePage";
import { useUpdateEmployee } from "./use-update-employee";
import { useGetEmployee } from "./use-get-employee";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Form, Spin } from "antd";
import { EmployeeDTO } from "../../types";

const EmployeeUpdatePage = () => {
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

  // if (!data?.data) {
  //   return <div>Employee not found</div>;
  // }

  return (
    <Spin tip="Loading" size="large" spinning={isFetching}>
      <EmployeePage
        isPending={handleUpdateEmployee.isPending || isFetching}
        onFinish={handleUpdateEmployee.mutate}
        mode="update"
        form={form}
      />
    </Spin>
  );
};

export default EmployeeUpdatePage;
