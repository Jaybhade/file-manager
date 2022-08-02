import React, { useEffect, useState, memo } from "react";
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
import ImageThumbnail from "../../common/ImageThumbnail";
import ImageModal from "../../common/ImageModal";
import CreateNewFolderMenu from "../../common/CreateNewFolderMenu";
import InfiniteScroll from "../../common/InfiniteScroll/InfiniteScroll";
import { NewFolderProps } from "../../utils/types";

const FolderScreen = (props: AppProps) => {
  const [subFolders, setSubFolders] = useState<any>([]);
  const [folderName, setFolderName] = useState<string>("");
  const [folderInfo, setFolderInfo] = useState<any>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageData, setImageData] = useState<any>([]);
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

  const findFolderName = (id: string, folders: any) => {
    if (folders.id === id) {
      setFolderName(folders.name);
      return folders.name;
    } else {
      for (let i = 0; i < folders.subFolders.length; i++) {
        if (findFolderName(id, folders.subFolders[i])) {
          setFolderName(folders.subFolders[i].name);
          return folders.subFolders[i].name;
        }
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

  useEffect(() => {
    setLoading(true);
    props.setLastVisitedUrl(props.url);
    findFolderInfo(props.folderInfoId, props.folders);
    setLoading(false);
  }, [props.folderInfoId, props.folders, findFolderInfo, props.id]);

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
    findSubFolders(props.id, props.folders);
    findFolderName(props.id, props.folders);
    setLoading(false);
  }, [props.id, props.folders]);

  const hasMoreData = true;

  const LoadMore = async () => {
    const randomPosts = await axios.get(
      `https://api.unsplash.com/photos/random?page=1&query=${folderName}&count=10&client_id=A2Yc5MAMwsJ4NJ0bPX851Zs7n3l3GILUXoIbuvqib3I`
    );
    // TcS3v_GtSFzM9_jiqfdfLD-l8wmfuIZ_H5__afwvPec
    // A2Yc5MAMwsJ4NJ0bPX851Zs7n3l3GILUXoIbuvqib3I
    // iCJ88n7zrJEbDaDih1boz9UbAFAb3vXVitmfo6UNWek
    const newImages = randomPosts.data;
    // props.fetchImages(props.id, newImages);  
    setImageData((prevData: any) => [...prevData, ...newImages]);
  };

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div
          className="fsc160FolderScreenParent"
          onContextMenu={(e) => handleContext(e)}
        >
          {showMenu && (
            <CreateNewFolderMenu top={top} left={left} parentId={props.id} />
          )}
          <Breadcrumb url={props.url} />
          <div className="fsc161SearchBar">
            <Search parentUrl={props.url} />
          </div>
          <CreateFolder parentId={props.id} />
          <ImageModal url={props.imageUrl} />
          <div className="fsc162Scrollable">
            <FolderInfo {...folderInfo} />
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
            {props.type === "file" && (
              <InfiniteScroll
                hasMoreData={hasMoreData}
                onBottomHit={LoadMore}
                isLoading={loading}
                loadOnMount={true}
              >
                {imageData.map((data: any) => {
                  return <ImageThumbnail {...data} />;
                })}
              </InfiniteScroll>
            )}
            <span onClick={props.showCreateFolderModal}>
              <AddFolder />
            </span>
            <div className="fsc163BottomSpace"></div>
          </div>
        </div>
      )}
    </>
  );
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
