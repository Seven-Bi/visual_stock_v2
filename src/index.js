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
const socket_con = () => {
	if (connection.readyState === WebSocket.OPEN) {
		connection.close()
	}
	else if (connection.readyState === WebSocket.CLOSE) {
		connection.open()
	}
	// alert('nimei')
}


class Base extends React.Component {

	componentDidMount() {
		connection.onopen = () => {
			alert('open')
		}
		connection.onclose = () => {
			alert('close')
		}
		connection.onmessage = e => {
			console.log(e.data)
		}
		connection.onerror = error => {
			console.log(`WebSocket error: ${error}`)
		}
	}

	render() {
		return (
			<div style = { root_base }>
				<div style = { base }>
					<MarketWidget />
				</div>
				<button onClick={socket_con}/>
			</div>
		);
	}
}


// ========================================


ReactDOM.render(
	<Base />,
	document.getElementById('root'),	
);