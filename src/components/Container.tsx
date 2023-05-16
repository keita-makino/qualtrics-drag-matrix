import React, { useEffect } from 'react';
import { ClearButton } from './ClearButton';
import { useGlobalContext, useGlobalStateUpdateContext } from '../store';
import { InputForm } from './InputForm';
import { Grid, Switch, Typography } from '@mui/material';
import { Bind } from '../types';
import {
  DragSelectProvider,
  useDragSelect,
} from '../contexts/DragSelectContext';

type Props = {
  directionContainer: HTMLElement;
  bind: Bind;
};

export const Container: React.FC<Props> = (props) => {
  const state = useGlobalContext();
  const update = useGlobalStateUpdateContext();

  const inputHTMLElements =
    props.directionContainer.getElementsByTagName('input');
  const labelHTMLElements =
    props.directionContainer.getElementsByClassName('table-cell');
  const choiceHTMLElements =
    props.directionContainer.getElementsByClassName('single-answer');

  useEffect(() => {
    if ([...labelHTMLElements].length > 0) {
      update({
        type: 'ADD_INPUTS',
        inputs: [...labelHTMLElements].map((item, index) => ({
          label: item.children[0].children[0].textContent
            ? item.children[0].children[0].textContent.replace(/\n/g, ' ')
            : '',
          htmlElement: inputHTMLElements[index],
          choices: [],
        })),
      });
    }
    if ([...choiceHTMLElements].length > 0) {
      update({
        type: 'ADD_CHOICES',
        choices: [...choiceHTMLElements]
          .filter(
            (item, index, array) =>
              array.findIndex(
                (item2) =>
                  item2.children[0].textContent === item.children[0].textContent
              ) === index
          )
          .map((item, index) => ({
            label: item.children[0].textContent
              ? item.children[0].textContent
              : '',
            value: index,
          })),
      });
    }
  }, []);

  return (
    <Grid container>
      <DragSelectProvider
        settings={{
          draggability: false,
          area: state.isDefaultOptionSelected
            ? undefined
            : document.getElementById('drag-select-area') || undefined,
          multiSelectMode: true,
        }}
      >
        <InputForm />
      </DragSelectProvider>
      <ClearButton />
    </Grid>
  );
};
