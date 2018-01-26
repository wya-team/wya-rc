import React, { Component, Fragment } from 'react';
import { Tree, Input } from 'antd';
const TreeNode = Tree.TreeNode;

class Paths extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			treeData: [
				{ 
					title: 'Expand to load', 
					key: '0' 
				},
				{ 
					title: 'Expand to load', 
					key: '1' 
				},
				{ 
					title: 'Tree Node', 
					key: '2', 
					isLeaf: true 
				}
			],
		};
	}
	onLoadData = (treeNode) => {
		return new Promise((resolve) => {
			if (treeNode.props.children) {
				resolve();
				return;
			}
			setTimeout(() => {
				treeNode.props.dataRef.children = [ // 浅复制
					{ 
						title: 'Child Node', 
						key: `${treeNode.props.eventKey}-0` 
					},
					{ 
						title: 'Child Node', 
						key: `${treeNode.props.eventKey}-1` 
					},
				];
				// treeNode = {
				// 	...treeNode.props, 
				// 	dataRef: {
				// 		...treeNode.props.dataRef,
				// 		children: [ // 浅复制
				// 			{ 
				// 				title: 'Child Node', 
				// 				key: `${treeNode.props.eventKey}-0` 
				// 			},
				// 			{ 
				// 				title: 'Child Node', 
				// 				key: `${treeNode.props.eventKey}-1` 
				// 			},
				// 		]
				// 	}
				// };
				this.setState({
					treeData: [...this.state.treeData],
				});
				resolve();
			}, 1000);
		});
	}
	handleSelect = (selectedKeys, e) => {
		console.log(e);
	}
	handleChange = (e, key) => {
		this.refs[key].props.dataRef.title = e.target.value;
		this.setState({
			treeData: [...this.state.treeData],
		});
	}
	renderTreeNodes = (data) => {
		return data.map((item) => {
			if (item.children) {
				return (
					<TreeNode 
						title={item.title}
						ref={item.key}
						key={item.key} 
						dataRef={item}
						title={
							<Input 
								type="text" 
								value={item.title} 
								onChange={e => this.handleChange(e, item.key)}
							/>
						} 
					>
						{this.renderTreeNodes(item.children)}
					</TreeNode>
				);
			}
			return (
				<TreeNode
					ref={item.key}
					key={item.key}
					dataRef={item} 
					title={
						<Input 
							type="text" 
							value={item.title} 
							onChange={e => this.handleChange(e, item.key)}
						/>
					} 
				/>
			);
		});
	}
	render() {
		return (
			<Tree 
				showLine
				loadData={this.onLoadData}
				onSelect={this.handleSelect}
				className="__paths"
			>
				{this.renderTreeNodes(this.state.treeData)}
			</Tree>
		);
	}
}

Paths.propTypes = {
};

export default Paths;