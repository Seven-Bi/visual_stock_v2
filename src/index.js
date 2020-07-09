import React from 'react';
import ReactDOM from 'react-dom';
import MarketWidget from './widget.js';




const root_base = {
	display: 'flex',
	justifyContent: 'center',
};

const base = {
	padding: '2vh',
	width: '40%',
	height: '80vh',
	backgroundColor: 'red',
};

class Base extends React.Component {

	render() {
		return (
			<div style={root_base}>
				<div style={base}>
					<MarketWidget />
				</div>
			</div>
		);
	}
}


// ========================================


ReactDOM.render(
	<Base />,
	document.getElementById('root'),	
);