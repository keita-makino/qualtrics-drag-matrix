import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Grid, styled } from '@mui/material';
import { useDragSelect } from '../contexts/DragSelectContext';
import { useGlobalContext, useGlobalStateUpdateContext } from '../store';
import { useWindowSize } from './useWindowSize';

export type InputCellProps = {
  row: number;
  column: number;
};

export const InputFormCell: React.FC<InputCellProps> = (
  props: InputCellProps
) => {
  const state = useGlobalContext();
  const inputElement = useRef(null);
  const ds = useDragSelect();
  const [variant, setVariant] = useState<any>('outlined');
  const windowSize = useWindowSize();

  useEffect(() => {
    const element = inputElement.current;
    if (element && ds) {
      if (!state.isDefaultOptionSelected) {
        ds.addSelectables(element);
      } else {
        ds.removeSelectables(element);
      }
    }
  }, [ds, inputElement, state.isDefaultOptionSelected]);

  useEffect(() => {
    const element = inputElement.current;
    if (element) {
      (element as any).value = JSON.stringify({
        row: props.row,
        column: props.column,
      });
    }
  }, [inputElement]);

  useEffect(() => {
    if (
      state.inputs[props.row].choices
        .map((item: any) => item.value)
        .includes(props.column)
    ) {
      setVariant('contained');
    } else {
      setVariant('outlined');
    }
  }, [state]);

  return (
    <Grid
      container
      item
      xl
      lg
      md
      sm
      xs
      justifyContent={'center'}
      alignContent={'center'}
      sx={{
        height:
          // windowSize.width < 900
          //   ? Math.max(...state.rowHeights) + 24
          //   : Math.max(...state.rowHeights),
          Math.max(...state.rowHeights),
      }}
    >
      <Button
        ref={inputElement}
        variant={variant}
        disabled={state.isDefaultOptionSelected}
        sx={{
          height: '95%',
          width: '95%',
          borderRadius: 1,
          boxSizing: 'border-box',
        }}
      >
        {' '}
      </Button>
    </Grid>
  );
};
