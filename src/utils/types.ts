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

export type ImageUrlProps = {
  height: number;
  width: number;
  placeholder: string;
  url: string;
}

export type StateProps = {
  createFolderModal: boolean;
  fetchImages: Array<any>;
  folderInfoId: string;
  folderInfoModal: false;
  folders: Array<NewFolderProps>;
  imageUrl: ImageUrlProps;
  lastVisitedUrl: string;
  routes: Array<NewRouteProps>;
}