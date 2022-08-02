import React from "react";
import "./imageModal.css";

import { connect } from "react-redux";
import { hideImageModal } from "../../store/actions";

import Modal from "../Modal";

function ImageModal(props: AppProps) {
  return (
    <Modal show={props.show} hideModal={props.hideImageModal}>
      {props.url ? (
        <img src={props.url} className="imd180Image" />
      ) : (
        <div className="imd181Loader"></div>
      )}
    </Modal>
  );
}

type AppProps = {
  show: boolean;
  hideImageModal: any;
  url: string;
};

const mapStateToProps = (state: any) => {
  return { show: state.imageModal };
};

export default connect(mapStateToProps, { hideImageModal })(ImageModal);
