import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImgsPicker.scss';
import Upload from '../Upload';
import { getParseUrl } from '../utils/utils';
class ImgsPicker extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleDel = (item) => {
		const { value, getParse } = this.props;
		this.props.onChange && this.props.onChange(value.filter(_item => _item != item));
	}
	handleFileSuccess = (res) => {
		const { value, getParse } = this.props;
		this.props.onChange && this.props.onChange([...value, getParse ? getParse(res) : res.data.url]);
	}
	render() {
		const { tag: Tag, style, className, value, limit, upload = {} } = this.props;
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
							{...upload}
						/>
				}

			</Tag>
		);
	}
}
ImgsPicker.propTypes = {
	style: PropTypes.object
};
ImgsPicker.defaultProps = {
	style: {},
	tag: 'div',
	limit: 3,
};
export default ImgsPicker;
