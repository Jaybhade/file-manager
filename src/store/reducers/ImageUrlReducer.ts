import { AnyAction } from "redux";

const ImageUrlReducer = (imageUrl = "", action: AnyAction) => {
  if (action.type === "SET_IMAGE_URL") {
    return action.payload;
  }

  return imageUrl;
};

export default ImageUrlReducer;