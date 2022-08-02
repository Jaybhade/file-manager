import { combineReducers } from "redux";

import FoldersReducer from "./foldersReducer";
import RoutesReducer from "./routesReducer";
import CreateFolderModalReducer from "./createFolderModalReducer";
import FolderInfoModalReducer from "./folderInfoModalReducer";
import FolderInfoIdReducer from "./folderInfoIdReducer";
import FetchImagesReducer from "./fetchImagesReducer";
import ImageModalReducer from "./imageModalReducer";
import ImageUrlReducer from "./imageUrlReducer";
import LastVisitedUrlReducer from "./lastVisitedUrlReducer";

export default combineReducers({
  folders: FoldersReducer,
  routes: RoutesReducer,
  createFolderModal: CreateFolderModalReducer,
  folderInfoModal: FolderInfoModalReducer,
  folderInfoId: FolderInfoIdReducer,
  fetchImages: FetchImagesReducer,
  imageModal: ImageModalReducer,
  imageUrl: ImageUrlReducer,
  lastVisitedUrl: LastVisitedUrlReducer
});
