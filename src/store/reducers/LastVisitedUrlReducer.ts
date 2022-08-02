import { AnyAction } from "redux";

const LastVisitedUrlReducer = (lastVisitedUrl = "/root", action: AnyAction) => {
  if (action.type === "SET_LAST_VISITED_URL") {
    return action.payload;
  }

  return lastVisitedUrl;
};

export default LastVisitedUrlReducer;
