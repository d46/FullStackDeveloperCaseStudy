import React, {Component} from 'react';

class SearchAlpha extends Component {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: props.windowWidth,
			keyword: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.search = this.search.bind(this);
	}

	render() {
		return (
			<div className="search-alpha">
				<div className="inner-container">
					<input type="text" value={this.state.keyword} placeholder="Hello, I’m looking for…"
						   onChange={this.handleChange}/>
					<div className="dropdown">

					</div>
					<a href="#" className="search">
						<div className="icon-search">

						</div>
					</a>
				</div>
			</div>
		)
	}

	handleChange(event) {
		this.setState({keyword: event.target.value});
		this.search()
	}

	search() {
		if(this.state.keyword.length >= 3 ){

		}
	}
}

export default SearchAlpha
