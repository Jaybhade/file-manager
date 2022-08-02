import { AnyAction } from "redux";

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

export default CreateFolderModalReducer;