import { AnyAction } from "redux";

const InitialRoutes = [{ id: "0", name: "root", url: "/root", type: "folder"}];

const RoutesReducer = (routes = InitialRoutes, action: AnyAction) => {
  if (action.type === "ADD_ROUTE") {
    return [...routes, action.payload];
  } else if (action.type === "REMOVE_ROUTE") {
    const newRoutes = routes.filter((element) => element.url.slice(0, action.payload.length) !== action.payload);
    return [...newRoutes];
  }

  return routes;
};

export default RoutesReducer;