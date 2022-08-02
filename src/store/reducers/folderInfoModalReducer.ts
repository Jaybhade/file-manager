import { AnyAction } from "redux";

const FolderInfoModalReducer = (showFolderInfo = false, action: AnyAction) => {
  if (action.type === "SHOW_FOLDER_INFO_MODAL") {
    return true;
  } else if (action.type === "HIDE_FOLDER_INFO_MODAL") {
    return false;
  }

  return showFolderInfo;
};

export default FolderInfoModalReducer;
