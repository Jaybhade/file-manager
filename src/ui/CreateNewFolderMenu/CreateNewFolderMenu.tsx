import React from 'react'
import "./createNewFolderMenu.css"

import {showCreateFolderModal} from "../../store/actions/index";
import { connect } from 'react-redux';

const CreateNewFolderMenu = (props: any) => {
  return (
    <div className="cnf120MenuParent" style={{ top: props.top, left: props.left }}>
          <div className="cnf121MenuElement cnf122MenuElement1" onClick={props.showCreateFolderModal}>Create New Folder</div>
      </div>
  )
}

export default connect(null, {showCreateFolderModal})(CreateNewFolderMenu)