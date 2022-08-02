import { AnyAction } from "redux";

const ImageModalReducer = (showImageModal = false, action: AnyAction) => {
  if (action.type === "SHOW_IMAGE_MODAL") {
    return true;
  } else if (action.type === "HIDE_IMAGE_MODAL") {
    return false;
  }

  return showImageModal;
};

export default ImageModalReducer;
