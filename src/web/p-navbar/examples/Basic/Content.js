import React, { Component } from 'react';
import NavBar from '../../NavBar';

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeKey: '1'
		};
	}
	
	handleChange = (key) => {
		this.setState({ activeKey: key });
	}

	render() {
		return (
			<NavBar activeKey={this.state.activeKey} onChange={this.handleChange}>
				<NavBar.Item key={"1"}>Tab1</NavBar.Item>
				<NavBar.Item key={"2"}>Tab2</NavBar.Item>
				<NavBar.Item key={"3"}>Tab3</NavBar.Item>
				<NavBar.Item key={"4"}>Tab4</NavBar.Item>
				<NavBar.Item key={"5"}>Tab5</NavBar.Item>
				<NavBar.Item key={"6"}>Tab6</NavBar.Item>
				<NavBar.Item key={"7"}>Tab7</NavBar.Item>
				<NavBar.Item key={"8"}>Tab8</NavBar.Item>
				<NavBar.Item key={"9"}>Tab9</NavBar.Item>
				<NavBar.Item key={"10"}>Tab10</NavBar.Item>
				<NavBar.Item key={"11"}>Tab11</NavBar.Item>
				<NavBar.Item key={"12"}>Tab12</NavBar.Item>
				<NavBar.Item key={"13"}>Tab13</NavBar.Item>
				<NavBar.Item key={"14"}>Tab14</NavBar.Item>
				<NavBar.Item key={"15"}>Tab15</NavBar.Item>
				<NavBar.Item key={"16"}>Tab16</NavBar.Item>
			</NavBar>
		);
	}
}

export default Content;