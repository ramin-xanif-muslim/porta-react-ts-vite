import { DatePicker, Form, FormInstance } from "antd";
import dayjs from "dayjs";
import { t } from "i18next";
import { AiOutlineSwapRight } from "react-icons/ai";

interface Props {
  form: FormInstance;
}

const CustomRangePicker = ({ form }: Props) => {
  // Function to set the date range for "This day"
  const setThisDay = () => {
    const startOfDay = dayjs().startOf("day");
    const endOfDay = dayjs().endOf("day");
    form.setFieldsValue({
      startDate: startOfDay,
      endDate: endOfDay,
    });
    form.submit()
  };

  // Function to set the date range for "Last day"
  const setLastDay = () => {
    const startOfLastDay = dayjs().subtract(1, "day").startOf("day");
    const endOfLastDay = dayjs().subtract(1, "day").endOf("day");
    form.setFieldsValue({
      startDate: startOfLastDay,
      endDate: endOfLastDay,
    });
    form.submit()
  };

  // Function to set the date range for "This month"
  const setThisMonth = () => {
    const startOfMonth = dayjs().startOf("month");
    const endOfMonth = dayjs().endOf("month");
    form.setFieldsValue({
      startDate: startOfMonth,
      endDate: endOfMonth,
    });
    form.submit()
  };

  // Function to set the date range for "Last month"
  const setLastMonth = () => {
    const startOfLastMonth = dayjs().subtract(1, "month").startOf("month");
    const endOfLastMonth = dayjs().subtract(1, "month").endOf("month");
    form.setFieldsValue({
      startDate: startOfLastMonth,
      endDate: endOfLastMonth,
    });
    form.submit()
  };
  return (
    <Form.Item
      label={
        <div className="flex">
          <span>{t("Date")}:</span>
          <div className="ml-4 flex items-center gap-3">
            <div
              className="cursor-pointer text-xs font-medium text-brand active:text-brand-400"
              onClick={setThisDay}
            >
              {t("This day")}
            </div>
            <div
              className="cursor-pointer text-xs font-medium text-brand active:text-brand-400"
              onClick={setLastDay}
            >
              {t("Last day")}
            </div>
            <div
              className="cursor-pointer text-xs font-medium text-brand active:text-brand-400"
              onClick={setThisMonth}
            >
              {t("This month")}
            </div>
            <div
              className="cursor-pointer text-xs font-medium text-brand active:text-brand-400"
              onClick={setLastMonth}
            >
              {t("Last month")}
            </div>
          </div>
        </div>
      }
      className="!mb-0"
    >
      <div className="flex w-full justify-between">
        <Form.Item name="startDate" noStyle>
          <DatePicker onChange={() => form.submit()} />
        </Form.Item>
        <span className="mx-2 flex items-center">
          <AiOutlineSwapRight />
        </span>
        <Form.Item name="endDate" noStyle>
          <DatePicker onChange={() => form.submit()} />
        </Form.Item>
      </div>
    </Form.Item>
  );
};

export default CustomRangePicker;
