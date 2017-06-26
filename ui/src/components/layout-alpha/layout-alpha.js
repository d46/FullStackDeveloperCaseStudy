import React, {Component} from 'react';
import $ from 'jquery';
import NavigationAlpha from "../navigation-alpha/navigation-alpha";
import LogoAlpha from "../logo-alpha/logo-alpha";
import NavigationBeta from "../navigation-beta/navigation-beta";
import NavigationBetaCart from "../navigation-beta-cart/navigation-beta-cart";
import SearchAlpha from "../search-alpha/search-alpha";
import CarouselAlpha from "../carousel-alpha/carousel-alpha";

class LayoutAlpha extends Component {
	constructor() {
		super();
		this.state = {
			windowWidth: $(window).width()
		};

		this.events = this.events.bind(this);
		this.setWindowWidth = this.setWindowWidth.bind(this);
		this.mobile = this.mobile.bind(this);
		this.desktop = this.desktop.bind(this);
		this.events();
	}

	mobile() {
		return (
			<div className="layout-alpha">
				<NavigationAlpha/>
				<LogoAlpha/>
				<NavigationBetaCart/>
				<NavigationBeta windowWidth={this.state.windowWidth}/>
				<SearchAlpha windowWidth={this.state.windowWidth}/>
				<CarouselAlpha/>
			</div>
		)
	}

	desktop() {
		return (
			<div className="layout-alpha">
				<LogoAlpha/>
				<NavigationBeta/>
				<NavigationAlpha windowWidth={this.state.windowWidth}/>
				<SearchAlpha windowWidth={this.state.windowWidth}/>
				<CarouselAlpha/>
			</div>
		)
	}

	render() {
		if (this.state.windowWidth < 960) {
			return this.mobile()
		} else {
			return this.desktop()
		}
	}

	events() {
		$(window).on('resize', this.setWindowWidth);
	}

	setWindowWidth() {
		this.setState({
			windowWidth: $(window).width()
		})
	}
}

export default LayoutAlpha
