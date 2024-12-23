import { Button } from "antd";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="text-brand/20 text-9xl font-bold">404</div>

      <h1 className="mt-8 text-2xl font-semibold">{t("Page Not Found")}</h1>

      <p className="mt-4 max-w-md text-center text-gray-600">
        {t(
          "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
        )}
      </p>

      <div className="mt-8 flex gap-4">
        <Button type="primary" onClick={handleGoHome}>
          {t("Go to Home")}
        </Button>
        <Button onClick={handleGoBack}>{t("Go Back")}</Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
