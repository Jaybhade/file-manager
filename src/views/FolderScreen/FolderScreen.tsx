import React, { useEffect, useState } from "react";
import "./folderScreen.css";

import { connect } from "react-redux";
import {
  showCreateFolderModal,
  fetchImages,
  setLastVisitedUrl,
} from "../../store/actions";

import Folder from "../../common/Folder";
import AddFolder from "../../common/AddFolder";
import CreateFolder from "../CreateFolder";
import Breadcrumb from "../../common/Breadcrumb";
import Search from "../../common/Search";
import FolderInfo from "../../common/FolderInfo";
import ImageThumbnail from "../../common/ImageThumbnail";
import ImageModal from "../../common/ImageModal";
import CreateNewFolderMenu from "../../common/CreateNewFolderMenu";

const FolderScreen = (props: AppProps) => {
  const [subFolders, setSubFolders] = useState<any>([]);
  const [folderInfo, setFolderInfo] = useState<any>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener("click", handleClick);

    return () => {
      window.addEventListener("click", handleClick);
    };
  });

  const handleContext = (event: any) => {
    event.preventDefault();
    setShowMenu(true);
    setLeft(event.pageX);
    setTop(event.pageY);
  };

  // useEffect(() => {
  //   if (props.type === "foile") {
  //     props.fetchImages();
  //   }
  // }, []);

  const findFolderInfo = (id: string, folders: any) => {
    if (folders.id === id) {
      setFolderInfo(folders);
    } else {
      for (let i = 0; i < folders.subFolders.length; i++) {
        findFolderInfo(id, folders.subFolders[i]);
      }
    }
  };

  useEffect(() => {
    setLoading(true)
    props.setLastVisitedUrl(props.url);
    findFolderInfo(props.folderInfoId, props.folders);
    setLoading(false)
  }, [props.folderInfoId, props.folders, findFolderInfo]);

  const findSubFolders = (id: string, folders: folderData) => {
    if (folders.id === id) {
      setSubFolders([...folders.subFolders]);
    } else {
      for (let i = 0; i < folders.subFolders.length; i++) {
        findSubFolders(id, folders.subFolders[i]);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    findSubFolders(props.id, props.folders);
    setLoading(false);
  }, [props.id, props.folders]);

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div
          className="folder-screen-parent"
          onContextMenu={(e) => handleContext(e)}
        >
          {showMenu && (
            <CreateNewFolderMenu top={top} left={left} parentId={props.id} />
          )}
          <Breadcrumb url={props.url} />
          <div className="search-bar">
            <Search parentUrl={props.url} />
          </div>
          <CreateFolder parentId={props.id} />
          <ImageModal url={props.imageUrl} />
          <div className="scrollable">
            <FolderInfo {...folderInfo} />
            {subFolders.map((data: folderData) => {
              return (
                <Folder
                  key={data.id}
                  name={data.name}
                  id={data.id}
                  url={data.url}
                />
              );
            })}
            {props.type === "file" &&
              props.images.map((data: any) => {
                return <ImageThumbnail key={data.id} {...data} />;
              })}
            <span onClick={props.showCreateFolderModal}>
              <AddFolder />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

type folderData = {
  id: string;
  name: string;
  url: string;
  creator: string;
  date: Date;
  subFolders: Array<folderData>;
};

type AppProps = {
  id: string;
  url: string;
  folders: folderData;
  type: string;
  showCreateFolderModal: any;
  folderInfoId: string;
  fetchImages: any;
  images: any;
  imageUrl: string;
  setLastVisitedUrl: any;
};

const mapStateToProps = (state: any) => {
  return {
    folders: state.folders,
    folderInfoId: state.folderInfoId,
    images: state.fetchImages,
    imageUrl: state.imageUrl,
  };
};

export default connect(mapStateToProps, {
  showCreateFolderModal,
  fetchImages,
  setLastVisitedUrl,
})(FolderScreen);
