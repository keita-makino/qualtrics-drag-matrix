import React, { useEffect } from 'react';
import { useGlobalContext } from '../store';
import { Grid, Typography } from '@mui/material';

type Props = {};

export const Warning: React.FC<Props> = (props) => {
  const state = useGlobalContext();

  const rowIndices = state.inputs
    .filter((item) => item.selected)
    .map((item) => item.location.row);

  const uniqueRowIndices = [...new Set(rowIndices)];

  const totalHours = uniqueRowIndices.reduce((prev, curr) => {
    if (curr === 0) {
      return prev + 6;
    } else {
      return prev + 2;
    }
  }, 0);

  return (
    <Grid container>
      {totalHours * 0.75 > state.targetHours ? (
        <Typography variant={'h5'} sx={{ color: 'red' }}>
          It seems that your work hours are different from what you indicated in
          the previous questions for the same day. Are you sure?
        </Typography>
      ) : null}
      {uniqueRowIndices.length !== rowIndices.length ? (
        <Typography variant={'h5'} sx={{ color: 'red' }}>
          Warning: You select two or more columns in a row. Is this correct?
        </Typography>
      ) : null}
    </Grid>
  );
};
