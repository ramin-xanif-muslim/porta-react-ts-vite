import { ConfigProvider, App } from "antd";
import { ReactNode, useMemo } from "react";
import useStore from "../store/global-store";
// import { LoadingOutlined } from "@ant-design/icons";

// Import all required locales
import azAZ from "antd/locale/az_AZ";
import enUS from "antd/locale/en_US";
import trTR from "antd/locale/tr_TR";
import { useTranslation } from "react-i18next";

export function AntdConfigProvider({ children }: { children?: ReactNode }) {
  const brandColor = useStore((state) => state.brandColor);
  const { i18n } = useTranslation();

  const locale = useMemo(() => {
    const localeMap: { [key: string]: typeof enUS } = {
      en: enUS,
      az: azAZ,
      tr: trTR,
    };

    return localeMap[i18n.language] || enUS;
  }, [i18n.language]);

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        components: {},
        token: {
          colorPrimary: brandColor,
          borderRadius: 4,
        },
      }}
      // spin={{
      //   indicator: <LoadingOutlined spin />,
      // }}
      modal={{
        styles: {
          header: {
            borderBottom: "1px solid var(--border-color)",
            marginBottom: 24,
            paddingBottom: 16,
          },
          footer: {
            borderTop: "1px solid var(--border-color)",
            marginTop: 24,
            paddingTop: 16,
          },
          content: {
            padding: "24px 24px",
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
