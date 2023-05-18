import React, { ReactNode, createContext, useContext, useReducer } from 'react';
import { Bind, Input } from '../types';
import { Choice, ChoiceRow } from '../types/Input';
import { editInput } from './editInput';
import { editHeaderHeights, editRowHeights } from './editHeight';

export type GlobalState = {
  inputs: Input[];
  choiceRows: ChoiceRow[];
  choices: Choice[];
  bind: Bind;
  headerHeights: number[];
  rowHeights: number[];
  isMobile: boolean;
};

export const initialState: GlobalState = {
  inputs: [],
  choiceRows: [],
  choices: [],
  bind: false,
  headerHeights: [],
  rowHeights: [],
  isMobile: false,
};

export type Action =
  | {
      type: 'INITIALIZE_ROWHEIGHTS';
      numberOfRows: number;
    }
  | {
      type: 'INITIALIZE_HEADERHEIGHTS';
      numberOfHeaders: number;
    }
  | {
      type: 'ADD_INPUTS';
      inputs: Input[];
    }
  | {
      type: 'ADD_CHOICEROWS';
      choiceRows: ChoiceRow[];
    }
  | {
      type: 'ADD_CHOICES';
      choices: Choice[];
    }
  | {
      type: 'EDIT_INPUT';
      input: Input;
    }
  | {
      type: 'CLEAR_INPUT';
    }
  | {
      type: 'SET_HEADERHEIGHTS';
      index: number;
      height: number;
    }
  | {
      type: 'SET_ROWHEIGHTS';
      index: number;
      height: number;
    }
  | {
      type: 'SET_MOBILE';
      value: boolean;
    };

export const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'ADD_INPUTS':
      return {
        ...state,
        inputs: [...state.inputs, ...action.inputs],
      };
    case 'ADD_CHOICEROWS':
      return {
        ...state,
        choiceRows: [...state.choiceRows, ...action.choiceRows],
      };
    case 'ADD_CHOICES':
      return {
        ...state,
        choices: [...state.choices, ...action.choices],
      };
    case 'EDIT_INPUT':
      return editInput(state, action.input);
    case 'CLEAR_INPUT':
      state.inputs.forEach((item) => {
        const next = item.htmlElement?.nextElementSibling;
        if (next) {
          next.classList.remove('q-checked');
        }
      });
      return {
        ...state,
        inputs: [...state.inputs].map((item) => ({
          ...item,
          selected: false,
        })),
      };
    case 'INITIALIZE_ROWHEIGHTS':
      return {
        ...state,
        rowHeights: Array.from({ length: action.numberOfRows }, () => 0),
      };
    case 'INITIALIZE_HEADERHEIGHTS':
      return {
        ...state,
        headerHeights: Array.from({ length: action.numberOfHeaders }, () => 0),
      };
    case 'SET_HEADERHEIGHTS':
      return editHeaderHeights(state, action.index, action.height);
    case 'SET_ROWHEIGHTS':
      return editRowHeights(state, action.index, action.height);
    case 'SET_MOBILE':
      return {
        ...state,
        isMobile: action.value,
      };
    default:
      return state;
  }
};

export const GlobalStateContext = createContext({} as GlobalState);
export const GlobalStateUpdateContext = createContext(
  {} as React.Dispatch<Action>
);

export const useGlobalContext = () => useContext(GlobalStateContext);
export const useGlobalStateUpdateContext = () =>
  useContext(GlobalStateUpdateContext);

export const GlobalStateProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalStateUpdateContext.Provider value={dispatch}>
        {props.children}
      </GlobalStateUpdateContext.Provider>
    </GlobalStateContext.Provider>
  );
};
