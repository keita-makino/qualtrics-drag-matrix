import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useGlobalContext, useGlobalStateUpdateContext } from '../store';
import { InputFormRow, StyledGrid } from './InputFormRow';
import {
  DragSelectProvider,
  useDragSelect,
} from '../contexts/DragSelectContext';
import { InputFormCell } from './InputFormCell';

type Props = {};

export const InputForm: React.FC<Props> = (props) => {
  const state = useGlobalContext();
  const update = useGlobalStateUpdateContext();
  const ds = useDragSelect();

  useEffect(() => {
    if (ds) {
      const id = ds.subscribe('callback', (e: any) => {
        const selected = e.items
          .map((item: any) => JSON.parse(item.value))
          .sort((a: any, b: any) => a.column - b.column)
          .sort((a: any, b: any) => a.row - b.row);

        state.inputs
          .map((_item: any, index: number) => index)
          .forEach((item: any) => {
            const rowItems = selected.filter(
              (item2: any) => item2.row === item
            );

            console.log(rowItems)

            if (rowItems.length > 0) {
              update({
                type: 'EDIT_INPUT',
                input: {
                  ...state.inputs[item],
                  choices: rowItems.map(
                    (item: any) => state.choices[item.column]
                  ),
                },
                index: item,
              });
            } else {
              update({
                type: 'EDIT_INPUT',
                input: {
                  ...state.inputs[item],
                  choices: [],
                },
                index: item,
              });
            }
          });
      });

      return () => {
        ds?.unsubscribe('callback', undefined, id);
      };
    }
  }, [state, ds]);

  return (
    <Grid
      item
      container
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={12}
      id={'drag-select-area'}
    >
      <StyledGrid
        item
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box width={'16rem'}>
          <Typography fontSize={'0.5rem'} sx={{ userSelect: 'none' }}>
            {' '}
          </Typography>
        </Box>
        {state.choices.map((item, index: number) => {
          return (
            <Box width={'8rem'} display={'flex'} justifyContent={'center'}>
              <Typography
                sx={{
                  padding: '0 !important',
                  borderRadius: 0,
                  width: '7.5rem',
                  textAlign: 'center',
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </StyledGrid>
      {state.inputs.map((item: { label: string }, index: number) => {
        return <InputFormRow label={item.label} index={index} />;
      })}
    </Grid>
  );
};
