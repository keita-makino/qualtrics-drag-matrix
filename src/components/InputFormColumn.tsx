import { Grid, Typography, styled } from '@mui/material';
import { InputFormCell } from './InputFormCell';
import React, { useEffect } from 'react';
import { useGlobalContext, useGlobalStateUpdateContext } from '../store';
import { useWindowSize } from 'react-use';

type InputFormColumnProps = {
  index: number;
};

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    writingMode: 'vertical-rl',
  },
}));

export const InputFormColumn: React.FC<InputFormColumnProps> = (props) => {
  const state = useGlobalContext();
  const update = useGlobalStateUpdateContext();
  const ref = React.useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const element = ref.current;
    if (element) {
      update({
        type: 'SET_HEADERHEIGHTS',
        height: element.clientHeight,
        index: props.index + 1,
      });

      if (windowSize.width < 900) {
        if (!state.isMobile) {
          update({
            type: 'SET_HEADERHEIGHTS',
            height: element.clientHeight * 2,
            index: props.index + 1,
          });
        }
        update({
          type: 'SET_MOBILE',
          value: true,
        });
      } else {
        update({
          type: 'SET_MOBILE',
          value: false,
        });
      }
    }
  }, [ref, windowSize]);

  return (
    <Grid
      item
      container
      xl
      lg
      md
      sm
      xs
      sx={{ position: 'relative', zIndex: -100 }}
    >
      <Grid
        container
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          height: Math.max(...state.headerHeights),
        }}
        justifyContent={'center'}
        alignContent={'center'}
      >
        <Typography
          align={'center'}
          ref={ref}
          sx={{
            boxSizing: 'border-box',
            padding: '0.5rem',
            userSelect: 'none',
            writingMode: windowSize.width < 900 ? 'vertical-rl' : 'unset',
          }}
        >
          {state.choices[props.index].label}
        </Typography>
      </Grid>
      {state.choiceRows.map((_item, index: number) => {
        return (
          <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
            <InputFormCell row={index} column={props.index} />
          </Grid>
        );
      })}
    </Grid>
  );
};
