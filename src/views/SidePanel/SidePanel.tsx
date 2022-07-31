import React, {memo} from 'react'
import "./sidePanel.css"

import { connect } from 'react-redux';
import Accordion from '../../common/Accordion';

const SidePanel = memo((props: AppProps) => {
    const ShowAccordion = ({name, url, subFolders}: folderData) => {
        return (
            <Accordion parentName={name} url={url} containSubFolders={subFolders.length > 0 ? true : false}>
                {subFolders.map((data: folderData) => {
                    return <ShowAccordion key={data.id} {...data} />
                })}
            </Accordion>
        )
    }

  return (
    <div className="spl170SidePanel">
        <div className="spl171SidePanelHeading">File Manager</div>
        <div className="spl172SidePanelContent">
            <ShowAccordion {...props.folders} />
        </div>
    </div>
  )
})

type folderData = {
    id: string;
    name: string;
    url: string;
    creator: string;
    date: Date;
    subFolders: Array<folderData>;
  }

type AppProps = {
    folders : folderData;
}

const mapStateToProps = (state: any) => {
    return {folders: state.folders};
}

export default connect(mapStateToProps)(SidePanel);