import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Grid, styled } from '@mui/material';
import { useDragSelect } from '../contexts/DragSelectContext';
import { useGlobalContext, useGlobalStateUpdateContext } from '../store';
import { useWindowSize } from 'react-use';

export type InputCellProps = {
  row: number;
  column: number;
};

export const InputFormCell: React.FC<InputCellProps> = (
  props: InputCellProps
) => {
  const state = useGlobalContext();
  const ref = useRef(null);
  const ds = useDragSelect();
  const [variant, setVariant] = useState<any>('outlined');
  const windowSize = useWindowSize();

  useEffect(() => {
    const element = ref.current;
    if (element && ds) {
      ds.addSelectables(element);
    }
  }, [ds, ref]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      (element as any).value = JSON.stringify({
        row: props.row,
        column: props.column,
      });
    }
  }, [ref]);

  useEffect(() => {
    if (
      state.inputs.find(
        (item) =>
          item.location.row === props.row &&
          item.location.column === props.column
      )?.selected
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
        height: Math.max(...state.rowHeights) + 24,
      }}
    >
      <Button
        ref={ref}
        variant={variant}
        sx={{
          height: '90%',
          width: '100%',
          borderRadius: 1,
          boxSizing: 'border-box',
        }}
      >
        {' '}
      </Button>
    </Grid>
  );
};
