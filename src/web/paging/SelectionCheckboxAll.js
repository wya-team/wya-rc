/**
 * 全选按钮
 */
import React, { Component } from 'react';
import { Checkbox } from 'antd';

class SelectionCheckboxAll extends Component {

	handleSelectAllChange = () => {
		const { onChange } = this.props;
		onChange && onChange();
	};

	getCheckedState = () => {
		const { data, changeableRows } = this.props;
		if (data && JSON.stringify(data) !== '{}' && changeableRows.length > 0) {
			for (let i = 0; i < changeableRows.length; i++) {
				if (!data[changeableRows[i]]) {
					return false;
				}
			}
			return true;
		}
		return false;
	};

	getIndeterminateState = () => {
		const { data, changeableRows } = this.props;

		if (data && JSON.stringify(data) !== '{}') {
			let arr = [];
			for (let i = 0; i < changeableRows.length; i++) {
				if (data[changeableRows[i]]) {
					arr.push(i);
				}
			}
			return arr.length < changeableRows.length && arr.length > 0;
		}
		return false;
	};

	render() {

		return (
			<Checkbox
				checked={this.getCheckedState()}
				indeterminate={this.getIndeterminateState()}
				onChange={this.handleSelectAllChange}
			/>
		);
	}
}

export default SelectionCheckboxAll;
