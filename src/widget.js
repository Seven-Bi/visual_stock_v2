import React from 'react';
import PriceTrending from './market_data.js';



const base_widget = {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	height: '100%',
	backgroundColor: 'yellow',
}

const nav_bar = {
	display: 'flex',
	flexDirection: 'row',
	backgroundColor: 'blue',
}

const tool_bar = {
	display: 'flex',
	flexDirection: 'row',
	backgroundColor: 'black',

}

class MarketWidget extends React.Component {

	//nav_bar, tool_bar and tab_bar will have data_window callback functions
	render() {
		return (
			<div style={base_widget}>
				<div style={nav_bar}> </div>
				<div style={tool_bar}> </div>
				<PriceTrending />
			</div>
		);
	}
}

export default MarketWidget;