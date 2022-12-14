import unsplash from "../../utils/unsplash";

import { ImageUrlProps, NewFolderProps, NewRouteProps } from "../../utils/types";
//Action Creator

export const addFolder = (folderDetails: NewFolderProps) => {
  return {
    type: "ADD_FOLDER",
    payload: folderDetails,
  };
};

export const removeFolder = (folderId: string) => {
  return {
    type: "REMOVE_FOLDER",
    payload: folderId,
  };
};

export const addRoute = (routeDetails: NewRouteProps) => {
  return {
    type: "ADD_ROUTE",
    payload: routeDetails,
  };
};

export const removeRoute = (folderId: string) => {
  return {
    type: "REMOVE_ROUTE",
    payload: folderId,
  };
};

export const showCreateFolderModal = () => {
  return {
    type: "SHOW_CREATE_FOLDER_MODAL",
  };
};

export const hideCreateFolderModal = () => {
  return {
    type: "HIDE_CREATE_FOLDER_MODAL",
  };
};

export const showFolderInfoModal = () => {
  return {
    type: "SHOW_FOLDER_INFO_MODAL",
  };
};

export const hideFolderInfoModal = () => {
  return {
    type: "HIDE_FOLDER_INFO_MODAL",
  };
};

export const setFolderInfoId = (folderId: string) => {
  return {
    type: "SET_FOLDER_INFO_ID",
    payload: folderId,
  };
};

export const showImageModal = () => {
  return {
    type: "SHOW_IMAGE_MODAL",
  };
};

export const hideImageModal = () => {
  return {
    type: "HIDE_IMAGE_MODAL",
  };
};

export const setImageUrl = (ImageData: ImageUrlProps) => {
  return {
    type: "SET_IMAGE_URL",
    payload: ImageData,
  };
};

type ImagesType = {
  id: string;
  newImages: any;
};

export const fetchImages = (imagesData: ImagesType) => {
  return {
    type: "FETCH_IMAGES",
    payload: imagesData,
  };
};

export const setLastVisitedUrl = (url: string) => {
  return {
    type: "SET_LAST_VISITED_URL",
    payload: url,
  };
};
