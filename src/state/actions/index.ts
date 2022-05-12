import { IModalData } from "./../../components/Modal";
import { ActionType } from "../action-types";

interface OpenModalAction {
  type: ActionType.OPEN_MODAL;
  payload: IModalData;
}

interface CloseModalAction {
  type: ActionType.CLOSE_MODAL;
}

export type Action = OpenModalAction | CloseModalAction;
