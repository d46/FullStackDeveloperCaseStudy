import React, {Component} from 'react';
import Slider from 'react-slick';

class CarouselAlpha extends Component {
	render() {
		let settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};

		return (
			<div className="carousel-alpha">
				<div className="carousel-alpha-inner">
					<Slider {...settings}>
						<div>
							<img src="http://lorempixel.com/940/375/fashion/?1241" alt=""/>
						</div>
						<div>
							<img src="http://lorempixel.com/940/375/fashion/?nje" alt=""/>
						</div>
						<div>
							<img src="http://lorempixel.com/940/375/fashion/?c1234" alt=""/>
						</div>
						<div>
							<img src="http://lorempixel.com/940/375/fashion/?xxadh9" alt=""/>
						</div>
					</Slider>
				</div>
			</div>
		)
	}
}

export default CarouselAlpha
