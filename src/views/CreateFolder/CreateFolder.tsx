import React, { useEffect, useRef, useState } from "react";
import "./createFolder.css";

import { useLocation } from "react-router-dom";
import { findSubFolders } from "../../utils";

import {
  addRoute,
  addFolder,
  hideCreateFolderModal,
} from "../../store/actions";
import Modal from "../../ui/Modal";
import ToggleTab from "../../common/ToggleTab";
import { connect } from "react-redux";

const CreateFolder = (props: AppProps) => {
  const location = useLocation();
  const inputElement = useRef<HTMLInputElement>(null);
  const creatorElement = useRef<HTMLInputElement>(null);
  const timeout = useRef<any>();

  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [sameFolderAlreadyExist, setSameFolderAlreadyExist] = useState<boolean>(false);
  const [newFolderInfo, setNewFolderInfo] = useState<any>({
    name: "",
    creator: "",
  });

  const setFirst = () => setIsFirst(true);
  const setSecond = () => setIsFirst(false);

  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setSameFolderAlreadyExist(findSubFolders(props.parentId, props.folders, newFolderInfo.name))
    }, 500);
  }, [newFolderInfo.name])

  const handleName = (event: any) => {
    event.persist();
    setNewFolderInfo({
      ...newFolderInfo,
      name: event.target.value,
    });
  };

  const handleCreator = (event: any) => {
    event.persist();
    setNewFolderInfo({
      ...newFolderInfo,
      creator: event.target.value,
    });
  };

  const url = location.pathname + "/" + newFolderInfo.name;

  const handleSubmit = () => {
    if (
      newFolderInfo.name.length > 0 &&
      newFolderInfo.creator.length > 0 &&
      !findSubFolders(props.parentId, props.folders, newFolderInfo.name)
    ) {
      const randId = Math.random().toString();
      const newFolderData: NewFolderProps = {
        id: randId,
        parentId: props.parentId,
        name: newFolderInfo.name,
        creator: newFolderInfo.creator,
        type: isFirst ? "folder" : "file",
        date: new Date(),
        url: url,
        subFolders: [],
      };
      props.addRoute({
        id: randId,
        name: newFolderInfo.name,
        url: url,
        type: isFirst ? "folder" : "file",
      });
      props.addFolder(newFolderData);
      props.hideCreateFolderModal();
    }
  };

  return (
    <Modal show={props.show} hideModal={props.hideCreateFolderModal}>
      <div className="crf150CreateFolderParent">
        <h2>Create New</h2>
        <ToggleTab
          first="Folder"
          second="File"
          isFirst={isFirst}
          setFirst={setFirst}
          setSecond={setSecond}
        />

        <input
          ref={inputElement}
          maxLength={20}
          className="crf151CreateFolderInput"
          placeholder="Name"
          value={newFolderInfo.name}
          onChange={(e) => handleName(e)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (creatorElement.current) {
                creatorElement.current.focus();
              }
            }
          }}
          required
        />

        {sameFolderAlreadyExist && (
          <div className="crf153AlreadyExistWarning">
            Folder already exists.
          </div>
        )}

        <input
          maxLength={20}
          ref={creatorElement}
          className="crf151CreateFolderInput"
          placeholder="Creator"
          value={newFolderInfo.creator}
          onChange={(e) => {
            handleCreator(e);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
          required
        />
        <div className="crf152CreateFolderButton" onClick={handleSubmit}>
          Create
        </div>
      </div>
    </Modal>
  );
};

type AppProps = {
  parentId: string;
  addFolder: any;
  addRoute: any;
  hideCreateFolderModal: any;
  show: boolean;
  folders: NewFolderProps;
};

type NewFolderProps = {
  id: string;
  parentId: string;
  name: string;
  creator: string;
  type: "folder" | "file";
  date: Date;
  url: string;
  subFolders: Array<NewFolderProps>;
};

const mapStateToProps = (state: any) => {
  return { show: state.createFolderModal, folders: state.folders };
};

export default connect(mapStateToProps, {
  addRoute,
  addFolder,
  hideCreateFolderModal,
})(CreateFolder);
