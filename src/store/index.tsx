import { ReactNode, useContext, useReducer, useState } from 'react';
import { createContext } from 'react';
import { editInput } from './editInput';
import { Input, Bind } from '../types';
import { Choice } from '../types/Input';
import React from 'react';

export type GlobalState = {
  inputs: Input[];
  choices: Choice[];
  bind: Bind;
  isDefaultOptionSelected: boolean;
};

export const initialState: GlobalState = {
  inputs: [],
  choices: [],
  bind: false,
  isDefaultOptionSelected: false,
};

export type Action =
  | {
      type: 'ADD_DEFAULTOPTION';
      defaultOption: {
        label: string;
      };
    }
  | {
      type: 'ADD_INPUTS';
      inputs: Input[];
    }
  | {
      type: 'ADD_CHOICES';
      choices: Choice[];
    }
  | {
      type: 'EDIT_INPUT';
      input: Input;
      index: number;
    }
  | {
      type: 'CLEAR_INPUT';
    }
  | {
      type: 'TOGGLE_DEFAULTOPTION';
    };

export const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'ADD_INPUTS':
      return {
        ...state,
        inputs: [...state.inputs, ...action.inputs],
      };
    case 'ADD_CHOICES':
      return {
        ...state,
        choices: [...state.choices, ...action.choices],
      };
    case 'EDIT_INPUT':
      return editInput(state, action.input, action.index);
    case 'CLEAR_INPUT':
      return {
        ...state,
        inputs: state.inputs.map((item) => ({
          ...item,
          choices: [],
        })),
      };
    case 'TOGGLE_DEFAULTOPTION':
      return {
        ...state,
        isDefaultOptionSelected: !state.isDefaultOptionSelected,
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
