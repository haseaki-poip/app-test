import { createContext } from "react";

export type ToastStyle = "succeed" | "failed" | "busy";

export type ToastState = {
  isShown: boolean;
  message: string;
  style: ToastStyle;
};

export const initialState: ToastState = {
  isShown: false,
  message: "",
  style: "succeed",
};

export const ToastStateContext = createContext(initialState);

export type ToastAction = {
  // omitは第一引数の方から特定のプロパティーを除く
  // Partialは型のプロパティを必須ではなくする．(undefined)を可能とする．
  showToast: (state?: Partial<Omit<ToastState, "isShown">>) => void;
  hideToast: () => void;
};

export const initialAction: ToastAction = {
  showToast: () => {},
  hideToast: () => {},
};

export const ToastActionContext = createContext(initialAction);
