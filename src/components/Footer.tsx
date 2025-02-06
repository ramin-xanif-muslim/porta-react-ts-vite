import { t } from "i18next";

const Footer = () => {
  return (
      <div className="flex items-center gap-2 h-full text-sm px-4">
        <span>{t("Privacy Policy")}</span>
        <span>-</span>
        <span>{t("Terms of Service")}</span>
        <span>-</span>
        <span>{t("© 2024 Blue Mind Hub All rights reserved.")}</span>
      </div>
  );
};

export default Footer;
