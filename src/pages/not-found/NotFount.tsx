import { Divider } from "antd";
import { t } from "i18next";

const NotFount = () => {
    return (
        <div className="size-full text-2xl flex items-center justify-center gap-4 opacity-50">
            <span>404</span>
            <Divider className="border border-brand" type="vertical" />
            <span>{t("Not Found")}</span>
        </div>
    );
};

export default NotFount;
