import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImgsPicker.scss';
import Upload from '../upload/index';
import { getParseUrl } from '../utils/utils';
class ImgsPicker extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			value: props.value
		};
	}
	componentWillReceiveProps(nextProps) {
		let { onChange } = this.props;
		if (!onChange && !nextProps.value.every((item, index) => item === this.props.value[index])) {
			this.setState({
				value: nextProps.value
			});
		}
	}
	handleDel = (item) => {
		let { value, getParse, onChange } = this.props;
		if (onChange) {
			onChange(value.filter(_item => _item != item));
		} else {
			this.setState({
				value: this.state.value.filter(_item => _item != item)
			});
		}
	}
	handleFileSuccess = (res) => {
		let { value, getParse, onChange } = this.props;
		if (onChange) {
			onChange([...value, getParse ? getParse(res) : res.data.url]);
		} else {
			this.setState({
				value: [...this.state.value, getParse ? getParse(res) : res.data.url]
			});
		}
	}
	handleFileError = (res) => {
		console.log(res);
		this.props.onError && this.props.onError(res);
	}
	render() {
		let {
			tag: Tag,
			style,
			className,
			value, limit, upload = {},
			onChange
		} = this.props;
		value = onChange ? value : this.state.value;
		return (
			<Tag className={`rcp-imgs-picker${className ? ` ${className}` : ''}`} style={style}>
				{
					value.map((item, index) => {
						return (
							<div className="__item __normal" key={item}>
								<div
									className="__img"
									style={{ backgroundImage: `url("${item}")` }}
								>
									<div className="__mask">
										<span onClick={e => this.handleDel(item)}>&#10006;</span>
									</div>
								</div>
							</div>
						);
					})
				}
				{
					value.length < limit &&
						<Upload
							className="__upload __normal"
							tag="div"
							onFileSuccess={this.handleFileSuccess}
							onFileError={this.handleFileError}
							{...upload}
						/>
				}

			</Tag>
		);
	}
}
ImgsPicker.propTypes = {
	tag: PropTypes.string,
	limit: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.array,
	onChange: PropTypes.func,
};
ImgsPicker.defaultProps = {
	style: {},
	tag: 'div',
	limit: 3,
};
export default ImgsPicker;
