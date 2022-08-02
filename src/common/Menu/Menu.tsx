import "./menu.css";

import {
  removeFolder,
  removeRoute,
  showFolderInfoModal,
  setFolderInfoId
} from "../../store/actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { NewFolderProps } from "../../utils/types";

function Menu(props: AppProps) {

  const handleFolderDelete = () => {
    props.removeFolder(props.id);
    props.removeRoute(props.url);
  };

  const handleFolderInfo = () => {
    props.showFolderInfoModal();
  }

  return (
      <div className="mnu128MenuParent" style={{ top: props.top, left: props.left }}>
        <Link to={props.url}>
          <div className="mnu129MenuElement mnu130Element1">Open</div>
        </Link>
        <div className="mnu129MenuElement" onClick={handleFolderInfo}>
          Get Info
        </div>
        <div className="mnu129MenuElement mnu131Delete" onClick={handleFolderDelete}>
          Delete
        </div>
      </div>
  );
}

type AppProps = {
  id: string;
  top: number;
  left: number;
  removeFolder: any;
  removeRoute: any;
  folders: NewFolderProps;
  url: string;
  showFolderInfoModal: any;
  setFolderInfoId: any;
};

const mapStateToProps = (state: any) => {
  return { folders: state.folders };
};

export default connect(mapStateToProps, {
  removeFolder,
  removeRoute,
  showFolderInfoModal,
  setFolderInfoId
})(Menu);
