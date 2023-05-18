import { Grid, Typography } from '@mui/material';
import { useGlobalContext, useGlobalStateUpdateContext } from '../store';
import React, { useEffect, useLayoutEffect, useSyncExternalStore } from 'react';
import { useWindowSize } from 'react-use';

type InputHeaderRowProps = {
  label: string;
  index: number;
};

export const InputHeaderRow: React.FC<InputHeaderRowProps> = (props) => {
  const state = useGlobalContext();
  const update = useGlobalStateUpdateContext();
  const ref = React.useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const element = ref.current;
    if (element) {
      update({
        type: 'SET_ROWHEIGHTS',
        height: element.clientHeight,
        index: props.index,
      });
    }
  }, [ref, windowSize]);

  return (
    <Grid
      container
      item
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={12}
      alignContent={'center'}
      sx={{
        height:
          props.index === 0
            ? Math.max(...state.headerHeights)
            : windowSize.width < 900
            ? Math.max(...state.rowHeights) + 24
            : Math.max(...state.rowHeights),
        boxSizing: 'border-box',
        padding: '0.5rem',
      }}
    >
      <Typography
        sx={{
          userSelect: 'none',
          color: windowSize.width < 900 ? '#aaaaaa' : 'unset',
          fontWeight: windowSize.width < 900 ? '700 !important' : 'unset',
        }}
        ref={ref}
      >
        {props.label}
      </Typography>
    </Grid>
  );
};
