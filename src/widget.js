import React from 'react';
import PriceTrending from './market_data.js';



const base_widget = {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	height: '100%',
	backgroundColor: 'yellow',
}

const title = {
	backgroundColor: 'orange',
}

const nav_bar = {
	backgroundColor: 'blue',
}

const tool_bar = {
	backgroundColor: 'green',
}

const ul_as_bar = {
	listStyleType: 'none',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-around',
}

class MarketWidget extends React.Component {

	//nav_bar, tool_bar and tab_bar will have data_window callback functions
	render() {
		return (
			<div style = { base_widget }>
				<div style = { title }><span> Market </span></div>
				<div style = { nav_bar }>
					<ul style = { ul_as_bar }>
						<li>a</li>
						<li>b</li>
						<li>c</li>
						<li>d</li>
					</ul>
				</div>
				<div style = { tool_bar }>
					<ul style = { ul_as_bar }>
						<li>1</li>
						<li>2</li>
						<li>3</li>
					</ul>
				</div>
				
				<PriceTrending />
			</div>
		);
	}
}

export default MarketWidget;