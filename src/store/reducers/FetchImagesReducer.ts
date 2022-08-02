import { AnyAction } from "redux";

const initialImages:any = [];

const FetchImagesReducer = (images = initialImages, action: AnyAction) => {
  if (action.type === "FETCH_IMAGES") {
    console.log(action.payload.data);
    let previousImages = initialImages.find((element:any) => element.id === action.payload.id);
    let restImages = initialImages.filter((element:any) => element.id !== action.payload.id);
    return [...restImages, {id: action.payload.id, data: [...previousImages.data, ...action.payload.data]}];
  }

  return images;
};

export default FetchImagesReducer;
