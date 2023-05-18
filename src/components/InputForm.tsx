import { Grid, Typography, styled } from '@mui/material';
import React, { useEffect } from 'react';
import { useGlobalContext, useGlobalStateUpdateContext } from '../store';
import { useDragSelect } from '../contexts/DragSelectContext';
import { InputHeader } from './InputHeader';
import { InputFormColumn } from './InputFormColumn';

type Props = {};

export const InputForm: React.FC<Props> = (props) => {
  const state = useGlobalContext();
  const update = useGlobalStateUpdateContext();
  const ds = useDragSelect();

  useEffect(() => {
    if (ds) {
      const id = ds.subscribe('callback', (e: any) => {
        const items = e.items;

        console.log('items', items);
        console.log('inputs', state.inputs);
        update({
          type: 'CLEAR_INPUT',
        });

        if (items.map((item: { value: any }) => item.value).includes('clear')) {
          ds.clearSelection();
          return;
        }

        const selected = items
          .map((item: any) => JSON.parse(item.value))
          .sort((a: any, b: any) => a.column - b.column)
          .sort((a: any, b: any) => a.row - b.row);

        selected.forEach((item: any) => {
          update({
            type: 'EDIT_INPUT',
            input: {
              htmlElement: state.inputs.filter(
                (input) =>
                  input.location.row === item.row &&
                  input.location.column === item.column
              )[0].htmlElement,
              location: {
                row: item.row,
                column: item.column,
              },
              selected: true,
            },
          });
        });
      });

      return () => {
        ds?.unsubscribe('callback', undefined, id);
      };
    }
  }, [ds]);

  return (
    <Grid
      item
      container
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={12}
      columnSpacing={1}
      marginBottom={2}
    >
      <InputHeader />
      {state.choices.map((item, index: number) => (
        <InputFormColumn index={index} />
      ))}
    </Grid>
  );
};
