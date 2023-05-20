import React from 'react';
import { createRoot } from 'react-dom/client';
import { Container } from './components';
import { GlobalStateProvider } from './store';

const dragMatrixRender = (target: HTMLElement) => {
  const container = document.createElement('div');
  container.setAttribute('id', `MapContainer${target.id}`);
  const initialWidth = window.innerWidth;

  target.getElementsByClassName('QuestionBody')[0].appendChild(container);

  const directionContainer = target.querySelectorAll(
    '.ChoiceStructure'
  )[0] as HTMLElement;

  const root = createRoot(document.getElementById(`MapContainer${target.id}`)!);

  root.render(
    <GlobalStateProvider>
      <Container
        directionContainer={directionContainer}
        isMobile={initialWidth < 900}
      />
    </GlobalStateProvider>
  );
  directionContainer.style.display = 'none';
};

(window as any).dragMatrixRender = dragMatrixRender;
