import { Input } from '../types/Input';
import { GlobalState } from './index';

export const editInput = (_state: GlobalState, input: Input) => {
  const state = { ..._state };
  const element = state.inputs.find(
    (item) => JSON.stringify(item.location) === JSON.stringify(input.location)
  );

  console.log('editInput', input, element);
  console.log('editInput', state.inputs);

  if (element != null) {
    element.selected = input.selected;
    if (element.htmlElement?.type === 'checkbox') {
      element.htmlElement.checked
        ? (element.htmlElement.checked = false)
        : (element.htmlElement.checked = true);
    }
  }
  return state;
};
