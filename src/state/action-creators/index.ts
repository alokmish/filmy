import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { IModalData } from "./../../components/Modal";

export const openModal = (modalData: IModalData) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.OPEN_MODAL,
      payload: modalData,
    });
    const modal = document.getElementById("content-details-modal");
    modal?.classList.add("is-active");
  };
};

export const closeModal = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CLOSE_MODAL,
    });
    const modal = document.getElementById("content-details-modal");
    modal?.classList.remove("is-active");
  };
};
