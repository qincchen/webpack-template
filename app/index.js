import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { TestComponent } from './component';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(TestComponent);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./component', () => {
    render(TestComponent);
  });
}
