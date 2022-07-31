import React from "react";

import { showImageModal, setImageUrl } from "../../store/actions";
import { connect } from "react-redux";
import ImageModal from "../ImageModal";
import "./imageThumbnail.css";

function ImageThumbnail(props: any) {
  const handleImageOpen = () => {
    props.showImageModal();
    props.setImageUrl(props.urls.small)
  }

  return (
    <span className="igt126ImageThumbnail" onClick={handleImageOpen}>
      <img className="igt127Image" src={props.urls.thumb} />
      <p>{props.user.first_name}</p>
    </span>
  );
}



export default connect(null, { showImageModal, setImageUrl })(ImageThumbnail);
