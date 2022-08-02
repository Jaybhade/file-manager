import { AnyAction } from "redux";
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


export default FoldersReducer;