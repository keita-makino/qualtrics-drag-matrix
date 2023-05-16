import React from 'react';
import { createRoot } from 'react-dom/client';
import { Container } from './components';
import { GlobalStateProvider } from './store';
import { Bind } from './types';

const dragMatrixRender = (target: HTMLElement, bind: Bind) => {
  const container = document.createElement('div');
  container.setAttribute('id', `MapContainer${target.id}`);

  target.getElementsByClassName('QuestionBody')[0].appendChild(container);

  const directionContainer = target.querySelectorAll(
    '.ChoiceStructure'
  )[0] as HTMLElement;

  const root = createRoot(document.getElementById(`MapContainer${target.id}`)!);
  const area = document.getElementById(`MapContainer${target.id}`);

  root.render(
    <GlobalStateProvider>
      <Container
        directionContainer={directionContainer}
        bind={bind}
      />
    </GlobalStateProvider>
  );
  directionContainer.style.display = 'none';
};

(window as any).dragMatrixRender = dragMatrixRender;
