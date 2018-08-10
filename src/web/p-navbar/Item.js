import React, { Component } from 'react';
import './Styles.scss';

class Item extends Component {
	constructor(props) {
		super(props);
		this.navItem = React.createRef();
	}

	componentDidMount() {
		const { onPushNav, isEnd, offset } = this.props;
		let width = this.navItem.current.clientWidth;
		onPushNav && onPushNav( isEnd ? width : width + offset);
	}

	renderChild = () => {
		const { children } = this.props;

		if (React.isValidElement(children)) {
			return React.Children.only(children);
		}

		return children;
	}
	
	render() {
		const { active, offset, onClick } = this.props;
		
		return (
			<div
				ref={this.navItem}
				className={`rc-nav-bar ${active && 'rc-nav-bar-active'}`}
				style={{ marginRight: offset }}
				onClick={onClick}
			>
				{this.renderChild()}
				{active && 
				<div className="_nav-ink" />}
			</div>
		);
	}
}

export default Item;
