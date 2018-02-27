import React, { Component, Fragment } from 'react';
class Item extends Component {
	constructor(props, text){
		super(props, text);
	}

	render() {
		const { itemData = {}, onClick, activeText, staticText, disableText, disableArr, selectArr } = this.props;

		const {
			product_name,
			cover_img,
			product_id
		} = itemData;

		const disabled = disableArr.includes(product_id);
		const show = selectArr.includes(product_id);
		return (
			<div className="__item">
				<div className="__img">
					<img
						src={`${cover_img}`}
						style={{ width: '60px', height: '60px' }}
					/>
					<div style={{ paddingLeft: '20px' }}>
						{product_name}
					</div>
				</div>
				<div style={{ textAlign: 'right' }}>
					{
						disabled
							? <div className="__btn __disable" >{disableText}</div>
							: (
								<div
									onClick={() => onClick(!show, product_id, itemData)}
									className={`__btn ${show ? '__active' : ''}`}
								>{show ? activeText : staticText}</div>
							)
					}
				</div>
			</div>
		);
	}
}

export default Item;
