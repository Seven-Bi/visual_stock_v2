import React from 'react';
// import PriceTrending from './market_data.js';



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



const url = 'wss://stream.binance.com/stream?streams=!miniTicker@arr'
let isConnected = false
let socket = null


// let calculate_change = (basedata, data) => {
// 	var code = JSON.parse(data).data[0].s
// 	var l_price = JSON.parse(data).data[0].c
// 	basedata.forEach (
// 		i => {
// 			if (i.s === code) {
// 				//console.log((parseFloat(i.o) - parseFloat(l_price)) / parseFloat(i.o))
// 				return (parseFloat(i.o) - parseFloat(l_price)) / parseFloat(i.o)
// 			}
// 		}
// 	)
// }

let setup_websocket = (callback) => {
	return new Promise((resolve, reject) => {
		let channel = new WebSocket(url)
		channel.onopen = () => {
			isConnected = true
			resolve(channel)
		}
		channel.onmessage = (e) => {
			// console.log(e.data)
			// console.log(callback)
			callback(e.data)
			// ref.current.callback(calculate_change(basedata, e.data)) //xxxx	
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


class MarketWidget extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			real_data: []
		}
	}

	socket_setup(callback) {
		// this.setState({api_data: data})
		socket = setup_websocket(callback).then(channel => {
			socket = channel
			window.alert('open channel !')
		}).catch(error => {
			window.alert('failed to setup !')
		})

		// socket.onclose = () => {
			// setTimeout(() => {
			// 	socket = setup_websocket(callback).then(channel => {
			// 		socket = channel
			// 		window.alert('open channel !')
			// 	}).catch(error => {
			// 		window.alert('failed to setup !')
			// 	})
			// }, 4000);
		// }
	}

	websocket_clickhandler(callback) {
		if (!isConnected) {		
			setup_websocket(callback).then(channel => {
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

	render() {
		return (
			<div style = { base_widget }>
				<div style = { title }>
					<span><h3> Market </h3></span>
				</div>
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
				
			</div>
		);
	}
}

export default MarketWidget;