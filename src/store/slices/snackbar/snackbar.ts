import { AlertProps } from "@mui/material";
import { useEffect, useState } from "react";
import { Reducer } from "redux";
import { store } from "store";
import { getState, injectReducer, subscribe } from "store/utilities/utilities";

export interface SnackbarState {
  isSnackbarOpen: boolean;
  severity: AlertProps["severity"] | null;
  message: null;
}

const STORE_KEY = "snackbar";

export const initialSnackbarState = {
  isSnackbarOpen: false,
  severity: null,
  message: null,
};

const reducers: Record<string, Reducer> = {
  setMessage(state, payload) {
    return { ...state, message: payload };
  },
  setSeverity(state, payload) {
    return { ...state, severity: payload };
  },
  setOpen(state) {
    return { ...state, isSnackbarOpen: true };
  },
  reset(state) {
    return { ...state, isSnackbarOpen: false, severity: null, message: null };
  },
};

injectReducer(STORE_KEY, initialSnackbarState, reducers);

export const useSnackbarState = () => {
  const [state, setState] = useState<SnackbarState>(
    getState(STORE_KEY) ?? initialSnackbarState
  );

  useEffect(() => {
    subscribe(STORE_KEY, setState);
  }, [setState]);

  return state;
};

// Add dispatch functions here.
export function setSnackbarMessage(payload: string) {
  store.dispatch({ type: "setMessage", payload });
}

export function setSnackbarSeverity(payload: AlertProps["severity"]) {
  store.dispatch({ type: "setSeverity", payload });
}

export function setSnackbarOpen() {
  store.dispatch({ type: "setOpen" });
}

export function resetSnackbar() {
  store.dispatch({ type: "reset" });
}
