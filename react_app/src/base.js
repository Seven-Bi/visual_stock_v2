import React from 'react';
import ReactDOM from 'react-dom';
import MarketWidget from './widget.js';
import MyProvider from './my_provider.js'
import PriceTrending from './market_data.js';



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


let calculate_change = (basedata, data) => {
	var code = JSON.parse(data).data[0].s
	var l_price = JSON.parse(data).data[0].c
	basedata.forEach (
		i => {
			if (i.s === code) {
				//console.log((parseFloat(i.o) - parseFloat(l_price)) / parseFloat(i.o))
				return (parseFloat(i.o) - parseFloat(l_price)) / parseFloat(i.o)
			}
		}
	)
}

let setup_websocket = (basedata, ref) => {
	return new Promise((resolve, reject) => {
		let channel = new WebSocket(url)
		channel.onopen = () => {
			isConnected = true
			resolve(channel)
		}
		channel.onmessage = (e) => {
			ref.current.callback(calculate_change(basedata, e.data)) //xxxx	
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

let websocket_clickhandler = (basedata, ref) => {
	if (!isConnected) {		
		setup_websocket(basedata, ref).then(channel => {
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

// const ContextWrap = React.forwardRef((props, ref) => (
// 		<div ref={ref} className="button">
// 			{props.children}
// 		</div>
// 	)
// )

class Base extends React.Component {
	constructor(props) {
		super(props)
		this.ref = React.createRef()
		this.state = {
			api_data: []
		}
	}

	handleClick(data) {
		this.setState({api_data: data})
		socket = setup_websocket(data).then(channel => {
			socket = channel
			window.alert('open channel !')
		}).catch(error => {
			window.alert('failed to setup !')
		})

		socket.onclose = () => {
			setTimeout(() => {
				socket = setup_websocket(data).then(channel => {
					socket = channel
					window.alert('open channel !')
				}).catch(error => {
					window.alert('failed to setup !')
				})
			}, 4000);
		}

		socket.onmessage = (e) => {
			this.ref.current.callback(calculate_change(data, e.data))
		}
	}
	//<MarketWidget ref={this.ref}/>
	render() {
		return (
			<MyProvider callback = {this.handleClick}>
				<div style = { root_base }>
					<div style = { base }>
						<PriceTrending ref={this.ref}/>
					</div>
					<button onClick={() => websocket_clickhandler(this.state.api_data, this.ref)}/>
				</div>
			</MyProvider>
		);
	}
}


// ========================================



