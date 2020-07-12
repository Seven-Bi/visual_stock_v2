import React from 'react';



const inner_table = {
	backgroundColor: 'grey',
	padding: '1vh',
	height: '100%',
}

const table_window = {
	backgroundColor: 'white',
	width: '100%',
	height: '100%',
}

const table_head = {
	textAlign: 'left',
}

class PriceTrending extends React.Component {

	//
	render() {
		return (
			<div style = { inner_table }>
				<table style = { table_window }>
					<tr>
						<th style = { table_head }>Pair</th>
						<th style = { table_head }>Last Price</th>
						<th style = { table_head }>Change</th>
					</tr>
						<tr>
							<td>Jill</td>
							<td>Smith</td>
							<td>50</td>
						</tr>
						<tr>
							<td>Jill</td>
							<td>Smith</td>
							<td>50</td>
						</tr>
				</table>
			</div>
		);
	}
}

export default PriceTrending;