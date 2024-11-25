import { ConfigProvider } from "antd";
import { ReactNode } from "react";
import useStore from "../store/useStore";

export function AntdConfigProvider({ children }: { children?: ReactNode }) {
    const brandColor = useStore((state) => state.brandColor);

    return (
        <ConfigProvider
            theme={{
                components: {
                },
                token: {
                    // colorPrimary: "#6d31edff",
                    colorPrimary: brandColor,
                    borderRadius: 4,
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}
