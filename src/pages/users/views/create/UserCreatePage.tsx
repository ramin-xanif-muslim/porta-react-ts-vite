import { useNavigate } from "react-router-dom";
import { Form } from "antd";

import { User } from "../../types";
import { useCreateUser } from "../../api";
import { UserDocument } from "../../components/user-document";

export function UserCreatePage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<User>();

  const onSuccessCallback = (id: string) => {
    navigate(`/users/edit/${id}`, { replace: true });
  };

  const handleCreateUser = useCreateUser(onSuccessCallback);

  return (
    <UserDocument
      isPending={handleCreateUser.isPending}
      onFinish={handleCreateUser.mutate}
      form={form}
      mode="create"
    />
  );
}

export default UserCreatePage;
