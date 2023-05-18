import { Input } from '../types/Input';
import { GlobalState } from './index';

export const editInput = (_state: GlobalState, input: Input) => {
  console.log(input);
  const state = { ..._state };
  state.inputs.filter((item) => item.location === input.location)[0] = input;

  const next = state.inputs.filter(
    (item) => item.location === input.location
  )[0].htmlElement?.nextElementSibling;

  console.log(next);

  if (next != null) {
    next.classList.contains('q-checked')
      ? next.classList.remove('q-checked')
      : next.classList.add('q-checked');
  }
  return state;
};
