import { AnyAction, combineReducers } from "redux";

import { findIdAndAddFolder, findIdAndRemoveFolder } from "../../utils";

const InitialFolders = {
  id: "0",
  name: "root",
  url: "/root",
  creator: "Jayesh",
  expandAccordion: false,
  type: "folder",
  date: new Date(),
  subFolders: [],
};

const InitialRoutes = [{ id: "0", name: "root", url: "/root", type: "folder"}];

const FoldersReducer = (folders = InitialFolders, action: AnyAction) => {
  if (action.type === "ADD_FOLDER") {
    const { parentId, id, name, url, creator, type, subFolders, date } =
      action.payload;
    const newFolders = folders;
    findIdAndAddFolder(parentId, newFolders, {
      id,
      name,
      url,
      creator,
      type,
      date,
      subFolders,
    });
    return { ...newFolders };
  } else if (action.type === "REMOVE_FOLDER") {
    const newFolders = findIdAndRemoveFolder(action.payload, folders);
    return { ...newFolders };
  }

  return folders;
};

const RoutesReducer = (routes = InitialRoutes, action: AnyAction) => {
  if (action.type === "ADD_ROUTE") {
    return [...routes, action.payload];
  } else if (action.type === "REMOVE_ROUTE") {
    const newRoutes = routes.filter((element) => element.url.slice(0, action.payload.length) !== action.payload);
    return [...newRoutes];
  }

  return routes;
};

const CreateFolderModalReducer = (
  showCreateFolder = false,
  action: AnyAction
) => {
  if (action.type === "SHOW_CREATE_FOLDER_MODAL") {
    return true;
  } else if (action.type === "HIDE_CREATE_FOLDER_MODAL") {
    return false;
  }

  return showCreateFolder;
};

const FolderInfoModalReducer = (showFolderInfo = false, action: AnyAction) => {
  if (action.type === "SHOW_FOLDER_INFO_MODAL") {
    return true;
  } else if (action.type === "HIDE_FOLDER_INFO_MODAL") {
    return false;
  }

  return showFolderInfo;
};

const FolderInfoIdReducer = (folderInfoId = "0", action: AnyAction) => {
  if (action.type === "SET_FOLDER_INFO_ID") {
    return action.payload;
  }

  return folderInfoId;
};

const initialImages = {
  root : [],
}

const FetchImagesReducer = (images = initialImages, action: AnyAction) => {
  if (action.type === "FETCH_IMAGES") {
    return images;
  }

  return images;
};

const ImageModalReducer = (showImageModal = false, action: AnyAction) => {
  if (action.type === "SHOW_IMAGE_MODAL") {
    return true;
  } else if (action.type === "HIDE_IMAGE_MODAL") {
    return false;
  }

  return showImageModal;
}

const ImageUrlReducer = (imageUrl = "", action: AnyAction) => {
  if (action.type === "SET_IMAGE_URL") {
    return action.payload;
  }

  return imageUrl;
};

const LastVisitedUrlReducer = (lastVisitedUrl = "/root", action: AnyAction) => {
  if (action.type === "SET_LAST_VISITED_URL") {
    return action.payload;
  }

  return lastVisitedUrl;
}

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
