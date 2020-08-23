import React from 'react';
import ReactDOM from 'react-dom';
import MyContext from './my_context.js';
import MarketWidget from './widget.js';
import PriceTrending from './market_data.js';




const root = {
	display: 'flex',
	flexDirection: 'column'
}

const api = '/get-products'
// let recur_foo = (num, data_list, data_dict) => {
//     if (num <= 0) {
//         return data_dict
//     }

//     var temp_l = []
//     var key = data_list[num-1]['b']

//     data_list.forEach(
//         i => {
//             if (i.pm === key) {
//                 temp_l.push(i.b)
//             }
//         }
//     )

//     data_dict[key] = temp_l
//     num -= 1
//     return recur_foo(num, data_list, data_dict)
// }


class Index extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
		// this.callback_Ref = null;
		// this.setRef = element => {
		// 	this.callback_Ref = element;
		// }
        this.state = {
            market_data: [],
            loaded: false
        }
    }

	callback(data) {
		console.log(data)
	}

    componentDidMount() {
        fetch(api)
        .then(
            res => {
                return res.json()
            }
        )
        .then((output) => {
            var api_data = output.data
            // var num = api_data.length
            // var data_list = api_data
            // var data_dict = {}
            // var data = recur_foo(num, data_list, data_dict)
            this.setState({
                market_data: api_data,
                loaded: true
            })
            // this.handle_click(api_data)
            this.myRef.current.socket_setup(this.callback)
        })
    }

	// clickHandler() {
	// 	if (this.callback_Ref) {
	// 		this.myRef.current.websocket_clickhandler(this.callback)
	// 	}
	// }


	//<button onClick={this.clickHandler}/>
	render() {
        if (this.state.loaded) {
            return (
                <MyContext.Provider
                    value = {{
                        data: this.state.market_data
                    }}
                >
					<div style = { root }>
						<MarketWidget ref={this.myRef} />
						<PriceTrending />
						
					</div>
                </MyContext.Provider>
            );
        }
        else {
            return (
				<div style = { root }>
					<h1> Loading ... </h1>
				</div>
            );
        }			
	}
}


// ========================================


ReactDOM.render(
	<Index />,
	document.getElementById('root'),	
);