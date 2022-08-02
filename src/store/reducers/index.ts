import { combineReducers } from "redux";

import FoldersReducer from "./FoldersReducer";
import RoutesReducer from "./RoutesReducer";
import CreateFolderModalReducer from "./CreateFolderModalReducer";
import FolderInfoModalReducer from "./FolderInfoModalReducer";
import FolderInfoIdReducer from "./FolderInfoIdReducer";
import FetchImagesReducer from "./FetchImagesReducer";
import ImageModalReducer from "./ImageModalReducer";
import ImageUrlReducer from "./ImageUrlReducer";
import LastVisitedUrlReducer from "./LastVisitedUrlReducer";

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
