import { AnyAction } from "redux";

const ImageUrlReducer = (imageData = {}, action: AnyAction) => {
  if (action.type === "SET_IMAGE_URL") {
    console.log(action.payload)
    return action.payload;
  }

  return imageData;
};

export default ImageUrlReducer;