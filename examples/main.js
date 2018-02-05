import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
// import App from '../src/web/create-print/examples/Basic';
// import App from '../src/web/copy/examples/Basic';
// import App from '../src/web/paging/examples/Basic';
import App from '../src/web/p-gallery/examples/Basic';
// import App from '../src/web/upload/examples/Basic';
// import App from '../src/web/editor/examples/Basic';
// import App from '../src/web/p-select-goods/examples/Basic';

render(<App />, document.getElementById('pages'));
