import React, { useEffect } from 'react';
import { ClearButton } from './ClearButton';
import { useGlobalStateUpdateContext } from '../store';
import { InputForm } from './InputForm';
import { Grid } from '@mui/material';
import { DragSelectProvider } from '../contexts/DragSelectContext';
import { useWindowSize } from 'react-use';
import { Warning } from './Warning';

type Props = {
  directionContainer: HTMLElement;
  isMobile: boolean;
  language: 'EN' | 'ES' | 'JA';
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

  const targetHours = Number(
    props.directionContainer
      .getElementsByClassName('QuestionText BorderColor')[0]
      .getElementsByTagName('strong')[0]
      .innerHTML.replaceAll(/(\d{1,2}).*/g, '$1')
  );

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

    if (targetHours > 0) {
      update({
        type: 'SET_TARGET_HOURS',
        value: targetHours,
      });
    }

    if (props.language) {
      update({
        type: 'SET_LANGUAGE',
        value: props.language,
      });
    }

    if (targetHours > 0) {
      update({
        type: 'SET_TARGET_HOURS',
        value: targetHours,
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
        <Warning />
        <InputForm />
        <ClearButton />
      </Grid>
    </DragSelectProvider>
  );
};
