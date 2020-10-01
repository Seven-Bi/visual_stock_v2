import React from 'react'
import { Button } from '@material-ui/core'
import ScrollableTabsButtonAuto from './Tab.js'



const url = 'wss://stream.binance.com/stream?streams=!miniTicker@arr'
let isConnected = false
let socket = null

const base = {
	display: 'flex',
	flexDirection: 'column',
}

class Widget extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data_list: [],
			api_data_list: props.tab_data
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
				if(this.state.data_list) {
					this.setState({
						data_list: e.data
					})
				}
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

		return(
			<div style={ base }>
				<Button variant="contained" color="primary" onClick={() => this.websocket_clickhandler()}>
 					Pause/Start
				</Button>
				<ScrollableTabsButtonAuto tab_base={this.state.api_data_list} tab_data={ this.state.data_list}/>
			</div>
		)
	}
}

export default Widget;
