import React, { useEffect, useState } from "react";
import "./folderNotFound.css";

import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { NewRouteProps, StateProps } from "../../utils/types";

const FolderNotFound = (props: AppProps) => {
  const [show, setShow] = useState<boolean>(false);
  let location = useLocation();

  useEffect(() => {
    const loc =
      location.pathname[location.pathname.length - 1] === "/"
        ? location.pathname.substring(0, location.pathname.length - 1)
        : location.pathname;
    if (!props.routes.find((data) => data.url === loc)) {
      setShow(true);
    }

    return () => {
      setShow(false);
    };
  }, [location.pathname]);
  return (
    <>
      {show && (
        <div className="fnf311Parent">
          <h2>Folder Not Found</h2>
          <div>
            <Link to="/root">Click here to navigate to Root Folder</Link>
          </div>
        </div>
      )}
    </>
  );
};

type AppProps = {
  routes: Array<NewRouteProps>;
};

const mapStateToProps = (state: StateProps) => {
  return { routes: state.routes };
};

export default connect(mapStateToProps)(FolderNotFound);
