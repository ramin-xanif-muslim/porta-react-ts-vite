import BrandColorSelector from "../../components/BrandColorSelector";
import LanguageSelector from "../../components/LanguageSelector";
import { useTranslation } from "react-i18next";

const SettingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="space-y-8">
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{t("Language Settings")}</h2>
          <LanguageSelector />
        </section>

        <section className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{t("Appearance Settings")}</h2>
          <BrandColorSelector />
        </section>
      </div>
    </div>
  );
};

export default SettingPage;
