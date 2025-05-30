import type React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Folder } from "../pages/folder/types";

type DynamicModule = {
  default: React.ComponentType;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HierarchyItem extends Folder {
  children: HierarchyItem[];
}

export function buildHierarchy(data: Folder[]): HierarchyItem[] {
  const map: Record<string, HierarchyItem> = {};
  const result: HierarchyItem[] = [];

  data?.forEach((item) => (map[item.id] = { ...item, children: [] }));

  data?.forEach((item) => {
    if (item.parentId) {
      map[item.parentId]?.children.push(map[item.id]);
    } else {
      result.push(map[item.id]);
    }
  });

  return result;
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " Bytes"; // Less than 1 KB, show in Bytes
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
  }
};

export const dynamicImport = async () => {
  try {
    const moduleFiles = import.meta.glob("../modals/*.tsx");
    const modules = await Promise.all(
      Object.entries(moduleFiles).map(async ([path, importFn]) => {
        const fileName = path.split("/").pop()?.replace(".tsx", "");
        if (!fileName) return null;

        const module = (await importFn()) as DynamicModule;
        return [fileName, module.default] as const;
      }),
    );

    return Object.fromEntries(
      modules.filter(
        (item): item is [string, React.ComponentType] => item !== null,
      ),
    );
  } catch (error) {
    console.error("Failed to import modules:", error);
    return {};
  }
};