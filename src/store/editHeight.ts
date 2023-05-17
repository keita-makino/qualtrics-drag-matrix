import { GlobalState } from './index';

export const editRowHeights = (_state: GlobalState, index: number, height: number) => {
  const state = { ..._state };
  if (index < state.rowHeights.length) {
    state.rowHeights[index] = height;
  }
  return state;
};

export const editHeaderHeights = (_state: GlobalState, index: number, height: number) => {
    const state = { ..._state };
    if (index < state.headerHeights.length) {
      state.headerHeights[index] = height;
    }
    return state;
  };
