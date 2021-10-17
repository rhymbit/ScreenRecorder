import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainBody from './components/MainBody';


function render() {
  ReactDOM.render(
    <MainBody />,
    document.getElementById('root')
  );
}

render();