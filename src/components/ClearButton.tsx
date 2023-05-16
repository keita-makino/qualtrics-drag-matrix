import styled from '@emotion/styled';
import { Grid, Button, Typography } from '@mui/material';
import React from 'react';
import { useGlobalStateUpdateContext } from '../store';

export type ClearButtonProps = {};

export const ClearButton: React.FC<ClearButtonProps> = (
  props: ClearButtonProps
) => {
  const update = useGlobalStateUpdateContext();

  return (
    <Grid container>
      <Grid item container xl={6} lg={6} md={6} sm={6} xs={6}>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={() => update({ type: 'CLEAR_INPUT' })}
          sx={{ color: 'white !important' }}
        >
          <Typography variant={'button'}>Clear Input</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
