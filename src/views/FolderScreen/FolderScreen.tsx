import React, { useEffect, useState, memo, useRef, useCallback } from "react";
import axios from "axios";
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
import ImageModal from "../../common/ImageModal";
import CreateNewFolderMenu from "../../common/CreateNewFolderMenu";
import { NewFolderProps } from "../../utils/types";
import CustomFolders from "../CustomFolder";

const FolderScreen = (props: AppProps) => {
  const [subFolders, setSubFolders] = useState<Array<NewFolderProps>>([]);
  const [folderName, setFolderName] = useState<string>("");
  const [folderInfo, setFolderInfo] = useState<NewFolderProps>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [menuLocation, setMenuLocation] = useState<locationProps>({
    x: 0,
    y: 0,
  });

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
    setMenuLocation({ x: event.pageX, y: event.pageY });
  };

  const findFolderName = (id: string, folders: NewFolderProps) => {
    if (folders.id === id) {
      setFolderName(folders.name);
    } else {
      for (let i = 0; i < folders.subFolders.length; i++) {
        findFolderName(id, folders.subFolders[i]);
      }
    }
  };

  const findFolderInfo = (id: string, folders: any) => {
    if (folders.id === id) {
      setFolderInfo(folders);
    } else {
      for (let i = 0; i < folders.subFolders.length; i++) {
        findFolderInfo(id, folders.subFolders[i]);
      }
    }
  };

  const findSubFolders = (id: string, folders: NewFolderProps) => {
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
    props.setLastVisitedUrl(props.url);
    findFolderInfo(props.folderInfoId, props.folders);
    setLoading(false);
  }, [props.folderInfoId, props.folders, findFolderInfo, props.id]);

  useEffect(() => {
    setLoading(true);
    findSubFolders(props.id, props.folders);
    findFolderName(props.id, props.folders);
    setLoading(false);
  }, [props.folders, props.id]);

  return (
    <>
      {loading ? (
        <div className="fsc165LoaderParent">
          <div className="fsc164Loader"></div>
        </div>
      ) : (
        <div
          className="fsc160FolderScreenParent"
          onContextMenu={(e) => handleContext(e)}
        >
          {showMenu && (
            <CreateNewFolderMenu
              top={menuLocation.y}
              left={menuLocation.x}
              parentId={props.id}
            />
          )}

          <Breadcrumb url={props.url} />

          <div className="fsc161SearchBar">
            <Search parentUrl={props.url} />
          </div>

          <CreateFolder parentId={props.id} />

          <ImageModal imageData={props.imageUrl} />

          <div className="fsc162Scrollable">
            <FolderInfo {...folderInfo} />

            {/* subfolders and images */}
              <CustomFolders folderName={folderName} type={props.type}>
                {subFolders.map((data: NewFolderProps) => {
                  return (
                    <Folder
                      key={data.id}
                      name={data.name}
                      id={data.id}
                      url={data.url}
                    />
                  );
                })}

                {/* Add folder */}
                <span onClick={props.showCreateFolderModal}>
                  <AddFolder />
                </span>
              </CustomFolders>

            <div className="fsc163BottomSpace"></div>
          </div>
        </div>
      )}
    </>
  );
};

type locationProps = {
  x: number;
  y: number;
};

type AppProps = {
  id: string;
  url: string;
  folders: NewFolderProps;
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
