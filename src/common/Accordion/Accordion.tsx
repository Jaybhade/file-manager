import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import "./accordion.css";

const Accordion = (props: AppProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(
    props.parentName === "root" ? true : false
  );
  return (
    <div className="acc111AccordionParent">
      <div className="acc112AccordionButton" onClick={() => setIsOpen(!isOpen)}>
        <div>
          <Link to={props.url}>{props.parentName}</Link>
        </div>
        <div>{props.containSubFolders ? (isOpen ? "-" : "+") : null}</div>
      </div>
      <div
        className="acc114AccordionChild"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {props.children}
      </div>
    </div>
  );
};

type AppProps = {
  parentName: string;
  children?: React.ReactNode;
  containSubFolders: boolean;
  url: string;
};

export default memo(Accordion);
