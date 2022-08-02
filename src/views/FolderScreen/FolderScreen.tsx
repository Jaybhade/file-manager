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
import ImageThumbnail from "../../common/ImageThumbnail";
import ImageModal from "../../common/ImageModal";
import CreateNewFolderMenu from "../../common/CreateNewFolderMenu";
import { NewFolderProps } from "../../utils/types";

const FolderScreen = (props: AppProps) => {
  const [subFolders, setSubFolders] = useState<any>([]);
  const [folderName, setFolderName] = useState<string>("");
  const [folderInfo, setFolderInfo] = useState<any>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageData, setImageData] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  const observer = useRef<IntersectionObserver>();

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

  const LoadMore = async () => {
    let randomPosts;
    let newImages: any;
    try {
      randomPosts = await axios.get(
        `https://api.unsplash.com/photos/random?page=1&query=${folderName}&count=10&client_id=A2Yc5MAMwsJ4NJ0bPX851Zs7n3l3GILUXoIbuvqib3I`
      );
      newImages = randomPosts.data;
    } catch (error: any) {
      newImages = [];
      if (error.response.status === 404) {
        setErrorMessage("Images Not Found.");
      } else if (error.response.status === 403) {
        setErrorMessage(error.message);
      }
    }
    // TcS3v_GtSFzM9_jiqfdfLD-l8wmfuIZ_H5__afwvPec
    // A2Yc5MAMwsJ4NJ0bPX851Zs7n3l3GILUXoIbuvqib3I
    // iCJ88n7zrJEbDaDih1boz9UbAFAb3vXVitmfo6UNWek

    setImageData((prevData: any) => [...prevData, ...newImages]);
    props.fetchImages(props.id, newImages);
  };

  const lastElementRef = useCallback(
    (node: HTMLImageElement) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio) LoadMore();
      });

      if (node) observer.current.observe(node);
    },
    [LoadMore]
  );

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
            {errorMessage.length > 0 && (
              <div
                className={
                  errorMessage.length > 0 ? "fsc168Error" : "fsc169DisplayNone"
                }
              >
                <h2>{errorMessage}</h2>
              </div>
            )}

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

            {props.type === "file" && errorMessage.length === 0 && (
              <>
                {imageData.map((data: any) => {
                  return <ImageThumbnail {...data} />;
                })}

                <div ref={lastElementRef} className="fsc167LoadImagesParent">
                  <div className="fsc166LoadImages"></div>
                </div>
              </>
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
