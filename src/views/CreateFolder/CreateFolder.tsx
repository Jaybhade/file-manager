import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./createFolder.css";

import {
  addRoute,
  addFolder,
  hideCreateFolderModal,
} from "../../store/actions";
import Modal from "../../common/Modal";
import ToggleTab from "../../common/ToggleTab";
import { connect } from "react-redux";

const CreateFolder = (props: AppProps) => {
  const location = useLocation();
  const [isFirst, setIsFirst] = useState<boolean>(true);

  const findSubFolders = (id: string, folders: any, name: string) => {
    if (folders.id === id) {
      for (let i = 0; i < folders.subFolders.length; i++) {
        if (folders.subFolders[i].name === name) {
          return true;
        }
      }
      return false;
    } else {
      for (let j = 0; j < folders.subFolders.length; j++) {
        if(findSubFolders(id, folders.subFolders[j], name)) return true;
      }
    }
    return false;
  }

  const setFirst = () => {
    setIsFirst(true);
  };

  const setSecond = () => {
    setIsFirst(false);
  };

  const [newFolderInfo, setNewFolderInfo] = useState<any>({
    name: "",
    creator: "",
  });

  const handleName = (event: any) => {
    event.persist();
    setNewFolderInfo({
      ...newFolderInfo,
      name: event.target.value,
    });
    findSubFolders(props.parentId, props.folders, newFolderInfo.name)
  };

  const url = location.pathname + "/" + newFolderInfo.name;

  const handleCreator = (event: any) => {
    event.persist();
    setNewFolderInfo({
      ...newFolderInfo,
      creator: event.target.value,
    });
  };

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
          maxLength={20}
          className="crf151CreateFolderInput"
          placeholder="Name"
          value={newFolderInfo.name}
          onChange={(e) => handleName(e)}
          required
        />
        {findSubFolders(props.parentId, props.folders, newFolderInfo.name) && (
          <div className="crf153AlreadyExistWarning">Folder already exists.</div>
        )}
        <input
          maxLength={20}
          className="crf151CreateFolderInput"
          placeholder="Creator"
          value={newFolderInfo.creator}
          onChange={(e) => {
            handleCreator(e);
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
  folders: any;
};

type NewFolderProps = {
  id: string;
  parentId: string;
  name: string;
  creator: string;
  type: "folder" | "file";
  date: Date;
  url: string;
  subFolders: [];
};

const mapStateToProps = (state: any) => {
  return { show: state.createFolderModal, folders: state.folders };
};

export default connect(mapStateToProps, {
  addRoute,
  addFolder,
  hideCreateFolderModal,
})(CreateFolder);
