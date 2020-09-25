import React from 'react'
import ScrollableTabsButtonAuto from './tab_panel.js'
import { Button } from '@material-ui/core'





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
	margin: '2vh',
}

const url = 'wss://stream.binance.com/stream?streams=!miniTicker@arr'
let isConnected = false
let socket = null


class MarketWidget extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data_list: null, //steam data
			tab_index: null, //keys
			tab_dict: null,  //keys and its subkeys
			key: 'BTC'	//current key index
		}
	}

	componentDidMount() {
		if(this.props.structure) {
			this.setState({
				tab_index: Object.keys(this.props.structure),
				tab_dict: this.props.structure,
			})
		}
	}

	setup_websocket() {
		return new Promise((resolve, reject) => {
			let channel = new WebSocket(url)
			channel.onopen = () => {
				isConnected = true
				resolve(channel)
			}
			channel.onmessage = (e) => {
				console.log(e.data)
				this.setState({
					data_list: e.data
				})
			}
			channel.onerror = (e) => {
				reject(e)
			}
		})
	}

	close_websocket(channel) {
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

	socket_setup() {
		socket = this.setup_websocket().then(channel => {
			socket = channel
			window.alert('open channel !')
		}).catch(error => {
			window.alert('failed to setup !')
		})
	}

	websocket_clickhandler() {
		if (!isConnected) {		
			this.setup_websocket().then(channel => {
				socket = channel
				window.alert('open channel !')
			}).catch(error => {
				window.alert('failed to setup !')
			})
		}
		else {
			this.close_websocket(socket).then(channel => {
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
				<Button variant="contained" color="primary" href="#contained-buttons" onClick={() => this.websocket_clickhandler()}>
 					Pause/Start
				</Button>				
				<div style = { title }>
					<span><h3> Market </h3></span>
				</div>
				<div style = { nav_bar }>

					<ScrollableTabsButtonAuto />

				</div>
				{/* <PriceTrending data_list={ this.state.data_list } /> */}
			</div>
		)
	}
}

export default MarketWidget;
