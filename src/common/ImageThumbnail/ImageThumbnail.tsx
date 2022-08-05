import React from "react";

import { showImageModal, setImageUrl } from "../../store/actions";
import { connect } from "react-redux";
import "./imageThumbnail.css";

function ImageThumbnail(props: AppProps) {

  const handleImageOpen = () => {
    props.showImageModal();
    props.setImageUrl({
      url: props.urls.small,
      placeholder: props.urls.thumb,
      width: props.width,
      height: props.height
    })
  }

  return (
    <span className="igt126ImageThumbnail" onClick={handleImageOpen}>
      <img className="igt127Image" src={props.urls.thumb} />
      <p>{props.user.first_name}</p>
    </span>
  );
}

type UrlType = {
  small: string;
  thumb: string;
}

type UserType = {
  first_name: string;
}

type AppProps = {
  showImageModal: any;
  setImageUrl: any;
  width: number;
  height: number;
  urls: UrlType;
  user: UserType;
}

export default connect(null, { showImageModal, setImageUrl })(ImageThumbnail);
