import React, {Component} from 'react';

class NavigationBeta extends Component {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: props.windowWidth
		}
	}

	render() {
		if (this.state.windowWidth < 960) {
			return this.mobile()
		} else {
			return this.desktop()
		}
	}

	mobile() {
		return (
			<div className="navigation-beta">
				<ul>
					<li>
						<a href="#">Sign in/Register</a>
					</li>
					<li>
						<a href="#">Stores/Stockists</a>
					</li>
				</ul>
			</div>
		)
	}

	desktop() {
		return (
			<div className="navigation-beta">
				<ul>
					<li>
						<a href="#">Sign in/Register</a>
					</li>
					<li>
						<a href="#">Stores/Stockists</a>
					</li>
					<li className="hideMobile">
						<a href="#">Your bag (2)</a>
					</li>
				</ul>
			</div>
		)
	}
}

export default NavigationBeta
