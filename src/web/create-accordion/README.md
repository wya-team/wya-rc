## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/create-accordion/Basic.html)
## 功能
手风琴

## API

属性 | 说明 | 类型 | 默认值
---|---|---|---


## 基础用法

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createAccordion } from 'wya-rc';
@createAccordion({})
class Item extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { accordion } = this.props;
		return (
			<div onClick={accordion.eventHandler}>
				<i className={`${accordion.icon}`} />
				<div ref={accordion.ref} className={accordion.content}>
					<div>
						{accordion.icon}-{accordion.content}
					</div>
				</div>
			</div>
		);
	}
}
export default Item;
```

