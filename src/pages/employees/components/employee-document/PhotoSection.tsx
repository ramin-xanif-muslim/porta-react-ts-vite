import { MdOutlineCloudUpload } from "react-icons/md";
import { Button, Card } from "antd";
import { t } from "i18next";
import { MdOutlineInsertPhoto } from "react-icons/md";

export function PhotoSection() {
  return (
    <>
      <Card
          className="w-full bg-white"
          title={
            <div className="">
              <div className="flex items-center gap-2">
                <MdOutlineInsertPhoto className="text-brand" size={24} />
                <h3 className="font-bold">{t("Photo")}</h3>
              </div>
            </div>
          }
        >
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold">{t("Avatar")}</span>
            <div className="flex items-center gap-2">
              <div className="size-12 overflow-hidden rounded-full">
                <img src="/avatar.jpg" alt="" />
              </div>
              <Button
                className="text-brand hover:!bg-brand-100 hover:!text-brand"
                type="text"
              >
                {t("Change")}
              </Button>
              <Button
                className="text-brand hover:!bg-brand-100 hover:!text-brand"
                type="text"
              >
                {t("Remove")}
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-sm font-bold">{t("ID Images")}</p>

              <div className="inset-0 mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-brand bg-brand-50">
                <div className="flex flex-col items-center gap-2 rounded-lg px-6 py-4">
                  <MdOutlineCloudUpload className="text-brand" size={24} />
                  <p>{t("Drag & drop your files here")}</p>
                  <p>{t("OR")}</p>
                  <Button type="primary">{t("Browse files")}</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
    </>
  );
}
