## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/echarts/Basic.html)
## 功能
提取`echarts`作为单独的分包；

- 确保`echarts`模块
```
npm install echarts --save
```

[基于此内容修改，参考API](https://github.com/hustcc/echarts-for-react)

```js
import React, { Component } from 'react';
import { Echarts } from 'wya-rc';
class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			option: {},
		};
	}
	componentWillMount(){
		// 可以确定是异步回来设置的
		this.setOption(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.setOption(nextProps);
	}
	setOption($props){
		const data = this.getVirtulData($props);
		const option = this.getOption(data);
		this.setState({
			option
		});
	}
	getVirtulData($props) {
		return [["2017-01-01", 542], ["2018-01-01", 542]];
	}
	getOption(data) {
		const option = {
			// devicePixelRatio: 2,
			tooltip: {
				position: 'top'
			},
			visualMap: {
				min: 0,
				max: 1000,
				calculable: true,
				orient: 'horizontal',
				left: 'center',
				top: 'top'
			},

			calendar: [{
				range: '2017',
				cellSize: ['auto', 20]
			}, {
				top: 260,
				range: '2016',
				cellSize: ['auto', 20]
			}],

			series: [{
				type: 'heatmap',
				coordinateSystem: 'calendar',
				calendarIndex: 0,
				data: data[0]
			}, {
				type: 'heatmap',
				coordinateSystem: 'calendar',
				calendarIndex: 1,
				data: data[1]
			}]
		};
		return option;
	}
	render() {
		const { option } = this.state;
		return (
			<div>
				<Echarts
					option={option} 
					style={{ height: '500px', width: '100%' }} 
					lazyUpdate={true}
				/>
			</div>
		);
	}
}

export default App;

```