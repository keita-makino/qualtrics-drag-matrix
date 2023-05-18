import React, { useEffect, useRef } from 'react';
import { Grid, Typography, Box, Button, styled } from '@mui/material';
import { useDragSelect } from '../contexts/DragSelectContext';
import { useGlobalContext, useGlobalStateUpdateContext } from '../store';
import { InputFormCell } from './InputFormCell';

export type InputRowProps = {
  label: string;
  index: number;
};

export const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: '0.5rem',
  [`& .MuiTypography-root`]: {
    paddingRight: '2rem',
  },
}));

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
      columnSpacing={1}
    >
      <Grid item xl lg md sm xs sx={{ minWidth: '33%' }} zeroMinWidth>
        <Typography sx={{ userSelect: 'none' }}>
          {state.choiceRows[props.index].label}
        </Typography>
      </Grid>
      {state.choices.map((_item, index: number) => {
        return <InputFormCell row={props.index} column={index} />;
      })}
    </StyledGrid>
  );
};
