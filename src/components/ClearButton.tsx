import styled from '@emotion/styled';
import { Grid, Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useGlobalContext, useGlobalStateUpdateContext } from '../store';
import { useWindowSize } from 'react-use';
import { useDragSelect } from '../contexts/DragSelectContext';

export type ClearButtonProps = {};

export const ClearButton: React.FC<ClearButtonProps> = (
  props: ClearButtonProps
) => {
  const update = useGlobalStateUpdateContext();

  const ref = useRef(null);
  const ds = useDragSelect();

  useEffect(() => {
    const element = ref.current;
    if (element && ds) {
      ds.addSelectables(element);
    }
  }, [ds, ref]);

  return (
    <Grid container>
      <Grid item container xl={6} lg={6} md={6} sm={6} xs={6}>
        <Button
          ref={ref}
          variant={'contained'}
          color={'primary'}
          sx={{ color: 'white !important' }}
          value={'clear'}
          id={'clear-button'}
        >
          <Typography variant={'button'}>Clear Input</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
