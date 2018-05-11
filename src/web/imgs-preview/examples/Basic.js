import React from 'react';
import ImgsPreview from '../ImgsPreview';

class GalleryPage extends React.Component {
	constructor(...params) {
		super(...params);
		this.state = {
			show: false,
			dataSource: [
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png!4-4',
					title: 'Image 1',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg!4-4',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990767112/10049533,2880,1800.jpg',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180313/942990767112/10049533,2880,1800.jpg!4-4',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png!4-4',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg!4-4',
					title: 'Image 2',
					w: 1200,
					h: 900
				}

			],
			opts: {
				closeOnScroll: false
			}
		};
		// ImgsPreview.Func.popup({
		// 	show: true,
		// 	dataSource: this.state.dataSource,
		// 	opts: {
		// 		index: 2
		// 	}
		// }).then(() => {

		// }).catch(() => {

		// });
	}
	renderRow = item => (
		<img src={item.thumbnail} width={100} height={100} alt=""/>
	);
	render() {
		const { dataSource, opts, show } = this.state;
		return (
			<ImgsPreview
				ref="imgs"
				opts={opts}
				renderRow={this.renderRow}
				dataSource={dataSource}
				portal
				// show={show}
				// onClose={this.handleClose}
			/>
		);
	}
}

export default GalleryPage;

