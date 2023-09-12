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

  console.log(totalHours, state.targetHours);

  return (
    <Grid container>
      {totalHours * 0.75 > state.targetHours ? (
        <Typography variant={'h5'} sx={{ color: 'red' }}>
          {state.language === 'EN' ? (
            <>
              Warning: It seems that your work hours are different from what you
              indicated in the previous questions for the same day. Are you
              sure?
            </>
          ) : state.language === 'ES' ? (
            <>
              Advertencia: Parece que sus horas de trabajo son diferentes a las
              horas de trabajo que indicó en la pregunta anterior. ¿Está Seguro
              de sus respuestas?
            </>
          ) : (
            <>
              警告：同じ日に前の質問で指示したものとは異なる労働時間になっているようです。
              よろしいですか？
            </>
          )}
        </Typography>
      ) : null}

      {uniqueRowIndices.length !== rowIndices.length ? (
        <Typography variant={'h5'} sx={{ color: 'red' }}>
          {state.language === 'EN' ? (
            <>
              Warning: You select two or more rows in a column. Is this correct?
            </>
          ) : state.language === 'ES' ? (
            <>
              Advertencia: Usted seleccionó dos o más columnas en la misma fila.
              ¿Es esto correcto?
            </>
          ) : (
            <>警告：列内の2つ以上の行を選択しました。これは正しいですか？</>
          )}
        </Typography>
      ) : null}
    </Grid>
  );
};
