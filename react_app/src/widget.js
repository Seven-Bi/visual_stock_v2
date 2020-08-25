import React from 'react'
import PriceTrending from './market_data.js'
import Tabs from 'react-bootstrap/Tabs'
import MyContext from './my_context.js'




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




class MarketWidget extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data_list: null,
			tab_index: [],
			tab_list: {}
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
				<button onClick={() => this.websocket_clickhandler()}/>
				<div style = { title }>
					<span><h3> Market </h3></span>
				</div>
				<div style = { nav_bar }>
					<ul style = { ul_as_bar }>
		                <MyContext.Consumer>
		                	{
		                		api_data => (
							        <React.Fragment>
							            { Object.keys(api_data.structure).map((item, i) => (
						            		<li key={i}>
						            			{ item }
						            		</li>
							        	))}
							        </React.Fragment>
						        )
							}
		                </MyContext.Consumer>
					</ul>
				</div>
				<PriceTrending data_list={ this.state.data_list }/>
			</div>
		);
	}
}

export default MarketWidget;