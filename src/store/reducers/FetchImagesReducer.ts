import { AnyAction } from "redux";

const initialImages = {};

const FetchImagesReducer = (images = initialImages, action: AnyAction) => {
  if (action.type === "FETCH_IMAGES") {
    let id = action.payload.id;
    return { ...images, id: [...action.payload.newImages] };
  }

  return images;
};

export default FetchImagesReducer;
