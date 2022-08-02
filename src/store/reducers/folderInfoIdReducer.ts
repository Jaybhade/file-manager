import { AnyAction } from "redux";

const FolderInfoIdReducer = (folderInfoId = "0", action: AnyAction) => {
  if (action.type === "SET_FOLDER_INFO_ID") {
    return action.payload;
  }

  return folderInfoId;
};

export default FolderInfoIdReducer;
