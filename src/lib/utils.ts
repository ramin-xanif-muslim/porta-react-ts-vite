import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildHierarchy(data: any[]) {
  const map = {};
  const result = [];

  // Step 1: Map each item by its id
  data.forEach((item) => (map[item.id] = { ...item, children: [] }));

  // Step 2: Organize items into hierarchy
  data.forEach((item) => {
      if (item.parentId) {
          // If the item has a parent, add it to the parent's children array
          map[item.parentId].children.push(map[item.id]);
      } else {
          // If no parent, it's a root-level item
          result.push(map[item.id]);
      }
  });

  return result;
}
