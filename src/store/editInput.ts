import { Input } from '../types/Input';
import { GlobalState } from './index';

export const editInput = (_state: GlobalState, input: Input, index: number) => {
  const state = { ..._state };
  if (index < state.inputs.length) {
    state.inputs[index] = input;

    if (state.inputs[index].htmlElement) {
      state.inputs[index].htmlElement!.value =
        JSON.stringify(input.choices) || '';
    }
  }
  return state;
};
