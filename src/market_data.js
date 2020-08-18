import React from 'react';
import MyContext from './my_context.js';



const inner_table = {
	padding: '1vh',
	height: '100%',
	overflowY: 'scroll',
}

const table_window = {
	backgroundColor: 'white',
	overflowY: 'auto',
	width: '100%',
	height: '100%',
}

const table_head = {
	textAlign: 'left',
}

						// {(market_data) => {
						// 	console.log(market_data.data)
						// }}
					// <MyContext.Consumer>
						
					// </MyContext.Consumer>	
				// <table style = { table_window }>
				// 	<thead>
				// 		<tr>
				// 			<th style = { table_head }>Pair</th>
				// 			<th style = { table_head }>Last Price</th>
				// 			<th style = { table_head }>Change</th>
				// 		</tr>
				// 	</thead>							
				// </table>
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
			<div style = { inner_table }>
				<span><h4> { this.state.change } </h4></span>
			</div>
		);
	}
}

export default PriceTrending;
