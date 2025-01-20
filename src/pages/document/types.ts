


import { LookupTag } from "../tags/types";

export type Document = {
  id: string;
  name: string;
  isFolder: boolean;
  updatedOn: string;
  fileName: string;
  fileSize: string;
  fileExtension: string;
  tags: LookupTag[];
  versionCount: number;
  commentCount: number;
  tagCount: number;
};
// export type Document = {
//   fileName: string;
//   name: string;
//   fileSize: string;
//   updatedOn: string;
//   isFolder: boolean;
//   id: string;
//   fileExtension: string;
// };