import { Grid, Typography, styled } from '@mui/material';
import { useGlobalContext } from '../store';
import React from 'react';
import { InputHeaderRow } from './InputHeaderRow';
import { useWindowSize } from 'react-use';

export const InputHeader: React.FC = () => {
  const state = useGlobalContext();
  const windowSize = useWindowSize();

  return (
    <Grid
      item
      container
      xl
      lg
      md
      sm
      xs
      sx={{
        position: windowSize.width < 900 ? 'absolute' : 'relative',
      }}
    >
      {[{ label: '' }, ...state.inputs].map(
        (item: { label: string }, index: number) => (
          <InputHeaderRow label={item.label} index={index} />
        )
      )}
    </Grid>
  );
};
