import React, {Component} from 'react';
import NavigationAlpha from "../navigation-alpha/navigation-alpha";
import LogoAlpha from "../logo-alpha/logo-alpha";
import NavigationBeta from "../navigation-beta/navigation-beta";

class LayoutAlpha extends Component {
	render() {
		return (
			<div className="layout-alpha">
				<NavigationAlpha/>
				<LogoAlpha/>
				<NavigationBeta/>
			</div>
		)
	}
}

export default LayoutAlpha
