import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import "./folder.css";

import { Link } from "react-router-dom";
import { setFolderInfoId } from "../../store/actions";
import { connect } from "react-redux";
import { NewFolderProps } from "../../utils/types";

const Folder = (props: AppProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener("click", handleClick);
  });

  const handleContext = (event: any) => {
    event.preventDefault();
    setShowMenu(true);
    props.setFolderInfoId(props.id);
    setLeft(event.pageX);
    setTop(event.pageY);
  };

  return (
    <span onContextMenu={(e) => e.stopPropagation()}>
      {showMenu && <Menu url={props.url} top={top} left={left} id={props.id} />}
      <Link to={props.url}>
        <span onContextMenu={(e) => handleContext(e)} className="fol123FolderParent">
          <span className="fol124Folder"></span>
          <p className="fol125FolderName">{props.name}</p>
        </span>
      </Link>
    </span>
  );
}

type RequiredProps = {
  name: string;
  id: string;
  url: string;
  folders: NewFolderProps;
  setFolderInfoId : any;
};

type DefaultProps = {
  name: string;
};

type AppProps = RequiredProps & DefaultProps;

Folder.defaultProps = {
  name: "New Folder",
} as DefaultProps;

const mapStateToProps = (state: any) => {
  return {folders: state.folders};
}

export default connect(mapStateToProps, {setFolderInfoId})(Folder);
