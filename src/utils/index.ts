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

export const findSubFolders = (id: string, folders: any, name: string) => {
  if (folders.id === id) {
    for (let i = 0; i < folders.subFolders.length; i++) {
      if (folders.subFolders[i].name === name) {
        return true;
      }
    }
    return false;
  } else {
    for (let j = 0; j < folders.subFolders.length; j++) {
      if (findSubFolders(id, folders.subFolders[j], name)) return true;
    }
  }
  return false;
};
