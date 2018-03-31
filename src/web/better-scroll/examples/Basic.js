import React, { Component } from 'react';
import BetterScroll  from '../BetterScroll';
class Test extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentDidMount(){
		
	}
	render() {
		return (
			<BetterScroll className="wrapper" style={{ fontSize: 30, maxHeight: 600, overflow: 'hidden', background: "rgba(240,240,240,1)" }}>
				<ul className="content">
					<li>1</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>...</li>
					<li>2</li>
				</ul>
			</BetterScroll>
		);
	}
}
Test.propTypes = {
};
export default Test;