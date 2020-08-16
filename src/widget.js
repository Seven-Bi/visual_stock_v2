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
	padding: '1vh',
	fontFamily: 'Arial, Helvetica, sans-serif',
}

const nav_bar = {
	backgroundColor: 'blue',
	padding: '1vh',
}

const tool_bar = {
	backgroundColor: 'green',
	padding: '1vh',
}

const ul_as_bar = {
	listStyleType: 'none',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	paddingInlineStart: '0',
}



class MarketWidget extends React.Component {

	//nav_bar, tool_bar and tab_bar will have data_window callback functions
	render() {
		return (
			<div style = { base_widget }>
				<div style = { title }><span><h3> Market </h3></span></div>
				<div style = { nav_bar }>
					<ul style = { ul_as_bar }>
						<li>Margin</li>
						<li>BNB</li>
						<li>BTC</li>
						<li>ALTS</li>
						<li>USD</li>
					</ul>
				</div>
				<div style = { tool_bar }>
					<ul style = { ul_as_bar }>
						<li><input type="text" /></li>
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