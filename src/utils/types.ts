export type NewFolderProps = {
  id: string;
  parentId: string;
  name: string;
  creator: string;
  type: "folder" | "file";
  date: Date;
  url: string;
  subFolders: [];
};

export type NewRouteProps = {
  id: string;
  name: string;
  url: string;
};
