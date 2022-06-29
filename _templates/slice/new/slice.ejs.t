---
to: src/store/slices/<%= name %>/<%= name %>.ts
---

import { useEffect, useState } from "react";
import { Reducer } from "redux";
import store from "store";
import { getState, injectReducer, subscribe } from "store/utilities/utilities";
import { <%= Name %>State } from "./<%= name %>.interface";

export interface <%= Name %>State {}

const STORE_KEY = "<%= name %>";

export const initial<%= Name %>State = {};

const reducers: Record<string, Reducer> = {};

injectReducer(STORE_KEY, initial<%= Name %>State, reducers);

export const use<%= Name %>State = () => {
  const [state, setState] = useState<<%= Name %>State>(
    getState(STORE_KEY) ?? initial<%= Name %>State
  );

  useEffect(() => {
    subscribe(STORE_KEY, setState);
  }, [setState]);

  return state;
};

// Add dispatch functions here.
export function dispatchAction() {
  store.dispatch({ type: "", payload: "" });
}
