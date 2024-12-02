import { Select } from "antd";
// import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SettingPage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // useEffect(() => {
  //   i18n.changeLanguage(navigator.language);
  // }, []);

  const languages = [
    { value: "en", label: t("English") },
    { value: "az", label: t("Azerbaycanca") },
  ];

  return (
    <Select
      defaultValue={navigator.language}
      style={{ width: 120 }}
      onChange={changeLanguage}
      options={languages}
    />
  );
};

export default SettingPage;

