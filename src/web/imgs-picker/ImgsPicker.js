import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import './ImgsPicker.scss';
import Upload from '../upload/index';
import ImgsPreview from '../imgs-preview/index';
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
		let { value, max, getParse, onChange } = this.props;
		if (max !== 0 && value.length > max) {
			this.props.onError && this.props.onError({
				status: 0,
				msg: '超出上传限制'
			});
			return;
		}
		if (onChange) {
			onChange(value.filter(_item => _item != item));
		} else {
			this.setState({
				value: this.state.value.filter(_item => _item != item)
			});
		}
	}
	handleFileSuccess = (res) => {
		let { max, value, getParse, onChange } = this.props;
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
	handlePreview = (e, i) => {
		e.persist();

		let pos = {};

		try {
			const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计算，target已变化
			const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
			const rect = target.getBoundingClientRect();

			pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
		} catch (e) {
			console.log(e);
		}

		let { value, onChange } = this.props;
		ImgsPreview.popup({
			show: true,
			dataSource: onChange ? value : this.state.value,
			opts: {
				index: i,
				history: false,
				// 动画
				getThumbBoundsFn: (index) => pos
			}
		}).then(() => {

		}).catch((error) => {
			console.log(error);
		});
	}
	render() {
		let {
			tag: Tag,
			style,
			className,
			value, max, upload = {},
			onChange,
			disabled
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
									<div className="__mask g-relative">
										<Icon 
											type="search" 
											style={{ fontSize: 20 }}
											onClick={e => this.handlePreview(e, index)} 
										/>
										<Icon
											type="delete"
											style={ disabled ? { display: 'none' } : { position: 'absolute', top: 5, right: 5 } }
											onClick={e => this.handleDel(item)}
										/>
									</div>
								</div>
							</div>
						);
					})
				}
				{
					(!disabled && (value.length < max || max === 0)) &&
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
	max: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.array,
	onChange: PropTypes.func,
	onError: PropTypes.func,
	disabled: PropTypes.bool,
};
ImgsPicker.defaultProps = {
	style: {},
	tag: 'div',
	max: 3,
	disabled: false,
};
export default ImgsPicker;
