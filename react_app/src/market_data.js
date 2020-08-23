import React from 'react';
import MyContext from './my_context.js';





class PriceTrending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            change: '0.0'
        };
    }

	callback(data) {
		this.setState({change: data})
	}

	render() {
		return (
			<div>
				<MyContext.Consumer>
					{
						market_data => {
							var ss = market_data.data[0].s
							return (
								<h3>{ ss }</h3>
							)
						}
					}
				</MyContext.Consumer>
			</div>
		);
	}
}

export default PriceTrending;
