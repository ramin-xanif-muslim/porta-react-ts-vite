import { useTranslation } from "react-i18next";
import { Select } from "antd";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    window.location.reload();
  };

  

  const languages = [
    { value: "en", label: t("English") },
    { value: "az", label: t("Azerbaijani") },
    { value: "tr", label: t("Turkish") },
  ];


  return (
    <Select
      defaultValue={i18n.language}
      style={{ width: 120 }}
      onChange={changeLanguage}
      options={languages}
    />
  );
};

export default LanguageSelector;

// export const useBrowserLanguage = () => {
//   useEffect(() => {
//     i18n.changeLanguage(navigator.language);
//   }, []);
// }