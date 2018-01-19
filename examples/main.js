import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import App from '../src/web/CreatePrint/examples/Basic';

render(<App />, document.getElementById('pages'));
