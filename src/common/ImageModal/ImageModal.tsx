import React, { useEffect, useState } from "react";
import "./imageModal.css";

import { connect } from "react-redux";
import { hideImageModal } from "../../store/actions";

import Modal from "../../ui/Modal";

function ImageModal(props: AppProps) {
  const [show, setShow] = useState<boolean>(false);
  const {url, placeholder, height, width} = props.imageData;

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setShow(true);
    };

    return () => {
      setShow(false)
    }
  }, [url]);

  return (
    <Modal show={props.show} hideModal={props.hideImageModal}>
        <img
          src={show ? url : placeholder}
          style={{width: 500, height: (500*height)/width}}
          className="imd180Image"
        />
    </Modal>
  );
}

type AppProps = {
  show: boolean;
  hideImageModal: any;
  imageData: any;
};

const mapStateToProps = (state: any) => {
  return { show: state.imageModal };
};

export default connect(mapStateToProps, { hideImageModal })(ImageModal);
