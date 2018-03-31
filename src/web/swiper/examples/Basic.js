import React, { Component, Fragment } from 'react';
import Swiper from '../Swiper';
let data = [
	{ src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1915941505,1872321269&fm=27&gp=0.jpg', link: '#' },
	{ src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3913504614,534122190&fm=27&gp=0.jpg', link: '#' },
	{ src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3393390761,1005233492&fm=200&gp=0.jpg', link: '#' },
	{ src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=929856229,3694035278&fm=200&gp=0.jpg', link: '#' },
	{ src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2797347830,2769750334&fm=27&gp=0.jpg', link: '#' },
];
class Content extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		let settings =  {
			mode: 'mobile',
			// currentWidth: '375px',
			decorator: true,

			autoPlay: 3000,
		};
		return (
			<Fragment>
				<Swiper {...settings}>
					{
						data.map((item, index) => {
							return (
								<img src={item.src} key={index}/>
							);
						}) 
					}
				</Swiper>
			</Fragment>
		);
	}
}

export default Content;
