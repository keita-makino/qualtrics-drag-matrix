import { Input } from '../types/Input';
import { GlobalState } from './index';

export const editInput = (_state: GlobalState, input: Input) => {
  const state = { ..._state };
  const element = state.inputs.find(
    (item) => JSON.stringify(item.location) === JSON.stringify(input.location)
  );

  if (element != null) {
    element.selected = input.selected;
    if (element.htmlElement != null) {
      element.htmlElement.classList.contains('q-checked')
        ? element.htmlElement.classList.remove('q-checked')
        : element.htmlElement.classList.add('q-checked');
    }
  }
  return state;
};
