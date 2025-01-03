import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Form, Spin } from "antd";
import dayjs from "dayjs";

import { useUpdateUser, useGetUser } from "../../api";
import { User } from "../../types";
import { UserDocument } from "../../components/user-document";

export function UserDetailsPage() {
  const [form] = Form.useForm<User>();
  const { id = "" } = useParams();

  const { data, isFetching } = useGetUser(id);
  const handleUpdateUser = useUpdateUser(id);

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
      <UserDocument
        isPending={handleUpdateUser.isPending || isFetching}
        onFinish={handleUpdateUser.mutate}
        mode="update"
        form={form}
      />
    </Spin>
  );
}

export default UserDetailsPage;
