import React, {Component} from 'react';
import $ from 'jquery';

class SearchAlpha extends Component {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: props.windowWidth,
			keyword: '',
			requestData: []
		};

		this.request = null;
		this.handleChange = this.handleChange.bind(this);
		this.search = this.search.bind(this);
	}

	render() {
		return (
			<div className="search-alpha">
				<div className="inner-container">
					<input type="text" value={this.state.keyword} placeholder="Hello, I’m looking for…"
						   onChange={this.handleChange}/>
					<div className="dropdown" style={this.state.keyword.length >= 3 ? {} : { display: 'none' }}>
						{this.state.requestData.map((item, index) => {
							return (
								<li key={index}>
									<a href="#">
										{item.name}
									</a>
								</li>
							)
						})}
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
		if (this.request) {
			this.request.abort()
		}
		if (this.state.keyword.length >= 3) {
			this.request = $.ajax(`http://localhost:3000/search/quick?keyword=${this.state.keyword}`)
				.done((request) => {
					this.setState({
						requestData:request
					});
				});
		}
	}
}

export default SearchAlpha
