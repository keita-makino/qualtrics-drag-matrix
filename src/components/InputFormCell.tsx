import React, { useEffect, useRef } from 'react';
import { Box, Button, styled } from '@mui/material';
import { useDragSelect } from '../contexts/DragSelectContext';
import { useGlobalContext, useGlobalStateUpdateContext } from '../store';

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
  const [variant, setVariant] = React.useState<any>('outlined');

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
    <Box width={'7.5rem'} height={'100%'} margin={'0 0.25rem'}>
      <Button
        ref={inputElement}
        variant={variant}
        disabled={state.isDefaultOptionSelected}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: 0,
        }}
      >
        {' '}
      </Button>
    </Box>
  );
};
