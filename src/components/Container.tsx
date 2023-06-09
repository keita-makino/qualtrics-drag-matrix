import React, { useEffect } from 'react';
import { ClearButton } from './ClearButton';
import { useGlobalStateUpdateContext } from '../store';
import { InputForm } from './InputForm';
import { Grid } from '@mui/material';
import { DragSelectProvider } from '../contexts/DragSelectContext';
import { useWindowSize } from 'react-use';

type Props = {
  directionContainer: HTMLElement;
  isMobile: boolean;
};

export const Container: React.FC<Props> = (props) => {
  const update = useGlobalStateUpdateContext();

  const inputHTMLElements = [
    ...props.directionContainer.getElementsByClassName('ChoiceRow'),
  ].map((item) =>
    [...item.getElementsByTagName('td')].map(
      (item) => item.getElementsByTagName('input')[0]
    )
  );
  const labelHTMLElements =
    props.directionContainer.getElementsByClassName('table-cell');
  const choiceHTMLElements =
    props.directionContainer.getElementsByClassName('single-answer');

  console.log('inputHTMLElements', inputHTMLElements);

  useEffect(() => {
    if ([...inputHTMLElements].length > 0) {
      update({
        type: 'ADD_INPUTS',
        inputs: [...inputHTMLElements]
          .map((item, index) =>
            item.map((item2, index2) => ({
              htmlElement: item2,
              selected: false,
              location: {
                row: index,
                column: index2,
              },
            }))
          )
          .flat(),
      });
    }

    if ([...labelHTMLElements].length > 0) {
      update({
        type: 'ADD_CHOICEROWS',
        choiceRows: [...labelHTMLElements].map((item, index) => ({
          label: item.textContent ? item.textContent : '',
        })),
      });
      update({
        type: 'INITIALIZE_ROWHEIGHTS',
        numberOfRows: [...labelHTMLElements].length + 1,
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
      update({
        type: 'INITIALIZE_HEADERHEIGHTS',
        numberOfHeaders:
          [...choiceHTMLElements].filter(
            (item, index, array) =>
              array.findIndex(
                (item2) =>
                  item2.children[0].textContent === item.children[0].textContent
              ) === index
          ).length + 1,
      });
    }
  }, []);

  const [area, setArea] = React.useState<HTMLElement | null>(null);

  useEffect(() => {
    setArea(document.getElementById('drag-select-area'));
  }, []);

  return (
    <DragSelectProvider
      settings={{
        draggability: false,
        area: area!,
        multiSelectMode: true,
      }}
    >
      <Grid container id={'drag-select-area'}>
        <InputForm />
        <ClearButton />
      </Grid>
    </DragSelectProvider>
  );
};
