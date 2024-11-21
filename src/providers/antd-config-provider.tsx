import { ConfigProvider } from "antd";
import { ReactNode } from "react";
// import azAZ from "antd/locale/az_AZ";
// import ruRU from "antd/locale/ru_RU";

export function AntdConfigProvider({ children }: { children?: ReactNode }) {
    return (
        <ConfigProvider
            // locale={azAZ}
            theme={{
                components: {
                    // Input: {
                    //     borderRadius: 4,
                    // },
                    // Button: {
                    //     borderRadius: 4,
                    //     lineHeight: 28,
                    // },
                    // Form: {
                    //     labelFontSize: 12,
                    // },
                    // Tabs: {
                    //     fontFamily: "Roboto",
                    //     fontWeightStrong: 600,
                    //     colorText: "#A4A4A4",
                    // },
                    // Table: {
                    //     headerBorderRadius: 1,
                    //     headerBg: "#EFEFEF",
                    //     borderColor: "#C4C4C4",
                    // },
                },
                token: {
                    // Seed Token
                    colorPrimary: "#6d31edff",
                    // colorText: "gray",
                    borderRadius: 4,
                    // Alias Token
                    // colorBgContainer: "#f6ffed",
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}
