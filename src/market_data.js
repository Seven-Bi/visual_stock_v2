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


class PriceTrending extends React.Component {
	
	render() {
		return (
			<div style = { inner_table }>
				<table style = { table_window }>
					<thead>
						<tr>
							<th style = { table_head }>Pair</th>
							<th style = { table_head }>Last Price</th>
							<th style = { table_head }>Change</th>
						</tr>
					</thead>
					<MyContext.Consumer>
						{(market_data) => {
							console.log(market_data.data)
						}}
					</MyContext.Consumer>														
				</table>
			</div>
		);
	}
}

export default PriceTrending;