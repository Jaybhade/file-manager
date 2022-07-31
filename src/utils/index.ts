export const findIdAndAddFolder = (id: string, newLocation: any, data: any) => {
  if (newLocation.id === id) {
    newLocation.subFolders.push(data);
    return newLocation;
  } else {
    if (newLocation.subFolders.length > 0) {
      for (var i = 0; i < newLocation.subFolders.length; i++) {
        findIdAndAddFolder(id, newLocation.subFolders[i], data);
      }
    }
  }
  return newLocation;
};

export const findIdAndRemoveFolder = (id: string, folders: any) => {
  if (folders.subFolders.length > 0) {
    folders.subFolders = folders.subFolders.filter((element: any) => {
      findIdAndRemoveFolder(id, element);
      return element.id !== id;
    });
  }

  return folders;
};