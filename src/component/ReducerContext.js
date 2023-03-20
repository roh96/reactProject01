import { useReducer, createContext, useContext, useState } from "react";
export const RContext = createContext(null);

const initData = {
  totalCount: 0,
  list: [{ id: "", price: "", msg: " ", day: "" }],
};
