import React from 'react';
import ReactDOM from 'react-dom';
import MarketWidget from './widget.js';
import MyProvider from './my_provider.js'



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
let isConnected = false
let socket = null


let setup_websocket = () => {
	return new Promise((resolve, reject) => {
		let channel = new WebSocket(url)
		channel.onopen = () => {
			isConnected = true
			resolve(channel)
		}
		channel.onmessage = (e) => {
			console.log(e.data)
		}
		channel.onerror = (e) => {
			reject(e)
		}
	})
}

let close_websocket = (channel) => {
	return new Promise((resolve, reject) => {
		channel.close()
		channel.onclose = () => {
			isConnected = false
			resolve(null)
		}
		channel.onerror = (e) => {
			reject(e)
		}
	})
}

let websocket_clickhandler = () => {
	if (!isConnected) {		
		setup_websocket().then(channel => {
			socket = channel
			window.alert('open channel !')
		}).catch(error => {
			window.alert('failed to setup !')
		})
	}
	else {
		close_websocket(socket).then(channel => {
			socket = channel
			window.alert('close channel !')
		}).catch(error => {
			window.alert('failed to close !')
		})
	}
}


class Base extends React.Component {


	componentDidMount() {
		socket = setup_websocket().then(channel => {
			socket = channel
			window.alert('open channel !')
		}).catch(error => {
			window.alert('failed to setup !')
		})


		socket.onclose = () => {
			setTimeout(() => {
				socket = setup_websocket().then(channel => {
					socket = channel
					window.alert('open channel !')
				}).catch(error => {
					window.alert('failed to setup !')
				})
			}, 4000);
		}
	}

	render() {
		return (
			<MyProvider>
				<div style = { root_base }>
					<div style = { base }>
						<MarketWidget />
					</div>
					<button onClick={websocket_clickhandler}/>
				</div>
			</MyProvider>
		);
	}
}


// ========================================


ReactDOM.render(
	<Base />,
	document.getElementById('root'),	
);