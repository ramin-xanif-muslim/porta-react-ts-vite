import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FolderDTO } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface HierarchyItem extends FolderDTO {
  children: HierarchyItem[];
}

export function buildHierarchy(data: FolderDTO[]): HierarchyItem[] {
  const map: Record<string, HierarchyItem> = {};
  const result: HierarchyItem[] = [];

  data.forEach((item) => (map[item.id] = { ...item, children: [] }));

  data.forEach((item) => {
      if (item.parentId) {
          map[item.parentId].children.push(map[item.id]);
      } else {
          result.push(map[item.id]);
      }
  });

  return result;
}

