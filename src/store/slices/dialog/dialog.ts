import { DialogType } from "@constants";
import { useEffect, useState } from "react";
import { Reducer } from "redux";
import { store } from "store";
import { getState, injectReducer, subscribe } from "store/utilities/utilities";

export interface DialogState {
  isDialogOpen: boolean;
  type: DialogType | null;
}

const STORE_KEY = "dialog";

export const initialDialogState = {
  isDialogOpen: false,
  type: null,
};

const reducers: Record<string, Reducer> = {
  setDialogOpen(state) {
    return { ...state, isDialogOpen: true };
  },
  setDialogType(state, payload) {
    return { ...state, type: payload };
  },
  resetDialog(state) {
    return { ...state, ...initialDialogState };
  },
};

injectReducer(STORE_KEY, initialDialogState, reducers);

export const useDialogState = () => {
  const [state, setState] = useState<DialogState>(
    getState(STORE_KEY) ?? initialDialogState
  );

  useEffect(() => {
    subscribe(STORE_KEY, setState);
  }, [setState]);

  return state;
};

// Add dispatch functions here.
export function setDialogOpen() {
  store.dispatch({ type: "setDialogOpen" });
}

export function setDialogType(payload: DialogType) {
  store.dispatch({ type: "setDialogType", payload });
}

export function resetDialog() {
  store.dispatch({ type: "resetDialog" });
}
