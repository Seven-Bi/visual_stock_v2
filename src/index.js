import React from 'react';
import ReactDOM from 'react-dom';
import MarketWidget from './widget.js';




const root_base = {
	display: 'flex',
	justifyContent: 'center',
};

const base = {
	padding: '1vh',
	width: '40%',
	height: '80vh',
	backgroundColor: 'red',
};

const url = 'wss://stream.binance.com/stream?streams=!miniTicker@arr'
const connection = new WebSocket(url)

class Base extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pause: false
		};
	}

	componentDidMount() {
		connection.onopen = () => {
			alert('open')
		}
		connection.onerror = error => {
			console.log(`WebSocket error: ${error}`)
		}
		connection.onclose = () => {
			// connection.close()
			// this.setState(state => ({
			// 	pause: true
			// }))
		}		
		connection.onmessage = e => {
			console.log(e.data)
		}
	}

	close_socket() {
		if (!this.state.pause) {
			connection.close()
		}
		else {

		}
	}

	render() {
		return (
			<div style = { root_base }>
				<div style = { base }>
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