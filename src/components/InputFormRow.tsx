import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import { useDragSelect } from '../contexts/DragSelectContext';
import { useGlobalContext, useGlobalStateUpdateContext } from '../store';
import { InputFormCell } from './InputFormCell';

export type InputRowProps = {
  label: string;
  index: number;
};

export const StyledGrid = styled(Grid)({
  padding: '0.5rem',
  [`& .MuiTypography-root`]: {
    paddingRight: '2rem',
  },
}) as typeof Grid;

export const InputFormRow: React.FC<InputRowProps> = (props: InputRowProps) => {
  const state = useGlobalContext();

  return (
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
      <Box
        height={'4rem'}
        width={'16rem'}
        display={'flex'}
        alignItems={'center'}
      >
        <Typography sx={{ userSelect: 'none' }}>
          {state.inputs[props.index].label}
        </Typography>
      </Box>
      {state.choices.map((_item, index: number) => {
        return <InputFormCell row={props.index} column={index} />;
      })}
    </StyledGrid>
  );
};
