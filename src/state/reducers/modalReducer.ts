import { IModalData } from "./../../components/Modal";
import { Action } from "../actions";
import { ActionType } from "../action-types";

interface ModalState {
  modalData: IModalData | null;
}

const initialState: ModalState = {
  modalData: null,
};

export const modalReducer = (
  state: ModalState = initialState,
  action: Action
): ModalState => {
  switch (action.type) {
    case ActionType.OPEN_MODAL: {
      return {
        modalData: action.payload,
      };
    }
    case ActionType.CLOSE_MODAL: {
      return {
        modalData: null,
      };
    }
    default: {
      return state;
    }
  }
};
