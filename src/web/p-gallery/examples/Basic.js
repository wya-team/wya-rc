import React, { Component } from 'react';
import { PGallery } from '../../../main.js';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentDidMount() {
		PGallery.popup({

		}).then(() => {

		}).catch(() => {

		});
	}
	render() {
		return null;
	}
}
export default Basic;
