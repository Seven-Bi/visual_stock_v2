import React from 'react'
import ReactDOM from 'react-dom'
import MyContext from './my_context.js'
import MarketWidget from './widget.js'




const root = {
	display: 'flex',
	flexDirection: 'column'
}

const api = '/get-products'

let calculate = (update_data, api_dict) => {
	var list = JSON.parse(update_data)
    const listItems = list.data.map((item) => 
        <li>
            <span>{item.s} ==> </span>
            <span>Change: {Math.abs(item.c - api_dict[item.s])/api_dict[item.s]}</span>
        </li>      
    )

	return (
		<ul> { listItems } </ul>
	)
}

let recur_foo = (num, data_list, data_dict) => {
    if (num <= 0) {
        return data_dict
    }

    var temp_l = []
    var key = data_list[num-1]['q']

    data_list.map(
        i => {
            if (i.q === key) {
                temp_l.push(i.b + '/' + i.q)
            }
        }
    )
    data_dict[key] = temp_l
    num -= 1
    return recur_foo(num, data_list, data_dict)
}

let sort = (list) => {
	var temp_dict = {}

	list.forEach(
		i => {
			temp_dict[i.s] = i.o
		}
	)
	return temp_dict
}

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            data_structure: null,
            market_data: null,
            loaded: false
        }
    }

    componentDidMount() {
        fetch(api)
        .then(
            res => {
                return res.json()
            }
        )
        .then((output) => {
            var data_dict = {}
            recur_foo(output.data.length, output.data, data_dict)

            var api_data = sort(output.data)
            this.setState({
                data_structure: data_dict,
                market_data: api_data,
                loaded: true
            })
            //this.myRef.current.socket_setup()
        })
    }

	render() {
        if (this.state.loaded) {
            return (
                <MyContext.Provider
                    value = {{
                        structure: this.state.data_structure,
                        data: this.state.market_data,
                        change: calculate
                    }}
                >
					<div style = { root }>
						<MarketWidget ref={this.myRef} />
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